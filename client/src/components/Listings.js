import './Listings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import image from '../assets/Orchard-Commons.jpg';

const Listings = () => {
  const types = {
    items: 'Items',
    sublets: 'Sublets',
    all: 'All',
  };
  const [type, setType] = useState(types.all);
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);

  useEffect(() => {
    axios
      .get('http://localhost:1234/listings')
      .then((res) => {
        setListings(res.data);
      })
      .catch((e) => {
        console.log('Error fetching listings data');
      });
  }, []);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const changeMin = (e) => {
    if (parseInt(e.target.value) <= max) {
      setMin(e.target.value);
    }
  };
  const changeMax = (e) => {
    if (parseInt(e.target.value) >= min) {
      setMax(e.target.value);
    }
  };

  return (
    <div className="listing-container">
      <div className="navigator">
        <div className="option">
          <label for="search">Filter For a Listing</label>
          <input
            name="search"
            type="text"
            className="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="option">
          <label htmlFor="selector">Listing Type</label>
          <select
            className="selector"
            defaultValue={types.all}
            value={type}
            onChange={handleTypeChange}
          >
            <option value={types.all}>All</option>
            <option value={types.items}>Items</option>
            <option value={types.sublets}>Sublets</option>
          </select>
        </div>
        <div className="option" style={{ display: 'flex', marginTop: '10px' }}>
          <label htmlFor="price">Price:</label>
          <div>
            <input
              type="number"
              name="price"
              min="0"
              max="5000"
              value={min}
              step="100"
              onChange={changeMin}
            />
            <label className="lab">Min</label>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="5000"
              value={max}
              step="100"
              onChange={changeMax}
            />
            <label className="lab">Max</label>
          </div>
        </div>
      </div>
      <div className="listings">
        {listings.map((listing) => {
          return (
            <div className="listing" key={listing.id}>
              <div className="listing-image">
                <img
                  src={`http://localhost:1234/images/${listing.image}.jpg`}
                  alt="Tallwood"
                />
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
