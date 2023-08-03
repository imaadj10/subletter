const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification_controller')
const { isAuthenticated } = require('../middleware/auth_middleware');


router.get('/', isAuthenticated, notification_controller.retrieve_notifications);

router.post('/', notification_controller.add_notification);


module.exports = router;