const db = require('../mysql/mysql');
const comment_middleware = require('../middleware/comment_middleware');

exports.getListingComments = async (req, res) => {
  try {
    const result = await comment_middleware.getComments(req);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).json({ message: 'Error Fetching Comments' });
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

