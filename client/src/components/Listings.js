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
        console.log('Error fetching listings data');
      });
  }, []);

  return (
    <div>
      <h1> Welcome to Listings!</h1>
      <h1>Listings: </h1>
      <div className="listings">
        {listings.map((listing) => {
          return (
            <div className="listing" key={listing.id}>
              <p className="listing-name">{listing.name}</p>
              <p className="listing-residence">{listing.residence}</p>
              <p className="listing-location">{listing.location}</p>
              <p className="listing-price">{listing.price}</p>
            </div>
          );
          // return  <li key={listing.id}>{listing.name}</li>;
        })}
      </div>
    </div>
  );
};

export default Listings;
