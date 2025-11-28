const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'even',
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    quantity_available: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'tickets',
    timestamps: false
});

module.exports = Ticket;