const express = require('express');
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const { authenticateUser } = require('../middleware/auth_middleware');

router.get('/', authenticateUser, listings_controller.retrieve_school_listings);

module.exports = router;
