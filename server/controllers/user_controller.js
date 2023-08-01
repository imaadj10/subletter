const profile_middleware = require('../middleware/user_middleware');

exports.update_user_info = async (req, res) => {
    const { old_username, new_username, new_password } = req.body;
    
    try {
        await profile_middleware.update_user_info(old_username, new_username, new_password);
        res.status(200).send("Successfully updated");
    } catch(e) {
        console.log("failed at user controller")
        res.status(401).json({ message: 'Error updating user info'});
    }
};