const db = require('../mysql/mysql');

exports.getUserHousing = async (req) => {
  try {
    const school = req.user.school;
    const query = `SELECT
                      r.res_name,
                      r.school_name,
                      r.street_address,
                      r.postal_code,
                      r.country,
                      a1.city,
                      a1.province,
                      GROUP_CONCAT(c.type) AS types_list,
                      GROUP_CONCAT(CONCAT(c.type, ':', c.price)) AS prices_list
                    FROM
                        residences AS r
                    INNER JOIN addresses_1 AS a1 ON r.postal_code = a1.postal_code AND r.country = a1.country
                    LEFT JOIN
                        contains AS c ON r.res_name = c.res_name AND r.school_name = c.school_name
                    WHERE r.school_name = ?
                    GROUP BY
                        r.res_name,
                        r.school_name`;
    const result = await db.query(query, [school]);
    return result[0];
  } catch (e) {
    throw e;
  }
};

exports.get_residence = async (req) => {
  const query = `SELECT r.res_name, r.school_name, r.street_address, r.postal_code, r.country, a1.city, a1.province, c.type, c.price FROM residences r
                  INNER JOIN addresses_1 a1 ON r.postal_code = a1.postal_code AND r.country = a1.country
                  INNER JOIN contains c ON r.res_name = c.res_name AND r.school_name = c.school_name
                  WHERE r.res_name = ? AND r.school_name = ?`;
  const result = await db.query(query, [req.params.residence, req.user.school]);
  return result[0];
};

exports.add_new_residence = async (req) => {
  const query = 'INSERT INTO residences(res_name, school_name, street_address, postal_code, country) VALUES(?, ?, ?, ?, ?)';
  await db.query(query, [req.body.res_name, req.user.school, req.body.street_address, req.body.postal_code, req.body.country]);
};

exports.add_residence_types = async (req) => {
  for (const unit of req.body.unit_types) {
    let query = 'INSERT INTO contains(res_name, school_name, type, price) VALUES(?, ?, ?, ?)';
    await db.query(query, [req.body.res_name, req.user.school, unit, req.body.prices[unit]]);
  }
}
