import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/Listings.css';

export default function SingleListing() {
  const [listing, setListing] = useState({});
  console.log(listing);

  useEffect(() => {
    const lid = window.location.pathname.split('/')[2];
    axios
      .get(`http://localhost:1234/listings/${lid}`)
      .then((res) => setListing({ ...res.data }))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div className="listing" id={listing.lid}>
        <div className="listing-image">
          <img
            src={`http://localhost:1234/images/${listing.image}`}
            alt="Tallwood"
          />
        </div>
        <div className="listing-name">{listing.name}</div>
        <div className="listing-username">Posted by {listing.username}</div>
        <div className="listing-price">${listing.price}</div>
      </div>
    </>
  );
}
