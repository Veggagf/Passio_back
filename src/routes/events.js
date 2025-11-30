const express = require('express');
const router = express.Router();
const eventController = require('../conrollers/eventController');
const { authenticateToken } = require('../middleware/auth');

const upload = require('../middleware/upload');

router.use(authenticateToken);

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.post('/', upload.single('image'), eventController.createEvent);
router.put('/:id', upload.single('image'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
