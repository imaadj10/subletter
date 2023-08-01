const db = require('../mysql/mysql');

// sends username and content in the given listing's (from the params.id in url, so like localhost:1234/comments/11) comments
const getListingComments = async (req, res) => {
  try {
    const lid = req.params.id;
    const query = `SELECT username, content FROM comments WHERE lid=${lid}`;
    const commentResult = await db.query(query);
    res.status(200).json(commentResult[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getListingComments,
};
