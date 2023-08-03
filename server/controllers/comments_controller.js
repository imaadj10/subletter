const db = require('../mysql/mysql');
const comment_middleware = require('../middleware/comment_middleware');

// sends username and content in the given listing's (from the params.id in url, so like localhost:1234/comments/11) comments
exports.getListingComments = async (req, res) => {
  try {
    const lid = parseInt(req.params.id);
    const query = `SELECT username, content FROM comments WHERE lid=${lid}`;
    const commentResult = await db.query(query);
    res.status(200).json(commentResult[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.createComment = async (req, res) => {
  try {
    const result = await comment_middleware.createComment(req);
    res.status(200).json({ message: 'successfully created comment', result});
  } catch (e) {
    res.status(500).json({ message: 'Unable to create comment' });
  }
};

