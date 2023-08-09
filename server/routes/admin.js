const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const { adminGet } = require('../controllers/admin_controller');

router.route('/:table').get(isAuthenticated, adminGet);

module.exports = router;
