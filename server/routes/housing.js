const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const { getUserHousing } = require('../controllers/housing_controller');

router.route('/').get(isAuthenticated, getUserHousing);

module.exports = router;
