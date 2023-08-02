const notification_middleware = require('../middleware/notification_middleware');

exports.retrieve_notifications = async (req, res) => {
    try {
        const result = await notification_middleware.retrieve_notifications(req);
        res.status(200).send(result);
    } catch(e) {
        res.status(401).json({ message: 'Error Fetching Notifications' });
    }
};