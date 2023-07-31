const express = require('express');
const router = express.Router();
const { getAllSchools } = require('../controllers/schools_controller');

router.route('/').get(getAllSchools);

module.exports = router;
