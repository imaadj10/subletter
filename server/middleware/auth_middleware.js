const db = require('../mysql/mysql');
const bcrypt = require('bcrypt');

exports.users = [
    // { username: 'user1', password: '123' },
    // { username: 'user2', password: '567' },
    // { username: 'user3', password: '12457' },
];

exports.verifyUser = async (username, password) => {
    const user = this.users.find(u => u.username === username)
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            return Promise.resolve(true);
        }
    }
    return Promise.resolve(false);
};
