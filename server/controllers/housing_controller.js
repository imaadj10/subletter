const db = require('../mysql/mysql');

const getUserHousing = async (req, res) => {
  try {
    const school = req.user.school;
    const query = `SELECT * FROM residences WHERE school_name = "${school}"`;
    const result = await db.query(query);
    res.status(200).json(result[0]);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

module.exports = { getUserHousing };
