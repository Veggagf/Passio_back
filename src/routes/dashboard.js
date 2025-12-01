const express = require('express');
const router = express.Router();
const dashboardController = require('../conrollers/dashboardController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.use(authenticateToken);

router.get(
    '/:eventId',
    authorizeRoles('administrador', 'organizador'),
    dashboardController.getEventDashboard
);

router.get(
    '/stats/organizer',
    authorizeRoles('administrador', 'organizador'),
    dashboardController.getOrganizerStats
);

module.exports = router;