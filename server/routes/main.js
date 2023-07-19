const express = require('express');
const router = express.Router();

const login_Controller = require('../controllers/loginController');


router.get('/', login_Controller.login_get);

module.exports = router;

