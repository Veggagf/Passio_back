const { body, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors: errors.array()
        });
    }
    next();
};

const loginValidation = [
    body().custom((value, { req }) => {
        if (!req.body.identifier && !req.body.email && !req.body.username) {
            throw new Error('El usuario o email es requerido');
        }
        return true;
    }),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    validateRequest,
];

const registerValidation = [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre de usuario debe tener al menos 3 caracteres.')
        .isAlphanumeric().withMessage('El nombre de usuario solo debe contener letras y números.'),
    body('email').isEmail().withMessage('Debe ser un email válido').normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role')
        .optional()
        .isIn(['administrador', 'organizador', 'staff', 'usuario'])
        .withMessage('Rol inválido'),
    validateRequest,
];

const eventValidation = [
    body('title').trim().notEmpty().withMessage('El título es requerido'),
    body('description').optional().trim(),
    body('date').isISO8601({ strict: true }).toDate().withMessage('La fecha debe ser válida (formato ISO 8601)'),
    body('location').trim().notEmpty().withMessage('La ubicación es requerida'),
    body('capacity').isInt({ min: 1 }).withMessage('La capacidad debe ser un número entero mayor a 0'),
    body('image_url').optional({ checkFalsy: true }).isURL().withMessage('Debe ser una URL válida'),
    validateRequest,
];

const ticketValidation = [
    body('event_id').exists().isInt().withMessage('El ID del evento es requerido y debe ser un entero'),
    body('name').trim().notEmpty().withMessage('El nombre del ticket es requerido'),
    body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número decimal mayor o igual a 0'),
    body('quantity_available')
        .isInt({ min: 0 })
        .withMessage('La cantidad debe ser un número entero mayor o igual a 0'),
    validateRequest,
];

const idParamValidation = [
    param('id').isInt().withMessage('ID inválido, debe ser un número entero'),
    validateRequest,
];

module.exports = {
    validateRequest,
    loginValidation,
    registerValidation,
    eventValidation,
    ticketValidation,
    idParamValidation,
};