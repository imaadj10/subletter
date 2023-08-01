const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth_middleware');
const { getListingComments } = require('../controllers/comments_controller');

router.route('/:id').get(isAuthenticated, getListingComments);

module.exports = router;
