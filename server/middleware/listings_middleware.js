const db = require('../mysql/mysql');

exports.retrieve_school_listings = async (req) => {
  const joinSearchQuery = `SELECT lid, listings.name, listings.username, price, image FROM listings 
                            INNER JOIN users ON listings.username = users.username 
                            WHERE school_name = ?`;
  const [res] = await db.query(joinSearchQuery, [req.user.school]);
  return res;
};

exports.get_single_listing = async (req) => {
  const type = await get_listing_type(req.params.id);
  if (type === 'sublet') {
    
  } else {

  }
  const query = 'SELECT * FROM listings WHERE lid=?';
  const queryResult = await db.query(query, [req.params.id]);
  return queryResult[0][0];
};

exports.add_new_listing = async (req) => {
  const listings_query = `INSERT INTO listings (name, username, price, description, image)
                    VALUES(?, ?, ?, ?, ?)`;
  await db.query(listings_query, [
    req.body.name,
    req.user.username,
    req.body.price,
    req.body.description,
    req.file.filename,
  ]);

  if (req.body.type === 'sublet') {
    const type_query =
      'INSERT INTO sublets(lid, type, res_name, school_name) VALUES(LAST_INSERT_ID(), ?, ?, ?)';
    await db.query(type_query, [
      req.body.unitType,
      req.body.residence,
      req.user.school,
    ]);
  } else {
    const type_query =
      'INSERT INTO items(lid, quantity) VALUES(LAST_INSERT_ID(), ?)';
    await db.query(type_query, [req.body.quantity]);
  }
};

exports.delete_listing = async (id) => {
  const query = 'DELETE FROM listings WHERE lid = ?';
  await db.query(query, [id]);
};

exports.verify_deletion_user = async (id, logged_user) => {
  const query = 'SELECT username FROM listings WHERE lid = ?';
  const [result] = await db.query(query, [id]);
  if (result[0].username !== logged_user) {
    throw Error('You are not authorized to delete this listing!');
  }
};

get_listing_type = async (id) => {
  const query = `SELECT 
                  CASE 
                      WHEN EXISTS (SELECT * FROM sublets WHERE lid = ?) THEN 'sublet'
                      ELSE 'item'
                  END AS result`;
  const [result] = db.query(query, [id]);
  return result[0].result;
}