import './Listings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1234/main/listings')
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
      <h1>Listings: </h1>
      <ul>
        {listings.map((listing) => {
          return (
            <div key={listing.id}>
              <li>
                {listing.name}
              </li>
              <li>
                {listing.residence}
              </li>
              <li>
                {listing.location}
              </li>
              <li>
                {listing.price}
              </li>
            </div>
          );
          // return  <li key={listing.id}>{listing.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Listings;
