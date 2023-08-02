const db = require("../mysql/mysql");
const { getIO } = require('../socketManager');

exports.get_conversations = async (req, res) => {
  try {
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
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(401).json({ message: 'Error Fetching Conversations' });
  }
};

exports.get_conversation_messages = async (req, res) => {
  try {
    const query = `SELECT * FROM messages
                    WHERE (sid = '${req.user.username}' OR rid = '${req.user.username}') AND (sid = '${req.params.conversation}' OR rid = '${req.params.conversation}')
                    ORDER BY time_sent ASC;`;
    const result = await db.query(query);
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(401).json({ message: 'Error Fetching Messages' });
  }
};

exports.send_new_message = async (req, res, io) => {
  try {
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

    res.status(201).send('Message sent.');
  } catch (error) {
    res.status(401).json({ message: 'Error Sending Messages' });
  }
};
