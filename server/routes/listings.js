const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './images' });
const router = express.Router();
const listings_controller = require('../controllers/listings_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router
  .route('/')
  .get(isAuthenticated, listings_controller.retrieve_school_listings)
  .post(
    isAuthenticated,
    upload.single('image'),
    listings_controller.add_listing
  );

router.route('/:id').get(isAuthenticated, listings_controller.getSingleListing);

module.exports = router;
