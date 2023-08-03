const db = require("../mysql/mysql");
const { getIO } = require('../socketManager');

exports.get_conversations = async (req) => {
    const query = `SELECT conversation_partner
                    FROM (
                        SELECT 
                            CASE
                                WHEN sid = ? THEN rid
                                ELSE sid
                            END AS conversation_partner,
                            MAX(time_sent) AS max_time_sent
                        FROM
                            messages
                        WHERE
                            ? IN (sid, rid)
                        GROUP BY
                            conversation_partner
                    ) AS subquery
                    ORDER BY
                        max_time_sent DESC`;
    const result = await db.query(query, [req.user.username, req.user.username]);
    return result[0];
};

exports.get_conversation_messages = async (req) => {
    if (req.user.username !== req.params.conversation) {
        const query = `SELECT * FROM messages
                        WHERE (sid = ? OR rid = ?) AND (sid = ? OR rid = ?)
                        ORDER BY time_sent ASC;`;
        const result = await db.query(query, [req.user.username, req.user.username, req.params.conversation, req.params.conversation]);
        return result[0];
    } else {
        const query = `SELECT * FROM messages
                        WHERE sid = ? AND rid = ?
                        ORDER BY time_sent ASC;`
        const result = await db.query(query, [req.user.username, req.user.username]);
        return result[0];
    }
};

exports.send_new_message = async (req) => {
    const query = `INSERT INTO messages(sid, rid, content)
                    VALUES (?, ?, ?)`;
    await db.query(query, [req.user.username, req.params.conversation, req.body.message]);

    // Emit the 'new_message' event to relevant clients using the getIO function
    const io = getIO();
    const message = {
      sid: req.user.username,
      rid: req.params.conversation,
      content: req.body.message,
    };
    io.emit('new_message', message);
};
