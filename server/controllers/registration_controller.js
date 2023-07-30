const bcrypt = require('bcrypt');
const registration_middleware = require('../middleware/registration_middleware');
const auth_controller = require('./auth_controller');

exports.handle_registration = async (req, res, next) => {
    const { username, password, name, school } = req.body;
    const isValidUsername = await registration_middleware.isValidUsername(username);

    if (isValidUsername) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            await registration_middleware.addNewUser(username, hashedPassword, name, school);
            auth_controller.process_login(req, res, next, true);
        } catch {
            res.status(401).json({ message: 'Error Registering' });
        }
    } else {
        res.status(401).json({ message: 'Username Taken' });
    }
}