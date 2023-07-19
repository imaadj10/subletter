const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const users = require('../tempData/data').userDB;

exports.login_get = asyncHandler(async (req, res, next) => {
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
  res.send('Not implmented yet Register');
});
