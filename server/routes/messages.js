const express = require('express');
const router = express.Router();
const messages_controller = require('../controllers/messages_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', isAuthenticated, messages_controller.get_conversations);

router.get('/:conversation', isAuthenticated, messages_controller.get_conversation_messages);

router.post('/:conversation', isAuthenticated, messages_controller.send_new_message);

module.exports = router