const express = require('express');
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');


router.get('/', listings_controller.retrieve_school_listings);

module.exports = router;
