const bcrypt = require('bcrypt');
const registration_middleware = require('../middleware/registration_middleware');
const auth_controller = require('./auth_controller');

exports.handle_registration = async (req, res, next) => {
    const { username, password } = req.body;
    
    if (registration_middleware.isValidUsername()) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            registration_middleware.addNewUser(username, hashedPassword);
            //res.status(201).send('Successfully registered');
            auth_controller.process_login(req, res, next, true);
        } catch {
            res.status(401).json({ message: 'Error Registering' });
        }
    } else {
        res.status(401).json({ message: 'Username Taken' });
    }
}