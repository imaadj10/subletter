const db = require('../mysql/mysql');

const getAllSchools = async (req, res) => {
  try {
    const text = req.query.text;
    const query = `SELECT * FROM schools WHERE school_name LIKE "%${text}%" LIMIT 5`;
    const schools = await db.query(query);
    if (!schools[0]) {
      res.status(400).json({ message: 'No schools available' });
    }
    res.status(200).json(schools[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getAllSchools,
};
