var express = require('express');
var router = express.Router();
const db = require('../mysql/mysql');
const { authenticateUser } = require('../middleware/auth_middleware');

/* GET users listing. */
router.get('/', authenticateUser, function (req, res, next) {
  let name = 'Imaad';
  let query = `SELECT IF('${name}' IN (SELECT username FROM users), true, false) AS result`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Error executing query' });
    }
    res.json(results); // Send the fetched data as a JSON response
  });
});

module.exports = router;
