const { Ticket, Sale, Event, User, AccessLog } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

exports.buyTicket = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const { ticket_id, quantity } = req.body;

        if (!ticket_id || !quantity || quantity < 1) {
            return res.status(400).json({ message: 'Datos inválidos' });
        }

        const ticket = await Ticket.findByPk(ticket_id, {
            include: [{ model: Event, as: 'event' }]
        });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket no encontrado' });
        }

        if (ticket.quantity_available < quantity) {
            return res.status(400).json({
                message: 'No hay suficientes boletos disponibles',
                available: ticket.quantity_available
            });
        }

        const sales = [];
        for (let i = 0; i < quantity; i++) {
            const qr_code = uuidv4(); 

            const sale = await Sale.create({
                user_id: userId,
                ticket_id: ticket_id,
                qr_code: qr_code,
                status: 'pagado'
            });

            sales.push(sale);
        }

        await ticket.update({
            quantity_available: ticket.quantity_available - quantity
        });

        const completeSales = await Sale.findAll({
            where: { id: sales.map(s => s.id) },
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    include: [{ model: Event, as: 'event' }]
                },
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        res.status(201).json({
            message: 'Compra realizada exitosamente',
            sales: completeSales
        });
    } catch (error) {
        console.error('Error al comprar boleto:', error);
        res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
    }
};

exports.validateTicket = async (req, res) => {
    try {
        const { role, id: staffId } = req.user;
        const { qr_code } = req.body;

        if (role !== 'staff') {
            return res.status(403).json({ message: 'Solo el staff puede validar boletos' });
        }

        if (!qr_code) {
            return res.status(400).json({ message: 'Código QR requerido' });
        }

        const sale = await Sale.findOne({
            where: { qr_code },
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    include: [{ model: Event, as: 'event' }]
                },
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!sale) {
            return res.status(404).json({
                message: 'Boleto no encontrado',
                valid: false
            });
        }

        if (sale.status === 'cancelado') {
            return res.status(400).json({
                message: 'Este boleto ha sido cancelado',
                valid: false,
                sale
            });
        }

        if (sale.status === 'usado') {
            const accessLog = await AccessLog.findOne({
                where: { sale_id: sale.id },
                include: [{ model: User, as: 'staff', attributes: ['id', 'name'] }]
            });

            return res.status(400).json({
                message: 'Este boleto ya fue usado',
                valid: false,
                sale,
                accessLog
            });
        }

        await sale.update({ status: 'usado' });

        const accessLog = await AccessLog.create({
            sale_id: sale.id,
            staff_id: staffId
        });

        res.json({
            message: 'Boleto validado exitosamente',
            valid: true,
            sale: await Sale.findByPk(sale.id, {
                include: [
                    {
                        model: Ticket,
                        as: 'ticket',
                        include: [{ model: Event, as: 'event' }]
                    },
                    {
                        model: User,
                        as: 'buyer',
                        attributes: ['id', 'name', 'email']
                    }
                ]
            }),
            accessLog
        });
    } catch (error) {
        console.error('Error al validar boleto:', error);
        res.status(500).json({ message: 'Error al validar boleto', error: error.message });
    }
};

exports.getUserTickets = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const sales = await Sale.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    include: [{ model: Event, as: 'event' }]
                }
            ],
            order: [['purchase_date', 'DESC']]
        });

        res.json(sales);
    } catch (error) {
        console.error('Error al obtener boletos:', error);
        res.status(500).json({ message: 'Error al obtener boletos', error: error.message });
    }
};

exports.getTicketByQR = async (req, res) => {
    try {
        const { qr_code } = req.params;

        const sale = await Sale.findOne({
            where: { qr_code },
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    include: [{ model: Event, as: 'event' }]
                },
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        if (!sale) {
            return res.status(404).json({ message: 'Boleto no encontrado' });
        }

        res.json(sale);
    } catch (error) {
        console.error('Error al obtener boleto:', error);
        res.status(500).json({ message: 'Error al obtener boleto', error: error.message });
    }
};
