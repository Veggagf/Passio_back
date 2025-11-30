const express = require('express');
const router = express.Router();
const authController = require('../conrollers/authController');
const { authenticateToken } = require('../middleware/auth');
const { loginValidation, registerValidation } = require('../utils/validators');

router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/logout', authenticateToken, authController.logout);
router.get('/me', authenticateToken, authController.getMe);

module.exports = router;