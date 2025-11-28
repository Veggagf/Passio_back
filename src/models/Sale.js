const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tickets',
            key: 'id'
        }
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    qr_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('pagado', 'usado', 'cancelado'),
        allowNull: false,
        defaultValue: 'pagado'
    }
}, {
    tableName: 'sales',
    timestamps: false
});

module.exports = Sale;