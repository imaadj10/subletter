const db = require('../mysql/mysql');

exports.retrieve_notifications = async (req) => {
    const result = await db.query('SELECT * FROM notifications WHERE username = ?', [
        req.user.username
    ]);

    return result[0].reverse();
};