import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../css/Housing.css';

export default function SingleResidence() {
  const resName = window.location.pathname.split('/')[2];
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [residence, setResidence] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [overallRating, setOverallRating] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(null);

  useEffect(() => {
    getResidence();
    getResidenceReviews();
  }, []);

  async function getResidence() {
    await axios
      .get(`http://localhost:1234/housinginfo/${resName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        setUnitTypes(res.data);
        setResidence(res.data[0]);
      })
      .catch((e) => console.log(e));
  }

  async function getResidenceReviews() {
    await axios
      .get(`http://localhost:1234/reviews/${resName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOverallRating(Math.round(res.data.rating.overall * 10) / 10);
        setReviews(res.data.reviews);
      })
      .catch((e) => console.log(e));
  }

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  };

  const submitReview = (e) => {
    e.preventDefault();
    setIsReview(false);
    if (!newReview || !rating) return;
    axios
      .post(
        `http://localhost:1234/reviews/${resName}`,
        { content: newReview, rating: rating },
        axiosConfig
      )
      .then((res) => {
        getResidenceReviews();
      })
      .catch((e) => console.log(e));
    setNewReview('');
    setRating(null);
  };

  return (
    <>
      <h1>
        {residence.res_name} at the {residence.school_name}
      </h1>
      {overallRating !== 0 && <h3>Rating: {overallRating}/10</h3>}
      <h1>Info</h1>
      <p>{residence.street_address}</p>
      <p>{residence.postal_code}</p>
      <p>{residence.country}</p>
      <p>{residence.city}</p>
      <p>{residence.province}</p>

      <div>
        <h1>Unit Types</h1>
        {unitTypes.map((unit) => {
          return (
            <>
              <p>
                {unit.type}: {unit.price}
              </p>
            </>
          );
        })}
      </div>

      <div>
        <h1>Reviews</h1>
        {!isReview ? (
          <button onClick={() => setIsReview(true)}>Add a review...</button>
        ) : (
          <form onSubmit={submitReview}>
            <input
              type="text"
              value={newReview}
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
            <input
              type="number"
              min="0"
              max="10"
              placeholder="/10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <div className="buttons-container">
              <button
                className="red small"
                onClick={() => {
                  setIsReview(false);
                  setNewReview('');
                  setRating(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="small">
                Post
              </button>
            </div>
          </form>
        )}
        {reviews.map((review) => {
          return (
            <Review
              key={review.rid}
              review={review}
              cookies={cookies}
              getResidenceReviews={getResidenceReviews}
            />
          );
        })}
      </div>
    </>
  );
}

const Review = ({ review, cookies, getResidenceReviews }) => {
  const deleteReview = async (e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:1234/reviews/${e.target.id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get('TOKEN')}`,
        },
      })
      .then((res) => getResidenceReviews())
      .catch((e) => console.log(e));
  };
  return (
    <div style={{ backgroundColor: 'grey' }}>
      <div>
        <h1>{review.username}</h1>
        {review.username === cookies.get('USERNAME') && (
          <button className="red" onClick={deleteReview} id={review.rid}>
            Delete Review
          </button>
        )}
      </div>

      <p>{review.description}</p>
      <p>{review.rating}</p>
    </div>
  );
};
