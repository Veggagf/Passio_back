const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.user;

        if (role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permisos para ver usuarios' });
        }

        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']]
        });

        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { role, id: requesterId } = req.user;
        const { id } = req.params;

        if (role !== 'administrador' && requesterId !== parseInt(id)) {
            return res.status(403).json({ message: 'No tienes permisos para ver este usuario' });
        }

        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { role: requesterRole } = req.user;
        const { name, email, password, role } = req.body;

        if (requesterRole !== 'administrador' && requesterRole !== 'organizador') {
            return res.status(403).json({ message: 'No tienes permisos para crear usuarios' });
        }

        if (requesterRole === 'organizador' && role !== 'staff') {
            return res.status(403).json({ message: 'Solo puedes crear usuarios de tipo Staff' });
        }

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const validRoles = ['administrador', 'organizador', 'staff', 'usuario'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Rol inválido' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { role: requesterRole, id: requesterId } = req.user;
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        if (requesterRole !== 'administrador' && requesterId !== parseInt(id)) {
            return res.status(403).json({ message: 'No tienes permisos para editar este usuario' });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (requesterRole !== 'administrador' && role && role !== user.role) {
            return res.status(403).json({ message: 'No tienes permisos para cambiar el rol' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'El email ya está registrado' });
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role && requesterRole === 'administrador') updateData.role = role;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json(userResponse);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { role } = req.user;
        const { id } = req.params;

        if (role !== 'administrador') {
            return res.status(403).json({ message: 'No tienes permisos para eliminar usuarios' });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.destroy();

        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};