const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const {
  getResidenceReviews,
  getAllResidenceReviews,
  createResidenceReview,
  deleteReview,
} = require('../controllers/reviews_controller');

router
  .route('/:residence')
  .get(isAuthenticated, getResidenceReviews)
  .post(isAuthenticated, createResidenceReview)
  .delete(isAuthenticated, deleteReview);

router.route('/').get(isAuthenticated, getAllResidenceReviews);

module.exports = router;
