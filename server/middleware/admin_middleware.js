const db = require('../mysql/mysql');

exports.adminGet = async (req) => {
  const table = req.params.table;
  console.log(table);
  console.log(req.query);
  if (table === 'listings') {
    const projectionBoolArray = []; // what user wants to see projected booleans
    const values = []; // user inputs (empty string or some pattern matching)
    for (const [key, value] of Object.entries(req.query)) {
      values.push(value[key]);
      projectionBoolArray.push(Object.values(value)[1]);
    }
    const query = `SELECT CASE 
      WHEN ? THEN username
      WHEN ? THEN description
      WHEN ? THEN name
    FROM listings
    WHERE 
      username LIKE ? AND
      description LIKE ? AND 
      name LIKE ?
    `;
    const result = db.query(query, [...projectionBoolArray, ...values]);
    console.log(result);
  } else if (table === 'users') {
    const { username, name, school, description } = req.query;
  } else if (table === 'residences') {
    const { resName, schoolName, streetAddress, postalCode, country } =
      req.query;
  }
  return 'bruh';
};
