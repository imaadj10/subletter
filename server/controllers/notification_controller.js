const notification_middleware = require('../middleware/notification_middleware');

exports.retrieve_notifications = async (req, res) => {
  try {
    const result = await notification_middleware.retrieve_notifications(req);
    res.status(200).send(result);
  } catch (e) {
    res.status(401).json({ message: 'Error Fetching Notifications' });
  }
};

exports.add_notification = async (req, res) => {
  try {
    await notification_middleware.add_notification(req);
    res.status(201).send('Added notification!');
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Unable to add notification' });
  }
};

exports.delete_notification = async (req, res) => {
  try {
    await notification_middleware.delete_notification(req);
    res.status(200).send('Notification deleted!');
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Unable to delete notification ' });
  }
};
