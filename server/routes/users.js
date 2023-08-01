const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const db = require('../mysql/mysql');
const { isAuthenticated } = require('../middleware/auth_middleware');

/* GET users listing. */
router.get('/', user_controller.fetch_user_description);

router.patch('/update', user_controller.update_user_info);


module.exports = router;
