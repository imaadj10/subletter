const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const comments_controller = require('../controllers/comments_controller');

router
  .route('/:id')
  .get(isAuthenticated, comments_controller.getListingComments)
  .post(isAuthenticated, comments_controller.createComment)
  .delete(isAuthenticated, comments_controller.deleteComment);

module.exports = router;
