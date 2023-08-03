const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const comments_controller = require('../controllers/comments_controller');

router.get('/:id', isAuthenticated, comments_controller.getListingComments)

router.post('/:id', isAuthenticated, comments_controller.createComment);

module.exports = router;
