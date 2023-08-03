const db = require('../mysql/mysql');

exports.retrieve_school_listings = async (req) => {

  const joinSearchQuery = `SELECT lid, listings.name, listings.username, price, image FROM listings 
                            INNER JOIN users ON listings.username = users.username 
                            WHERE school_name = ?`;
  const [res] = await db.query(joinSearchQuery, [req.user.school]);
  return res;
};

exports.add_new_listing = async (req) => {
  const listings_query = `INSERT INTO listings (name, username, price, description, image)
                    VALUES(?, ?, ?, ?, ?)`;
  await db.query(listings_query, [req.body.name, req.user.username, req.body.price, req.body.description, req.file.filename]);

  if (req.body.type === 'sublet') {
    const type_query = 'INSERT INTO sublets(lid, type, res_name, school_name) VALUES(LAST_INSERT_ID(), ?, ?, ?)';
    await db.query(type_query, [req.body.unitType, req.body.residence, req.user.school]);
  } else {
    const type_query = 'INSERT INTO items(lid, quantity) VALUES(LAST_INSERT_ID(), ?)';
    await db.query(type_query, [req.body.quantity]);
  }
};
