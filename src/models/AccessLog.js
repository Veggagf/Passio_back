const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AccessLog = sequelize.define('AccessLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sales',
            key: 'id'
        }
    },
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    scanned_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'access_logs',
    timestamps: false
});

module.exports = AccessLog;