import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/Listings.css';
import NewMessage from './NewMessage';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export default function SingleListing() {
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');
  const history = useNavigate();
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

  const sendNewMessage = () => {
    document.getElementById('create-new-message-modal').showModal();
  };

  const deleteListing = () => {
    axios
      .delete(`http://localhost:1234/listings/${lid}`, axiosConfig)
      .then((res) => {
        history('/listings');
      })
      .catch((e) => {
        alert(e.message);
      });
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

        axios.post(
          'http://localhost:1234/notifications',
          {
            title: 'You have a new comment!',
            username: listing.username,
            content: `Your post ${listing.name} has a new comment!`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
          {username === listing.username ? (
            <button onClick={() => deleteListing()}>Delete Listing</button>
          ) : null}
          <div>
            <h2>{listing.name}</h2>
            {listing.type === 'sublet' ? (
              <div>
              <h4>Residence Name:</h4> <p>{listing.res_name}</p>
              <h4>Unit Type:</h4> <p>{listing.unit}</p>  
              </div>
            ) : (
              <h4>Quantity: {listing.quantity}</h4>
            )}
            <div className="details">
              <p>
                <b>Price: </b>${listing.price}
              </p>
              <p>
                <b>Posted By: </b>
                {listing.username}
              </p>
            </div>
            <button onClick={() => sendNewMessage(true)}>
              Send seller a message!
            </button>
            <h2>Description</h2>
            {listing.description}
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
      <dialog data-modal id="create-new-message-modal">
        <NewMessage
          props={{
            listing,
            token,
          }}
        />
      </dialog>
    </>
  );
}
