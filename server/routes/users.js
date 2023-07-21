var express = require('express');
var router = express.Router();
const db = require('../mysql/mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('SELECT * FROM names', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(results); // Send the fetched data as a JSON response
  });
});

module.exports = router;
