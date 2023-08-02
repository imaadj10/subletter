const db = require('../mysql/mysql');

// sends username and content in the given listing's (from the params.id in url, so like localhost:1234/comments/11) comments
const getListingComments = async (req, res) => {
  try {
    const lid = parseInt(req.params.id);
    const query = `SELECT username, content FROM comments WHERE lid=${lid}`;
    const commentResult = await db.query(query);
    res.status(200).json(commentResult[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const createComment = async (req, res) => {
  try {
    const username = req.user.username;
    const lid = req.params.id;
    const { content } = req.body;
    const query = `INSERT INTO comments(username, lid, content) VALUES("${username}", ${lid}, "${content}")`;
    const newCommentResult = await db.query(query);
    res
      .status(200)
      .json({ message: 'successfully created comment', newCommentResult });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getListingComments,
  createComment,
};
