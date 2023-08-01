const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './images' });
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const { authenticateUser } = require('../middleware/auth_middleware');

router.get('/', authenticateUser, listings_controller.retrieve_school_listings);

router.post('/', upload.single('image'), listings_controller.add_listing);

module.exports = router;
