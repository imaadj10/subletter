var express = require('express');
var router = express.Router();
const messages_controller = require('../controllers/messages_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', isAuthenticated, messages_controller.get_conversations);

router.get('/:conversation', isAuthenticated, messages_controller.get_conversation_messages);

module.exports = router