var express = require('express');
var router = express.Router();
const db = require('../mysql/mysql');
const auth_controller = require('../controllers/auth_controller');

/* GET users listing. */
router.get('/', auth_controller.isAuthenticated)


module.exports = router;
