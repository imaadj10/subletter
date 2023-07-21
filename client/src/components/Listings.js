import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1234/listings')
      .then((res) => {
        setListings(res.data);
      })
      .catch((e) => {
        console.log("Error fetching listings data");
      });
  }, []);

  return (
    <div>
      <h1> Welcome to Listings!</h1>

      <ul>
        {listings.map((listing) => {
            <li>{listing.name}</li>
        })}
      </ul>
    </div>
  );
};

export default Listings;
