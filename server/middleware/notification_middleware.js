const db = require('../mysql/mysql');

exports.retrieve_notifications = async (req) => {
    const result = await db.query('SELECT * FROM notifications WHERE username = ?', [
        req.user.username
    ]);

    return result[0].reverse();
};

exports.add_notification = async (req) => {
    
    await db.query('INSERT INTO notifications (username, content)  VALUES  (?,?)', [
        req.body.username, 
        req.body.content
    ]);
};