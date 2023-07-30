const db = require('../mysql/mysql');
const auth_middleware = require('./auth_middleware');

exports.isValidUsername = async (username) => {
    const userQuery = 'SELECT EXISTS (SELECT 1 FROM users WHERE username = ?) AS userExists';
    const [userRes] = await db.query(userQuery, [username]);
    const isAvaliableUser = userRes[0].userExists === 0;

    return isAvaliableUser;
}

exports.addNewUser = async (username, password, name, school) => {
    const insertUserQuery = `INSERT INTO users(username, password, name, school_name) VALUES ('${username}', '${password}', '${name}', '${school}')`;
    try {
        await db.query(insertUserQuery);
    } catch (error) {
        throw error;
    }
}