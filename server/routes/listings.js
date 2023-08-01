const express = require('express');
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const auth_controller = require('../controllers/auth_controller');

router.patch('/', auth_controller.isAuthenticated, listings_controller.retrieve_school_listings);

module.exports = router;
