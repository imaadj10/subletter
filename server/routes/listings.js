const express = require('express');
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');


router.get('/', listings_controller.update_get);

module.exports = router;
