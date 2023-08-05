const db = require('../mysql/mysql');

exports.getReviews = async (req) => {
  try {
    const query = `SELECT rid, username, description, rating FROM reviews WHERE res_name=? AND school_name=?`;
    const queryResult = await db.query(query, [
      req.params.residence,
      req.user.school,
    ]);
    return queryResult;
  } catch (e) {
    throw e;
  }
};

exports.getRating = async (req) => {
  try {
    const query = `SELECT AVG(rating) AS overall FROM reviews WHERE res_name=? AND school_name=?`;
    const queryResult = await db.query(query, [
      req.params.residence,
      req.user.school,
    ]);
    return queryResult;
  } catch (e) {
    throw e;
  }
};

exports.getAllResidenceReviews = async (req) => {
  try {
    const query = `SELECT res_name, AVG(rating) AS overall FROM reviews WHERE school_name=? GROUP BY res_name HAVING COUNT(*) > 1`;
    const queryResult = await db.query(query, [req.user.school]);
    return queryResult;
  } catch (e) {
    throw e;
  }
};

exports.createResidenceReview = async (req) => {
  try {
    const query = `INSERT INTO reviews(username, description, res_name, school_name, rating) VALUES (?, ?, ?, ?, ?)`;
    await db.query(query, [
      req.user.username,
      req.body.content,
      req.params.residence,
      req.user.school,
      req.body.rating,
    ]);
  } catch (e) {
    throw e;
  }
};

exports.deleteReview = async (req) => {
  try {
    const query = `DELETE FROM reviews WHERE rid=?`;
    await db.query(query, [req.params.residence]); // residence is the review id here, really weird
  } catch (e) {
    throw e;
  }
};
