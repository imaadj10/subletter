const db = require('../mysql/mysql');

exports.getUserHousing = async (req) => {
  try {
    const school = req.user.school;
    const query = 'SELECT * FROM residences WHERE school_name = ?';
    const result = await db.query(query, [school]);
    return result[0];
  } catch (e) {
    throw e;
  }
};

exports.add_new_residence = async (req) => {
  const query = 'INSERT INTO residences(res_name, school_name, street_address, postal_code, country) VALUES(?, ?, ?, ?)';
  await db.query(query, [req.body.res_name, req.user.school, req.body.street_address, req.body.postal_code, req.body.country]);
};

exports.add_residence_types = async (req) => {
  for (let i = 0; i < req.body.unit_types.length; i++) {
    let query = 'INSERT INTO contains(res_name, school_name, type, price) VALUES(?, ?, ?, ?)';
    await db.query(query, req.body.res_name, req.user.school, type, req.body.price);
  }
}
