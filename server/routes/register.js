const express = require('express');
const router = express.Router();
const registration_controller = require('../controllers/registration_controller')

router.post('/', registration_controller.handle_registration);

module.exports = router;