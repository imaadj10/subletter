const schools_middleware = require('../middleware/schools_middleware');

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await schools_middleware.getAllSchools(req);
    if (!schools[0]) {
      res.status(400).json({ message: 'No schools available' });
    }
    res.status(200).json(schools[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
