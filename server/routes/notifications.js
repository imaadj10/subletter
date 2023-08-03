const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification_controller')
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', isAuthenticated, notification_controller.retrieve_notifications);

router.post('/', isAuthenticated, notification_controller.add_notification);

router.delete('/:id', notification_controller.delete_notification);

module.exports = router;