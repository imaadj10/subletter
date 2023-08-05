const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const {
  getResidenceReviews,
  getAllResidenceReviews,
  createResidenceReview,
} = require('../controllers/reviews_controller');

router
  .route('/:residence')
  .get(isAuthenticated, getResidenceReviews)
  .post(isAuthenticated, createResidenceReview);
router.route('/').get(isAuthenticated, getAllResidenceReviews);

module.exports = router;
