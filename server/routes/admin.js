const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const admin_controller = require('../controllers/admin_controller');

router.route('/:table').post(isAuthenticated, admin_controller.adminGet);

module.exports = router;
