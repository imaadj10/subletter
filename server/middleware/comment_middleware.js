const db = require('../mysql/mysql');

exports.createComment = async (req) => {
  try {
    const username = req.user.username;
    const lid = req.params.id;
    const { content } = req.body;
    const receiver_query = 'SELECT username FROM listings WHERE lid = ?';
    const query = `INSERT INTO comments(username, lid, content) VALUES(?, ?, ?)`;

    await db.query(query, [username, lid, content]);

    const receiver_username = await db.query(receiver_query, [lid]);

    return receiver_username[0][0].username;
  } catch (e) {
    console.log(e);
  }
};
