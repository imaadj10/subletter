var express = require('express');
var router = express.Router();
const db = require('../mysql/mysql');

const users = [
    { username: 'user1', password: '123' },
    { username: 'user2', password: '567' },
    { username: 'user3', password: '12457' },
];

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // Find the user with the given username and password in the users array (replace this with a database query)
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // If the user is found, create a session
      req.session.user = user.username;
      req.session.save()
      res.json({ message: 'Login successful', user: user });
    } else {
      // If the user is not found, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

module.exports = router;