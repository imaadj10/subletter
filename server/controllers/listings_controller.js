const listings_middleware = require('../middleware/listings_middleware');

exports.retrieve_school_listings = async (req, res) => {
  try {
    const result = await listings_middleware.retrieve_school_listings(req.query.username);
    res.status(200).send(result);
  } catch(e) {
    res.status(401).json({ message: 'Error Fetching Listings' });
  }
};

exports.add_listing = (req, res) => {
  
};
