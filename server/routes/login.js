const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_controller')

router.post('/', auth_controller.process_login);

module.exports = router;