const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './images' });
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const auth_controller = require('../controllers/auth_controller');

router.get('/', auth_controller.isAuthenticated, listings_controller.retrieve_school_listings);

router.post('/', upload.single('image'), listings_controller.add_listing);

module.exports = router;
