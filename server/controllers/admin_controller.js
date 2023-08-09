const admin_middleware = require('../middleware/admin_middleware');

exports.adminGet = async (req, res) => {
  try {
    const result = await admin_middleware.adminGet(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
