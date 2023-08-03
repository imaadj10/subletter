const housing_middleware = require('../middleware/housing_middleware');
const addresses_middleware = require('../middleware/addresses_middleware');

exports.getUserHousing = async (req, res) => {
  try {
    const result = await housing_middleware.getUserHousing(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

exports.addResidence = async (req, res) => {
  try {
    await addresses_middleware.add_new_address(req);
    await housing_middleware.add_new_residence(req);
    await housing_middleware.add_residence_types(req);

    res.status(201).send('Successfully added residence!')
  } catch (error) {
    res.status(400).json({ message: error});
  }
};
