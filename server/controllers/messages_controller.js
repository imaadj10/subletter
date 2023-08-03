const messages_middleware = require('../middleware/messages_middleware');

exports.get_conversations = async (req, res) => {
  try {
    const result = await messages_middleware.get_conversations(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(401).json({ message: 'Error Fetching Conversations' });
  }
};

exports.get_conversation_messages = async (req, res) => {
  try {
    const result = await messages_middleware.get_conversation_messages(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(401).json({ message: 'Error Fetching Messages' });
  }
};

exports.send_new_message = async (req, res) => {
  try {
    await messages_middleware.send_new_message(req);
    res.status(201).send('Message sent.');
  } catch (error) {
    res.status(401).json({ message: 'Error Sending Messages' });
  }
};
