const express = require('express');
const router = express.Router();
const {
  getAllSchools,
  getTopSchools,
} = require('../controllers/schools_controller');
const { isAuthenticated } = require('../middleware/auth_middleware');

router.get('/', getAllSchools);

router.get('/top', isAuthenticated, getTopSchools);

module.exports = router;
