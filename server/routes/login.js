var express = require('express');
var router = express.Router();
const auth_controller = require('../controllers/auth_controller')

router.post('/', auth_controller.process_login);

module.exports = router;