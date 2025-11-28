const User = require('./User');
const Event = require('./Event');
const Ticket = require('./Ticket');
const Sale = require('./Sale');
const AccessLog = require('./AccessLog');

User.hasMany(Event, { foreignKey: 'organizer_id', as: 'organizedEvents' });
Event.belongsTo(User, { foreignKey: 'organizer_id', as: 'organizer' });

Event.hasMany(Ticket, { foreignKey: 'event_id', as: 'tickets' });
Ticket.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });

User.hasMany(Sale, { foreignKey: 'user_id', as: 'purchases' });
Sale.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });

Ticket.hasMany(Sale, { foreignKey: 'ticket_id', as: 'sales' });
Sale.belongsTo(Ticket, { foreignKey: 'ticket_id', as: 'ticket' });

Sale.hasMany(AccessLog, { foreignKey: 'sale_id', as: 'accessLogs' });
AccessLog.belongsTo(Sale, { foreignKey: 'sale_id', as: 'sale' });

User.hasMany(AccessLog, { foreignKey: 'staff_id', as: 'validations' });
AccessLog.belongsTo(User, { foreignKey: 'staff_id', as: 'staff' });

module.exports = {
    User,
    Event,
    Ticket,
    Sale,
    AccessLog,
};