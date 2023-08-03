const db = require('../mysql/mysql');

exports.getAllSchools = async (req) => {
    const text = req.query.text;
    const query = `SELECT * FROM schools WHERE school_name LIKE "%${text}%" LIMIT 5`;
    const schools = await db.query(query);
    return schools;
    if (!schools[0]) {
      res.status(400).json({ message: 'No schools available' });
    }
    res.status(200).json(schools[0]);
};
