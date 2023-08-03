const addresses_middleware = require('../middleware/addresses_middleware');

exports.getAddress = async (req, res) => {
  try {
    address = await addresses_middleware.get_address(req);
    res.status(200).json(address);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
