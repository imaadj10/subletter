const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const reviews_controller = require('../controllers/reviews_controller');

router.get('/', isAuthenticated, reviews_controller.getAllResidenceReviews)

router.get('/:residence', isAuthenticated, reviews_controller.getResidenceReviews);

router.post('/:residence', isAuthenticated, reviews_controller.createResidenceReview);

router.delete('/:residence', isAuthenticated, reviews_controller.deleteReview);

module.exports = router;
