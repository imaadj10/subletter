const asyncHandler = require('express-async-handler');
const { idListingsDB } = require('../tempData/listingData');

exports.update_get = asyncHandler(async (req, res) => {
  res.json(idListingsDB);
});
