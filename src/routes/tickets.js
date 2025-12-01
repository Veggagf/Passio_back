const express = require('express');
const router = express.Router();
const ticketController = require('../conrollers/ticketController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/buy', ticketController.buyTicket);
router.post('/validate', ticketController.validateTicket);
router.get('/my-tickets', ticketController.getUserTickets);
router.get('/qr/:qr_code', ticketController.getTicketByQR);

module.exports = router;
