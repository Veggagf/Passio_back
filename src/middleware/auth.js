const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { User } = require('../models');

// Verifica el token JWT y autentica al usuario
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. Token no proporcionado.'
            });
        }

        const decoded = jwt.verify(token, config.jwt.secret);

        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no encontrado.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado.'
            });
        }
        return res.status(403).json({
            success: false,
            message: 'Token inválido.'
        });
    }
};

// Verifica si el usuario tiene uno de los roles permitidos
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no autenticado.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para realizar esta acción.'
            });
        }

        next();
    };
};

module.exports = { authenticateToken, authorizeRoles };