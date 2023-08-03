const db = require('../mysql/mysql');

exports.getUserHousing = async (req) => {
    try {
      const school = req.user.school;
      const query = `SELECT * FROM residences WHERE school_name = "${school}"`;
      const result = await db.query(query);
      return result[0];
    } catch (e) {
      throw e;
    }
  };