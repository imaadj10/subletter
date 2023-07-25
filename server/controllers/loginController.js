// const asyncHandler = require('express-async-handler');
// const bcrypt = require('bcrypt');
// const users = require('../tempData/data').userDB;
// const { userDB } = require('../tempData/data');

// exports.login_get = asyncHandler(async (req, res, next) => {
//   // Render login page
//   res.render('login.pug', {
//     title: 'Login',
//   });
//   // res.send('Not implemented yet login-GET');
// });

// exports.login_post = (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const userExists = userDB.find((user) => user.username === username);

//     if (userExists) {
//       res.json('exists');
//     } else {
//       res.json('notexists');
//     }
//   } catch (e) {
//     res.json('notexists other error');
//   }
// };

// exports.signup_post = (req, res, next) => {
//   const { username, password } = req.body;

//   const data = {
//     username: username,
//     password: password,
//   };

//   try {
//     const userExists = userDB.find((user) => user.username === username);

// 	console.log(userExists);

//     if (userExists) {
//       res.json('exists');
//     } else {
//       res.json('notexists');
//       userDB.push(data);
// 	  console.log(data);
//     }
//   } catch (e) {
// 	console.log(e);
//     res.json('notexist error');
//   }
// };

// // exports.login_post = asyncHandler(async (req, res, next) => {
// // 	res.redirect("/main/test");
// // 	const currUser = users.find((data) => req.body.email === data.email);

// // 	if (currUser) {
// // 		const inputPass = req.body.password;
// // 		const storedPass = currUser.password;

// // 		const passwordMatch = await bcrypt.compare(inputPass, storedPass);
// // 		if (passwordMatch) {
// // 			// Success Render page after login in
// // 		} else {
// // 			// Failed Wrong password Render same login page but with failed message
// // 		}
// // 	} else {
// // 		// Failed Invalid user Render same login page but with failed message
// // 	}
// // });

// exports.register_get = asyncHandler(async (req, res, next) => {
//   res.send('Registration get page');
// });

// exports.register_post = asyncHandler(async (req, res, next) => {
//   res.send('Registration post page');
//   const foundUser = user.find((data) => req.body.email === data.email);

//   if (!foundUser) {
//     const hashPass = await bcrypt.hash(req.body.password, 10);

//     const newUser = {
//       id: Date.now(),
//       username: req.body.username,
//       email: req.body.email,
//       password: hashPass,
//     };
//     users.push(newUser);
//     console.log(`Current Users: ${users}`);

//     // Render registration successful
//   } else {
//     // Render register page with User already exists
//   }
//   res.send('Not implmented yet Register');
// });
