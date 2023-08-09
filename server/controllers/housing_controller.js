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

exports.getResidence = async (req, res) => {
  try {
    const result = await housing_middleware.get_residence(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ message: e });
  }
};

exports.addResidence = async (req, res) => {
  try {
    await addresses_middleware.add_new_address(req);
    await housing_middleware.add_new_residence(req);
    await housing_middleware.add_residence_types(req);
    res.status(201).send('Successfully added residence!');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateResidence = async (req, res) => {
  try {
    await addresses_middleware.update_address(req);
    await housing_middleware.update_residence(req);
    res.status(201).send('Successfully updated residence!');
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getTopHousing = async (req, res) => {
  try {
    const result = await housing_middleware.get_top_residence(req);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
