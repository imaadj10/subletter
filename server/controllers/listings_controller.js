const listings_middleware = require('../middleware/listings_middleware');
const db = require('../mysql/mysql');

exports.retrieve_school_listings = async (req, res) => {
  try {
    const result = await listings_middleware.retrieve_school_listings(req);
    res.status(200).send(result);
  } catch (e) {
    res.status(401).json({ message: 'Error Fetching Listings' });
  }
};

exports.add_listing = async (req, res) => {
  try {
    await listings_middleware.add_new_listing(req);
    res.status(201).send('Added listing!');
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Unable to add listing' });
  }
};

exports.getSingleListing = async (req, res) => {
  try {
    const lid = parseInt(req.params.id);
    const query = `SELECT * FROM listings WHERE lid=${lid}`;
    const queryResult = await db.query(query);
    const listing = queryResult[0][0];
    res.status(200).json(listing);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};
