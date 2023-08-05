const db = require('../mysql/mysql');

exports.getListingComments = async (req) => {
  const id = parseInt(req.params.id);
};

exports.getReviews = async (req) => {
  const query = `SELECT rid, username, description, rating FROM reviews WHERE res_name=? AND school_name=?`;
  const queryResult = await db.query(query, [
    req.params.residence,
    req.user.school,
  ]);
  return queryResult;
};

exports.getRating = async (req) => {
  const query = `SELECT AVG(rating) AS overall FROM reviews WHERE res_name=? AND school_name=?`;
  const queryResult = await db.query(query, [
    req.params.residence,
    req.user.school,
  ]);
  return queryResult;
};

exports.getAllResidenceReviews = async (req) => {
  const query = `SELECT res_name, AVG(rating) AS overall FROM reviews WHERE school_name=? GROUP BY res_name HAVING COUNT(*) > 1`;
  const queryResult = await db.query(query, [req.user.school]);
  return queryResult;
};

exports.createResidenceReview = async (req) => {
  const query = `INSERT INTO reviews(username, description, res_name, school_name, rating) VALUES (?, ?, ?, ?, ?)`;
  await db.query(query, [
    req.user.username,
    req.body.content,
    req.params.residence,
    req.user.school,
    req.body.rating,
  ]);
};

exports.deleteReview = async (req) => {
  const query = `DELETE FROM reviews WHERE rid=?`;
  await db.query(query, [req.params.residence]); // residence is the review id here, really weird
};
