const comments_middleware = require('../middleware/comments_middleware');

// sends username and content in the given listing's (from the params.id in url, so like localhost:1234/comments/11) comments
exports.getListingComments = async (req, res) => {
  try {
    const result = await comments_middleware.getListingComments(req);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: 'Error Fetching Comments' });
  }
};

exports.createComment = async (req, res) => {
  try {
    await comments_middleware.createComment(req);
    res.status(200).json({ message: 'successfully created comment' });
  } catch (e) {
    res.status(500).json({ message: 'Unable to create comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await comments_middleware.deleteComment(req);
    res.status(200).send('Comment deleted');
  } catch (e) {
    res.status(500).json({ message: 'unable to delete comment' });
  }
};
