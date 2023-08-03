const jwt = require('jsonwebtoken');
const user_middleware = require('../middleware/user_middleware');

exports.fetch_user_info= async (req, res) => {
  try {
    const result = await user_middleware.get_user_info(req.query.username);
    res.status(200).send(result);
  } catch (e) {
    res.status(401).json({ message: 'Error Fetching Description '});
  }
};

exports.update_user_info = async (req, res) => {
  const { old_username, new_username, new_password, new_description } = req.body;

  try {
    const username = await user_middleware.update_user_info(
      old_username,
      new_username,
      new_password,
      new_description
    );

    const token = jwt.sign(
      {
        username: username,
      },
      'RANDOM-TOKEN',
      { expiresIn: '24h' }
    );

    res.status(200).send({
      username: username,
      token,
    });
  } catch (e) {
    console.log('failed at user controller');
    res.status(401).json({ message: 'Error updating user info' });
  }
};

exports.delete_user = async (req, res) => {
  try {
    await user_middleware.delete_user(req);
  } catch(e) {
    res.status(500).json({ message: 'Error deleting user'});
  }
}
