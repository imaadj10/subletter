var express = require('express');
var router = express.Router();
const db = require('../mysql/mysql');
const { isAuthenticated } = require('../middleware/auth_middleware');

/* GET users listing. */
router.patch('/', user_controller.update_user_info);


module.exports = router;
