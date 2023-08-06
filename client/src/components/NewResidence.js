import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/NewResidence.css';

export default function NewResidence({ props }) {
  const [res_name, setResidence] = useState();
  const [street_address, setAddress] = useState();
  const [postal_code, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [availableUnits, setAvailableUnits] = useState([]);
  const [unit_prices, setUnitPrices] = useState({});
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [file, setFile] = useState();


  const resetForm = () => {
    setResidence('');
    setAddress('');
    setPostalCode('');
    setCountry('');
    setCity('');
    setProvince('');
    setSelectedUnits([]);
    setUnitPrices({});
  };

  useEffect(() => {
    if (props.selectedResidence) {
      setResidence(props.selectedResidence.res_name);
      setAddress(props.selectedResidence.street_address);
      setPostalCode(props.selectedResidence.postal_code);
      setCountry(props.selectedResidence.country);
      setCity(props.selectedResidence.city);
      setProvince(props.selectedResidence.province);

      setSelectedUnits(parseTypesList(props.selectedResidence.types_list));

      setUnitPrices(parsePricesList(props.selectedResidence.prices_list));
    } else {
      resetForm();
    }
  }, [props.selectedResidence]);

  const parseTypesList = (unitsString) => {
    console.log(unitsString);
    const unitsList = unitsString.split(',');
    return unitsList;
  };

  const parsePricesList = (pricesListString) => {
    const pricesListArray = pricesListString.split(',');
    const pricesDict = {};

    pricesListArray.forEach((item) => {
      const [unitType, price] = item.split(':');
      pricesDict[unitType] = price;
    });

    return pricesDict;
  };

  const submit = async (e) => {
    e.preventDefault();

    const form = {
      res_name: res_name,
      street_address: street_address,
      postal_code: postal_code,
      country: country,
      city: city,
      province: province,
      unit_types: selectedUnits,
      prices: unit_prices,
      image: file,
    };
    if (selectedUnits.length === 0) {
      alert('Please select at least one unit type!');
    } else {
      try {
        if (props.selectedResidence) {
          // If there's a selected residence, it means we are updating
          await axios
            .put(
              `http://localhost:1234/housinginfo/${props.selectedResidence.res_name}`,
              form,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${props.token}`,
                },
              }
            )
            .catch((e) => {
              alert(e.response.data.message);
            });
        } else {
          // If there's no selected residence, it means we are adding a new one
          await axios
            .post('http://localhost:1234/housinginfo', form, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${props.token}`,
              },
            })
            .catch((e) => {
              alert(e.response.data.message);
            });
        }
      } catch (error) {
        alert('Error adding/updating residence!');
      }

      closeModal(e);
    }
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

  useEffect(() => {
    getUnitTypes();
  }, []);

  const handleCheckboxChange = (unitType) => {
    setUnitPrices((prevPrices) => ({
      ...prevPrices,
      [unitType]: !prevPrices[unitType],
    }));

    setSelectedUnits((prevSelectedUnits) =>
      prevSelectedUnits.includes(unitType)
        ? prevSelectedUnits.filter((unit) => unit !== unitType)
        : [...prevSelectedUnits, unitType]
    );
  };

  const handlePriceChange = (unitType, price) => {
    setUnitPrices((prevPrices) => ({
      ...prevPrices,
      [unitType]: price,
    }));
  };

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById('create-new-residence-modal').close();
  };

  return (
    <div className="residence-form">
      <form onSubmit={submit} className="residence-input">
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="res_name">Residence Name</label>
            <input
              className="big-text-field"
              name="res_name"
              type="text"
              value={res_name}
              placeholder="Residence Name"
              onChange={(e) => setResidence(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="street_address">Street Address</label>
            <input
              className="big-text-field"
              name="street_address"
              type="text"
              value={street_address}
              placeholder="Street Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="city">City</label>
            <input
              className="big-text-field"
              name="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="input-group">
            <label htmlFor="province">Province</label>
            <input
              className="big-text-field"
              name="province"
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Province"
            />
          </div>
        </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input
              className="big-text-field"
              name="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="input-group">
            <label htmlFor="postal_code">Postal Code</label>
            <input
              className="big-text-field"
              name="postal_code"
              type="text"
              value={postal_code}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
            />
          </div>
        </div>
        <div className="unit-container">
          {availableUnits.map((unit) => (
            <div className="unit-box" key={unit.type}>
              <input
                type="checkbox"
                id={unit.type}
                name={unit.type}
                value={unit.type}
                checked={unit_prices[unit.type]}
                onChange={() => handleCheckboxChange(unit.type)}
              />
              <label htmlFor={unit.type}>{unit.type}</label>
              {selectedUnits.includes(unit.type) && (
                <input
                  type="number"
                  placeholder="Price"
                  value={unit_prices[unit.type]}
                  onChange={(e) => handlePriceChange(unit.type, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
        <label for="image">Image</label>
        <input
          id="input"
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>

        <div className="new-listing-buttons">
          <button className="red" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
