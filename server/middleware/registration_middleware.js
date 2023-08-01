const db = require('../mysql/mysql');

exports.isValidUsername = async (username) => {
  const userQuery =
    'SELECT EXISTS (SELECT 1 FROM users WHERE username = ?) AS userExists';
  const [userRes] = await db.query(userQuery, [username]);
  const isAvailableUser = userRes[0].userExists === 0;
  return isAvailableUser;
};

exports.addNewUser = async (username, password, name, school) => {
  const insertUserQuery = `INSERT INTO users(username, password, name, school_name) VALUES ('${username}', '${password}', '${name}', '${school}')`;
  try {
    await db.query(insertUserQuery);
  } catch (error) {
    throw error;
  }
};
