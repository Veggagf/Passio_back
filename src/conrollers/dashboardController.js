const { Event, Ticket, Sale, AccessLog, User } = require('../models');
const { sequelize } = require('../config/database');
const { Op } = require('sequelize');

exports.getEventDashboard = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const { role, id: userId } = req.user;

        const event = await Event.findByPk(eventId, {
            include: [
                {
                    model: Ticket,
                    as: 'tickets',
                    include: [
                        {
                            model: Sale,
                            as: 'sales',
                            include: [
                                {
                                    model: AccessLog,
                                    as: 'accessLogs',
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado',
            });
        }

        if (role === 'organizador' && event.organizer_id !== userId) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para ver este dashboard',
            });
        }

        let totalTicketsSold = 0;
        let totalRevenue = 0;
        let ticketsUsed = 0;
        let ticketsPending = 0;

        const ticketSalesData = [];

        event.tickets.forEach(ticket => {
            const ticketSales = ticket.sales.length;
            const ticketRevenue = ticketSales * parseFloat(ticket.price);

            totalTicketsSold += ticketSales;
            totalRevenue += ticketRevenue;

            ticket.sales.forEach(sale => {
                if (sale.status === 'usado') {
                    ticketsUsed++;
                } else if (sale.status === 'pagado') {
                    ticketsPending++;
                }
            });

            ticketSalesData.push({
                ticket_name: ticket.name,
                sold: ticketSales,
                available: ticket.quantity_available,
                revenue: ticketRevenue,
            });
        });

        const attendanceRate = totalTicketsSold > 0
            ? ((ticketsUsed / totalTicketsSold) * 100).toFixed(2)
            : 0;

        const capacityUsage = event.capacity > 0
            ? ((totalTicketsSold / event.capacity) * 100).toFixed(2)
            : 0;

        const salesByDate = await Sale.findAll({
            attributes: [
                [sequelize.fn('DATE', sequelize.col('purchase_date')), 'date'],
                [sequelize.fn('COUNT', sequelize.col('Sale.id')), 'count'],
            ],
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    where: { event_id: eventId },
                    attributes: [],
                },
            ],
            group: [sequelize.fn('DATE', sequelize.col('purchase_date'))],
            order: [[sequelize.fn('DATE', sequelize.col('purchase_date')), 'ASC']],
            raw: true,
        });

        const recentSales = await Sale.findAll({
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    where: { event_id: eventId },
                    attributes: ['name', 'price'],
                },
                {
                    model: User,
                    as: 'buyer',
                    attributes: ['name', 'email'],
                },
            ],
            order: [['purchase_date', 'DESC']],
            limit: 10,
        });

        const dashboardData = {
            event: {
                id: event.id,
                title: event.title,
                date: event.date,
                location: event.location,
                capacity: event.capacity,
                image_url: event.image_url,
            },
            statistics: {
                total_tickets_sold: totalTicketsSold,
                total_revenue: totalRevenue.toFixed(2),
                tickets_used: ticketsUsed,
                tickets_pending: ticketsPending,
                attendance_rate: parseFloat(attendanceRate),
                capacity_usage: parseFloat(capacityUsage),
            },
            ticket_sales: ticketSalesData,
            sales_by_date: salesByDate,
            recent_sales: recentSales,
        };

        res.json({
            success: true,
            data: dashboardData,
        });
    } catch (error) {
        next(error);
    }
};

exports.getOrganizerStats = async (req, res, next) => {
    try {
        const { id: userId, role } = req.user;

        if (role !== 'organizador' && role !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para ver estas estadísticas',
            });
        }

        const whereClause = role === 'organizador' ? { organizer_id: userId } : {};

        const events = await Event.findAll({
            where: whereClause,
            include: [
                {
                    model: Ticket,
                    as: 'tickets',
                    include: [
                        {
                            model: Sale,
                            as: 'sales',
                        },
                    ],
                },
            ],
        });

        let totalEvents = events.length;
        let totalRevenue = 0;
        let totalTicketsSold = 0;

        events.forEach(event => {
            event.tickets.forEach(ticket => {
                const ticketSales = ticket.sales.length;
                totalTicketsSold += ticketSales;
                totalRevenue += ticketSales * parseFloat(ticket.price);
            });
        });

        const upcomingEvents = events.filter(
            event => new Date(event.date) > new Date()
        ).length;

        const pastEvents = events.filter(
            event => new Date(event.date) <= new Date()
        ).length;

        res.json({
            success: true,
            data: {
                total_events: totalEvents,
                upcoming_events: upcomingEvents,
                past_events: pastEvents,
                total_revenue: totalRevenue.toFixed(2),
                total_tickets_sold: totalTicketsSold,
            },
        });
    } catch (error) {
        next(error);
    }
};