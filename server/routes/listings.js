const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './images' });
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', isAuthenticated, listings_controller.retrieve_school_listings);

// router.get('/', listings_controller.retrieve_school_listings);


router.post('/', upload.single('image'), listings_controller.add_listing);

module.exports = router;
