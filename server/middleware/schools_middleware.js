const db = require('../mysql/mysql');

exports.getAllSchools = async (req) => {
    const text = req.query.text;
    const query = `SELECT * FROM schools WHERE school_name LIKE "%${text}%" LIMIT 5`;
    const schools = await db.query(query);
    return schools;
};
