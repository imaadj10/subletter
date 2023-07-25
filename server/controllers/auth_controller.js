const auth_middleware = require ('../middleware/auth_middleware')

exports.process_login = (req, res) => {
    const { username, password } = req.body;

    // Find the user with the given username and password in the users array (replace this with a database query)
    const user = auth_middleware.verifyUser(username, password);
    
    if (user) {
      // If the user is found, create a session
      req.session.user = user.username;
      req.session.save()
      res.json({ message: 'Login successful', user: user });
    } else {
      // If the user is not found, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.isAuthenticated = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        console.log('passed');
        return next();
    } else {
        console.log('failed');
        res.redirect('/');
    }
};