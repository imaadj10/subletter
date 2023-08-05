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
    const listing = await listings_middleware.get_single_listing(req);
    res.status(200).json(listing);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

exports.updateListing = async (req, res) => {
  try {
    await listings_middleware.update_listing_attributes(req);
    if (!req.body.image) {
      await listings_middleware.update_listing_image(req.params.id, req.body.image);
    }
    res.status(201).send('Successfully updated listing!');
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

exports.deleteListing = async (req, res) => {
  try {
    await listings_middleware.verify_deletion_user(req.params.id, req.user.username);
    await listings_middleware.delete_listing(req.params.id);
    res.status(200).send('Successfully deleted listing!');
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
};
