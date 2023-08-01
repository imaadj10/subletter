const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth_middleware');
const { getUserHousing } = require('../controllers/housing_controller');

router.route('/').get(authenticateUser, getUserHousing);

module.exports = router;
