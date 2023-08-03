const db = require('../mysql/mysql');

// sends username and content in the given listing's (from the params.id in url, so like localhost:1234/comments/11) comments
exports.getListingComments = async (req) => {
    try {
      const lid = parseInt(req.params.id);
      const query = `SELECT username, content FROM comments WHERE lid=${lid}`;
      const commentResult = await db.query(query);
      return commentResult[0];
    } catch (e) {
      throw e;
    }
  };
  
exports.createComment = async (req) => {
    try {
      const username = req.user.username;
      const lid = req.params.id;
      const { content } = req.body;
      const query = `INSERT INTO comments(username, lid, content) VALUES("${username}", ${lid}, "${content}")`;
      return await db.query(query);
    } catch (e) {
      throw e;
    }
  };
