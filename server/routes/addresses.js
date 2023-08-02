const express = require('express');
const router = express.Router();
const addresses_controller = require('../controllers/addresses_controller.js');

router.get('/', addresses_controller.getAddress);

module.exports = router;
