const { Event, Ticket, User, Sale } = require('../models');
const { Op } = require('sequelize');

exports.getAllEvents = async (req, res) => {
    try {
        const { role, id } = req.user;
        let events;

        if (role === 'administrador') {
            events = await Event.findAll({
                include: [
                    { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
                    { model: Ticket, as: 'tickets' }
                ],
                order: [['date', 'ASC']]
            });
        } else if (role === 'organizador') {
            events = await Event.findAll({
                where: { organizer_id: id },
                include: [
                    { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
                    { model: Ticket, as: 'tickets' }
                ],
                order: [['date', 'ASC']]
            });
        } else {
            events = await Event.findAll({
                include: [
                    { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
                    { model: Ticket, as: 'tickets' }
                ],
                order: [['date', 'ASC']]
            });
        }

        res.json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByPk(id, {
            include: [
                { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
                { model: Ticket, as: 'tickets' }
            ]
        });

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        res.json(event);
    } catch (error) {
        console.error('Error al obtener evento:', error);
        res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
};

exports.createEvent = async (req, res) => {
    try {
        console.log('Iniciando creación de evento...');
        console.log('Usuario:', req.user);
        console.log('Body recibido:', req.body);

        const { role, id } = req.user;

        if (role !== 'administrador' && role !== 'organizador') {
            console.log('Permiso denegado - Rol:', role);
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para crear eventos'
            });
        }

        const { title, description, date, location, capacity } = req.body;
        let { tickets } = req.body;
        let image_url = req.body.image_url;

        if (req.file) {
            image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        if (typeof tickets === 'string') {
            try {
                tickets = JSON.parse(tickets);
            } catch (e) {
                console.error('Error al parsear tickets:', e);
                tickets = [];
            }
        }

        if (!title || !date || !location || !capacity) {
            console.log('Faltan campos requeridos');
            return res.status(400).json({
                success: false,
                message: 'Faltan campos requeridos',
                required: { title, date, location, capacity }
            });
        }

        console.log('Validaciones pasadas, creando evento...');

        const event = await Event.create({
            title,
            description,
            date,
            location,
            capacity,
            image_url,
            organizer_id: id
        });

        console.log('Evento creado con ID:', event.id);

        if (tickets && Array.isArray(tickets) && tickets.length > 0) {
            console.log(`Creando ${tickets.length} tipos de tickets...`);
            const ticketPromises = tickets.map(ticket =>
                Ticket.create({
                    event_id: event.id,
                    name: ticket.name,
                    price: ticket.price,
                    quantity_available: ticket.quantity_available
                })
            );
            await Promise.all(ticketPromises);
            console.log('Tickets creados');
        }

        const eventWithTickets = await Event.findByPk(event.id, {
            include: [
                { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
                { model: Ticket, as: 'tickets' }
            ]
        });

        console.log('Evento completo recuperado, enviando respuesta...');

        res.status(201).json({
            success: true,
            message: 'Evento creado exitosamente',
            data: eventWithTickets
        });
    } catch (error) {
        console.error('Error al crear evento:', error);
        console.error('Stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Error al crear evento',
            error: error.message
        });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { role, id: userId } = req.user;
        const { id } = req.params;

        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        if (role !== 'administrador' && event.organizer_id !== userId) {
            return res.status(403).json({ message: 'No tienes permisos para editar este evento' });
        }

        const { title, description, date, location, capacity } = req.body;
        let image_url = req.body.image_url;

        if (req.file) {
            image_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        await event.update({
            title: title || event.title,
            description: description !== undefined ? description : event.description,
            date: date || event.date,
            location: location || event.location,
            capacity: capacity || event.capacity,
            image_url: image_url !== undefined ? image_url : event.image_url
        });

        const updatedEvent = await Event.findByPk(id, {
            include: [
                { model: User, as: 'organizer', attributes: ['id', 'name', 'email'] },
                { model: Ticket, as: 'tickets' }
            ]
        });

        res.json(updatedEvent);
    } catch (error) {
        console.error('Error al actualizar evento:', error);
        res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { role, id: userId } = req.user;
        const { id } = req.params;

        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        if (role !== 'administrador' && event.organizer_id !== userId) {
            return res.status(403).json({ message: 'No tienes permisos para eliminar este evento' });
        }

        await event.destroy();

        res.json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar evento:', error);
        res.status(500).json({ message: 'Error al eliminar evento', error: error.message });
    }
};
