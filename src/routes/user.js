const express = require('express');
const router = express.Router();
const userController = require('../conrollers/userController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
