const express = require('express');
const router = express.Router();
const ticketController = require('../conrollers/ticketController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.post('/', ticketController.createTicket);
router.get('/event/:eventId', ticketController.getTicketsByEvent);
router.get('/user', ticketController.getUserTickets);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);
router.get('/event/:eventId/logs', ticketController.getAccessLogsByEvent);

router.post('/buy', ticketController.buyTicket);
router.post('/validate', ticketController.validateTicket);
router.get('/my-tickets', ticketController.getUserTickets);
router.get('/qr/:qr_code', ticketController.getTicketByQR);

module.exports = router;
