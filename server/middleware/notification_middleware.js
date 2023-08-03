const db = require('../mysql/mysql');

exports.retrieve_notifications = async (req) => {
  const result = await db.query(
    'SELECT * FROM notifications WHERE username = ?',
    [req.user.username]
  );

  return result[0].reverse();
};

exports.add_notification = async (req) => {
  await db.query(
    'INSERT INTO notifications (username, content, title)  VALUES  (?,?,?)',
    [req.body.username, req.body.content, req.body.title]
  );
};

// Need to test
exports.delete_notification = async (req) => {
  const notif_id = req.params.id;

  await db.query('DELETE FROM notifications WHERE nid = ?', [notif_id]);
};
