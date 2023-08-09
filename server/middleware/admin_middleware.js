const db = require('../mysql/mysql');

exports.adminGet = async (req) => {
  const table = req.params.table;
  const attributes = req.body.attributes;
  const attributeList = attributes.join(', ');
  if (table === 'listings') {
    const query = `SELECT ${attributeList} FROM listings 
    WHERE username LIKE '%${req.body.username}%' AND
    name LIKE '%${req.body.name}%' AND
    description LIKE '%${req.body.description}%' AND
    price >= ${req.body.min}`;
    const result = await db.query(query);
    return result;
  } else if (table === 'users') {
    const query = `SELECT ${attributeList} FROM users
    WHERE username LIKE '%${req.body.username}%'
    AND school_name LIKE '%${req.body.school}%'
    AND name LIKE '%${req.body.name}%'
    AND description LIKE '%${req.body.school}%'`;
    const result = await db.query(query);
    return result;
  } else if (table === 'residences') {
    const query = `SELECT ${attributeList} FROM residences 
    WHERE res_name LIKE '%${req.body.resName}%' AND
    school_name LIKE '%${req.body.scholName}%' AND 
    street_address LIKE '%${req.body.streetAddress}%' AND 
    postal_code LIKE '%${req.body.postalCode}%' AND
    country LIKE '%${req.body.country}%'`;
    const result = await db.query(query);
    return result;
  }
  throw new Error();
};
