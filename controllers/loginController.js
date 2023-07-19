const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const users = require('../tempData/data').userDB;

exports.login_get = asyncHandler(async (req, res, next) => {
	// Render login page
  res.send('Not implemented yet login-GET');
});

exports.login_post = asyncHandler(async (req, res, next) => {
	const currUser = users.find((data) => req.body.email === data.email);

	if (currUser) {
		const inputPass = req.body.password;
		const storedPass = currUser.password;

		const passwordMatch = await bcrypt.compare(inputPass, storedPass);
		if (passwordMatch) {
			// Success Render page after login in
		} else {
			// Failed Wrong password Render same login page but with failed message
		}
	} else {
		// Failed Invalid user Render same login page but with failed message
	}
  res.send('Not implemented yet login-POST');
});

exports.register = asyncHandler(async (req, res, next) => {
	const foundUser = user.find((data) => req.body.email === data.email);

	if (!foundUser) {
		const hashPass = await bcrypt.hash(req.body.password, 10);

		const newUser = {
			id: Date.now(),
			username: req.body.username,
			email: req.body.email,
			password: hashPass,
		};
		users.push(newUser);
		console.log(`Current Users: ${users}`);

		// Render registration successful
	} else {
		// Render register page with User already exists
	}
  res.send('Not implmented yet Register');
});
