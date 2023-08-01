const db = require('../mysql/mysql');

exports.update_user_info = async (old_username, new_username, new_password) => {
  try {
    const result = await db.query(
      'UPDATE users SET username = ? WHERE username = ?',
      [new_username, old_username]
    );
  } catch (e) {
    console.log(e);
  }
};
