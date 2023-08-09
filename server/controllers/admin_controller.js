const addresses_middleware = require('../middleware/admin_middleware');

exports.adminGet = async (req, res) => {
  try {
    const result = await addresses_middleware.adminGet(req);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).json({ message: e, nuts: 'LMAO' });
  }
};
