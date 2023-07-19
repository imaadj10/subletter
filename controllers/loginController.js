const asyncHandler = require('express-async-handler');

exports.login_get = asyncHandler(async (req, res, next) => {
  res.send('Not implemented yet login-GET');
});

exports.login_post = asyncHandler(async (req, res, next) => {
  res.send('Not implemented yet login-POST');
});

exports.register = asyncHandler(async (req, res, next) => {
  res.send('Not implmented yet Register');
});
