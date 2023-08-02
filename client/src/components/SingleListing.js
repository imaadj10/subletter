import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/Listings.css';
import Cookies from 'universal-cookie';

export default function SingleListing() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [listing, setListing] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const lid = window.location.pathname.split('/')[2];

  useEffect(() => {
    getListing();
    getListingComments();
  }, []);

  const getListing = () => {
    axios
      .get(`http://localhost:1234/listings/${lid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log({ ...res.data });
        setListing({ ...res.data });
      })
      .catch((e) => console.log(e));
  };

  const getListingComments = () => {
    axios
      .get(`http://localhost:1234/comments/${lid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setComments(res.data);
        console.log(comments);
      })
      .catch((e) => console.log(e));
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${token}`,
    },
  };

  const submitComment = (e) => {
    e.preventDefault();
    setIsComment(false);
    console.log('line 46');
    console.log(newComment);
    if (!newComment) return;
    axios
      .post(
        `http://localhost:1234/comments/${lid}`,
        { content: newComment },
        axiosConfig
      )
      .then((res) => {
        console.log('line 55');
        console.log(res);
        getListingComments();
      })
      .catch((e) => console.log(e));
    setNewComment('');
  };

  return (
    <>
      <div className="single-listing" id={listing.lid}>
        <img
          className="picture"
          src={`http://localhost:1234/images/${listing.image}`}
          alt="Tallwood"
        />
        <div className="right-side">
          <div>
            <h2>{listing.name}</h2>
            <div className="details">
              <p>
                <b>Price: </b>${listing.price}
              </p>
              <p>
                <b>Posted By: </b>
                {listing.username}
              </p>
            </div>
            <h2>Comments</h2>
            {!isComment ? (
              <button onClick={() => setIsComment(true)}>
                Add a comment...
              </button>
            ) : (
              <form onSubmit={submitComment}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                <div className="buttons-container">
                  <button
                    className="red small"
                    onClick={() => {
                      setIsComment(false);
                      setNewComment('');
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
            {comments.map((comment) => {
              return (
                <div className="comment">
                  <p>
                    <b>{comment.username}: </b>
                    {comment.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
