const express = require('express');
const router = express.Router();
const units_controller = require('../controllers/units_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', isAuthenticated, units_controller.get_all_units)

module.exports = router;
