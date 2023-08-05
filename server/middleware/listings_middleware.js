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
    const query = `SELECT l.*, s.type AS unit, s.res_name, 'sublet' AS type FROM listings l
                    INNER JOIN sublets s on l.lid = s.lid
                    WHERE l.lid = ?`
    const res = await db.query(query, [req.params.id]);
    return res[0][0];
  } else {
    const query = `SELECT l.*, i.quantity, 'item' AS type FROM listings l
                    INNER JOIN items i on l.lid = i.lid 
                    WHERE l.lid = ?`
    const res = await db.query(query, [req.params.id]);
    return res[0][0];
  }
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

exports.update_listing_attributes = async (req) => {
  const query = 'UPDATE listings SET name = ?, description = ?, price = ? WHERE lid = ?';
  await db.query(query, [req.body.name, req.body.description, req.body.price, req.params.id]);
  if (req.body.type === 'sublet') {
    update_sublet_attributes(req.params.id, req.params.unitType, req.params.residence);
  } else {
    update_item_attributes(req.params.id, req.params.quantity)
  }
};

update_sublet_attributes = async (id, unit, res) => {
  const query = 'UPDATE sublets SET type = ?, res_name = ? WHERE lid = ?';
  await db.query(query, [unit, res, id]);
};

update_item_attributes = async (id, quantity) => {
  const query = 'UPDATE items SET quantity = ? WHERE lid = ?';
  await db.query(query, [quantity, id]);
};

exports.update_listing_image = async (id, filename) => {

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
  const [result] = await db.query(query, [id]);
  return result[0].result;
}