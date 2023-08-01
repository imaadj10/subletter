var express = require('express');
var router = express.Router();
const db = require('../mysql/mysql');
const auth_controller = require('../controllers/auth_controller');
const user_controller = require('../controllers/user_controller');

/* GET users listing. */
router.patch('/', user_controller.update_user_info);


module.exports = router;
