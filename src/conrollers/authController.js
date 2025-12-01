const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../models');
const config = require('../config/env');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role, username: user.username },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );
};

exports.register = async (req, res, next) => {
    try {
        const { name, username, email, password, role } = req.body;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });

        if (existingUser) {
            let message;
            if (existingUser.email === email) {
                message = 'El email ya está registrado';
            } else if (existingUser.username === username) {
                message = 'El nombre de usuario ya está en uso';
            }

            return res.status(409).json({
                success: false,
                message: message,
            });
        }

        const user = await User.create({
            name,
            username,
            email,
            password,
            role: role || 'usuario',
        });

        const token = generateToken(user);

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                token,
                user: userResponse,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        let { identifier, password, email, username } = req.body;
        identifier = identifier || email || username;

        const user = await User.findOne({
            where: {
                [Op.or]: [{ email: identifier }, { username: identifier }]
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        const token = generateToken(user);

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Login exitoso',
            data: {
                token,
                user: userResponse,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};

exports.logout = async (req, res) => {
    res.json({
        success: true,
        message: 'Logout exitoso',
    });
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            data: userResponse,
        });
    } catch (error) {
        next(error);
    }
};