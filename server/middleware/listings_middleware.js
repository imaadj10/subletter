const db = require('../mysql/mysql');

exports.retrieve_school_listings = async (username) => {
  const result = await db.query(
    `SELECT school_name FROM users WHERE username='${username}'`
  );
  const school = result[0][0].school_name;
  const joinSearchQuery = `SELECT lid, listings.name, listings.username, price, image FROM listings 
                            INNER JOIN users ON listings.username = users.username 
                            WHERE school_name = '${school}'`;
  const [res] = await db.query(joinSearchQuery);
  return res;
};

exports.add_new_listing = async (req) => {
  const listings_query = `INSERT INTO listings (name, username, price, description, image)
                    VALUES('${req.body.name}', '${req.user.username}', ${req.body.price}, '${req.body.description}', '${req.file.filename}')`;
  const type_query =
    req.body.type === 'sublet'
      ? `INSERT INTO sublets(lid, type, res_name, school_name) VALUES(LAST_INSERT_ID(), '${req.body.unitType}', '${req.body.residence}', '${req.user.school}')`
      : `INSERT INTO items(lid, quantity) VALUES(LAST_INSERT_ID(), ${req.body.quantity})`;
  await db.query(listings_query);
  await db.query(type_query);
};
