const express = require('express');
const router = express.Router();
const { getAddress } = require('../controllers/addresses_controller.js');

router.route('/').get(getAddress);

module.exports = router;
