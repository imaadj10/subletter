const bcrypt = require('bcrypt');
const db = require('../mysql/mysql');
const registration_middleware = require('../middleware/registration_middleware');

exports.get_user_info = async (username) => {
  const result = await db.query(
    'SELECT school_name, description FROM users WHERE username = ?', [
      username
  ]);
  return result[0][0];
};

exports.update_user_info = async (old_username, new_username, new_password, new_description) => {
  const isValidUsername = await registration_middleware.isValidUsername(
    new_username
  );

  try {
    // Does not check if password is the same as the current password
    if (new_password && new_password.length > 0) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(new_password, salt);
      await db.query('UPDATE users SET password = ? WHERE username = ?', [
        hashedPassword,
        old_username,
      ]);
    }

    if (new_description) {
      await db.query('UPDATE users SET description = ? WHERE username = ?', [
        new_description,
        old_username
      ]);
    }

    if (
      isValidUsername &&
      new_username &&
      new_username.length > 0 &&
      new_username != old_username
    ) {
      await db.query('UPDATE users SET username = ? WHERE username = ?', [
        new_username,
        old_username,
      ]);
    }
  } catch (e) {
    console.log(e);
  }

  return new_username !== '' && new_username !== undefined ? new_username : old_username;
};


exports.delete_user = async (req, res) => {
  await db.query('DELETE FROM users WHERE username = ?', [
    req.user.username,
  ]);
};