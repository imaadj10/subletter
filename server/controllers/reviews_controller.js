const reviews_middleware = require('../middleware/reviews_middleware');

const getResidenceReviews = async (req, res) => {
  try {
    const reviews = await reviews_middleware.getReviews(req);
    const rating = await reviews_middleware.getRating(req);
    res.status(200).json({ reviews: reviews[0], rating: rating[0][0] });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const getAllResidenceReviews = async (req, res) => {
  try {
    queryResult = await reviews_middleware.getAllResidenceReviews(req);
    res.status(200).json(queryResult[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const createResidenceReview = async (req, res) => {
  try {
    await reviews_middleware.createResidenceReview(req);
    res.status(200).json('review added');
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getResidenceReviews,
  getAllResidenceReviews,
  createResidenceReview,
};
