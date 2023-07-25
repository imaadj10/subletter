const db = require('../mysql/mysql');

const users = [
    { username: 'user1', password: '123' },
    { username: 'user2', password: '567' },
    { username: 'user3', password: '12457' },
];

exports.verifyUser = (username, password) => {
    return users.find(u => u.username === username && u.password === password);
};
