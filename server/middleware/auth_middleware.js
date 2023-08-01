const jwt = require('jsonwebtoken');
const db = require('../mysql/mysql');
const bcrypt = require('bcrypt');

exports.verifyUser = async (username, password) => {
  try {
    const userQuery =
      'SELECT EXISTS (SELECT 1 FROM users WHERE username = ?) AS userExists';
    const [userRes] = await db.query(userQuery, [username]);
    const userExists = userRes[0].userExists === 1;

    if (userExists) {
      const passQuery = 'SELECT password FROM users WHERE username = ?';
      const [passRes] = await db.query(passQuery, [username]);
      const truePassword = passRes[0].password.toString('utf8');

      if (await bcrypt.compare(password, truePassword)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error occurred:', error);
    return false;
  }
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(' ')[1];

    //check if the token matches the supposed origin
    const user = await jwt.verify(token, 'RANDOM-TOKEN');

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
