const db = require("../mysql/mysql");
const { getIO } = require('../socketManager');

exports.get_conversations = async (req) => {
    const query = `SELECT conversation_partner
                    FROM (
                        SELECT 
                            CASE
                                WHEN sid = '${req.user.username}' THEN rid
                                ELSE sid
                            END AS conversation_partner,
                            MAX(time_sent) AS max_time_sent
                        FROM
                            messages
                        WHERE
                            '${req.user.username}' IN (sid, rid)
                        GROUP BY
                            conversation_partner
                    ) AS subquery
                    ORDER BY
                        max_time_sent DESC`;
    const result = await db.query(query);
    return result[0];
};

exports.get_conversation_messages = async (req) => {
    const query = req.user.username !== req.params.conversation ?
                  `SELECT * FROM messages
                    WHERE (sid = '${req.user.username}' OR rid = '${req.user.username}') AND (sid = '${req.params.conversation}' OR rid = '${req.params.conversation}')
                    ORDER BY time_sent ASC;` :
                  `SELECT * FROM messages
                    WHERE sid = '${req.user.username}' AND rid = '${req.user.username}'
                    ORDER BY time_sent ASC;`
    const result = await db.query(query);
    return result[0];
};

exports.send_new_message = async (req) => {
    const query = `INSERT INTO messages(sid, rid, content)
                    VALUES ('${req.user.username}', '${req.params.conversation}', '${req.body.message}')`;
    await db.query(query);

    // Emit the 'new_message' event to relevant clients using the getIO function
    const io = getIO();
    const message = {
      sid: req.user.username,
      rid: req.params.conversation,
      content: req.body.message,
    };
    io.emit('new_message', message);
};
