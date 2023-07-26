var express = require('express');
var router = express.Router();
const registration_controller = require('../controllers/registration_controller')
const auth_controller = require('../controllers/auth_controller')


router.post('/', registration_controller.handle_registration);

module.exports = router;