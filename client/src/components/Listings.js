import './Listings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../assets/Orchard-Commons.jpg';

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
      <div className="listings">
        {listings.map((listing) => {
          return (
            <div className="listing" key={listing.id}>
              <div className="listing-image">
                <img src={image} alt="Tallwood"/>
              </div>
              <div className="listing-name">{listing.name}</div>
              <div className="listing-residence">{listing.residence}</div>
              <div className="listing-location">{listing.location}</div>
              <div className="listing-price">{listing.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
