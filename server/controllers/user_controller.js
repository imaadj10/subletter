const jwt = require('jsonwebtoken');
const user_middleware = require('../middleware/user_middleware');

exports.update_user_info = async (req, res) => {
    const { old_username, new_username, new_password } = req.body;
    
    try {
        const username = await user_middleware.update_user_info(old_username, new_username, new_password);

        const token = jwt.sign(
            {
              username: username,
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );
          
          res.status(200).send({
            username: username,
            token,
          });
    } catch(e) {
        console.log("failed at user controller")
        res.status(401).json({ message: 'Error updating user info'});
    }
};