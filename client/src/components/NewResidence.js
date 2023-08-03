import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Listings.css';

export default function NewResidence({ props }) {
  const [res_name, setResidence] = useState();
  const [street_address, setAddress] = useState();
  const [postal_code, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [unit_types, setUnitTypes] = useState([]);
  const [price, setPrice] = useState();
  const [availableUnits, setAvailableUnits] = useState([]);

  
  const submit = async (e) => {
    e.preventDefault();

    const form = {
      res_name: res_name,
      street_address: street_address,
      postal_code: postal_code,
      country: country,
      city: city,
      province: province,
      unit_types: unit_types,
      price: price,
    };

    axios.post('http://localhost:1234/housinginfo', form, {
      headers: {
        Authorization: `Bearer ${props.token}`,
      },
    });
    closeModal(e);
  };

  async function getUnitTypes() {
    try {
        await axios
          .get('http://localhost:1234/units', {
            headers: { Authorization: `Bearer ${props.token}` },
          })
          .then((res) => setAvailableUnits(res.data));
      } catch (e) {
        console.log(e);
      }
  }

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById('create-new-residence-modal').close();
  };

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="res_name">Residence Name</label>
        <input
          className="big-text-field"
          name="res_name"
          type="text"
          placeholder="Residence Name"
          onChange={(e) => setResidence(e.target.value)}
        ></input>

        <label htmlFor="street_address">Street Address</label>
        <input
          className="big-text-field"
          name="street_address"
          type="text"
          placeholder="Street Address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label htmlFor="city">City</label>
        <input
          className="big-text-field"
          name="city"
          type="text"
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        ></input>

        <label htmlFor="province">Province</label>
        <input
          className="big-text-field"
          name="province"
          type="text"
          onChange={(e) => setProvince(e.target.value)}
          placeholder="Province"
        ></input>

        <label htmlFor="country">Country</label>
        <input
          className="big-text-field"
          name="country"
          type="text"
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        ></input>

        <label htmlFor="postal_code">Postal Code</label>
        <input
          className="big-text-field"
          name="postal_code"
          type="text"
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Postal Code"
        ></input>

        <div className="new-listing-buttons">
          <button className="red" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
