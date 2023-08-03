import '../css/Listings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import NewListing from './NewListing';
import { useNavigate } from 'react-router-dom';

const Listings = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

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
      .get(`http://localhost:1234/listings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

  const createNewListing = () => {
    document.getElementById('create-new-listing-modal').showModal();
  };

  return (
    <>
      <div className="listing-container">
        <div className="navigator">
          <button className="plus" onClick={createNewListing} />
          <div className="options">
            <div className="option">
              <label htmlFor="search">Filter For a Listing</label>
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
            <div
              className="option"
              style={{ display: 'flex', marginTop: '10px' }}
            >
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
        </div>
        <div className="listings">
          {listings.map((listing) => {
            return (
              <Listing
                key={listing.lid}
                lid={listing.lid}
                name={listing.name}
                username={listing.username}
                price={listing.price}
                image={listing.image}
              />
            );
          })}
        </div>
      </div>
      <dialog data-modal id="create-new-listing-modal">
        <NewListing
          props={{
            username,
            token,
          }}
        />
      </dialog>
    </>
  );
};

const Listing = ({ lid, name, username, price, image }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(e.currentTarget.id);
  };

  return (
    <>
      <div className="listing" id={lid} onClick={handleClick}>
        <div className="listing-image">
          <img
            loading="lazy"
            src={`http://localhost:1234/images/${image}`}
            alt="Tallwood"
          />
        </div>
        <div className="listing-name">{name}</div>
        <div className="listing-username">Posted by {username}</div>
        <div className="listing-price">${price}</div>
      </div>
    </>
  );
};

export default Listings;
