const express = require('express');
const router = express.Router();

const login_Controller = require('../controllers/loginController');


router.get('/', login_Controller.login_get);

router.post('/', login_Controller.login_post);

router.get('/reg', login_Controller.register_get);

router.post('/reg', login_Controller.register_post);

router.get('/test', (req, res, next) => {
    res.send('Login successful');
});

module.exports = router;

