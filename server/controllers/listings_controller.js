const asyncHandler = require('express-async-handler');
const listings_middleware = require('../middleware/listings_middleware');

exports.retrieve_school_listings = asyncHandler(async (req, res) => {
  try {
    await listings_middleware.retrieve_school_listings;
  } catch(e) {
    res.status(401).json({ message: 'Error Fetching Listings' });
  }
});
