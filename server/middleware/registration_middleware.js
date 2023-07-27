const db = require('../mysql/mysql');
const auth_middleware = require('./auth_middleware');

exports.isValidUsername = (username) => {
    return (auth_middleware.users.find(u => u.username === username)) ? false : true;
}

exports.addNewUser = (username, password) => {
    const user = { username: username, password: password }
    auth_middleware.users.push(user);
}