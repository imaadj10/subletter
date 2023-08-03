const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const db = require('../mysql/mysql');
const { isAuthenticated } = require('../middleware/auth_middleware');

/* GET users listing. */
router.get('/', isAuthenticated, user_controller.fetch_user_info);

router.patch('/', isAuthenticated, user_controller.update_user_info);

router.delete('/:id', user_controller.delete_user);

module.exports = router;
