const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth_middleware');
const { getListingComments } = require('../controllers/comments_controller');

router.route('/:id').get(authenticateUser, getListingComments);

module.exports = router;
