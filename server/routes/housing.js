const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const  housing_controller = require('../controllers/housing_controller');

router.get('/', isAuthenticated, housing_controller.getUserHousing);

router.get('/:residence', isAuthenticated, housing_controller.getResidence)

router.post('/', isAuthenticated, housing_controller.addResidence);

router.put('/', isAuthenticated, housing_controller.updateResidence);

module.exports = router;
