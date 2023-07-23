const isAuthenticated = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        console.log('passed');
        return next();
    } else {
        console.log('failed');
        res.redirect('/');
    }
};

module.exports = { isAuthenticated };