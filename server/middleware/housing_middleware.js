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
  const query =
    'INSERT INTO residences(res_name, school_name, street_address, postal_code, country) VALUES(?, ?, ?, ?, ?)';
  await db.query(query, [
    req.body.res_name,
    req.user.school,
    req.body.street_address,
    req.body.postal_code,
    req.body.country,
  ]);
};

exports.add_residence_types = async (req) => {
  for (const unit of req.body.unit_types) {
    let query =
      'INSERT INTO contains(res_name, school_name, type, price) VALUES(?, ?, ?, ?)';
    await db.query(query, [
      req.body.res_name,
      req.user.school,
      unit,
      req.body.prices[unit],
    ]);
  }
};

exports.update_residence = async (req) => {
  const update_query = `UPDATE residences
                        SET res_name = ?
                        WHERE res_name = ? AND school_name = ?`;
  await update_residence_types(req);
  const delete_query = `DELETE FROM contains
                        WHERE res_name = ?
                          AND school_name = ?
                          AND type NOT IN (?)`;
  await db.query(update_query, [
    req.body.res_name,
    req.params.residence,
    req.user.school,
  ]);
  await db.query(delete_query, [
    req.body.res_name,
    req.user.school,
    req.body.unit_types,
  ]);
};

update_residence_types = async (req) => {
  for (const type of req.body.unit_types) {
    // Check if the combination of 'res_name', 'school_name', and 'type' exists in the table
    const [exists] = await db.query(
      'SELECT EXISTS (SELECT 1 FROM contains WHERE res_name = ? AND school_name = ? AND type = ?) AS type_exists',
      [req.body.res_name, req.user.school, type]
    );

    if (exists[0].type_exists === 1) {
      // If the combination exists, perform an update
      await db.query(
        `UPDATE contains SET price = ? WHERE res_name = ? AND school_name = ? AND type = ?`,
        [req.body.prices[type], req.body.res_name, req.user.school, type]
      );
    } else {
      // If the combination doesn't exist, perform an insert
      await db.query(
        `INSERT INTO contains (res_name, school_name, type, price) VALUES (?, ?, ?, ?)`,
        [req.body.res_name, req.user.school, type, req.body.prices[type]]
      );
    }
  }
};
