import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/Housing.css';
import NewResidence from './NewResidence';

const HousingInfo = () => {
  const [residences, setResidences] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [residenceRatings, setResidenceRatings] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

  async function getHousingInfo() {
    try {
      await axios
        .get('http://localhost:1234/housinginfo', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setResidences(res.data);
        })
        .catch((e) => console.log('error fetching residences'));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getHousingInfo();
    getResidenceRatings();
  }, []);

  const getResidenceRatings = async () => {
    await axios
      .get('http://localhost:1234/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setResidenceRatings(res.data));
  };

  const createNewResidence = () => {
    setSelectedResidence(null);
    document.getElementById('create-new-residence-modal').showModal();
  };

  return (
    <div>
      <h1> Housing Information </h1>
      <button className="plus" onClick={createNewResidence} />

      <div>
        <h2>Residence Ratings</h2>
        <div>
          {residenceRatings.map((res) => {
            return (
              <>
                <p>
                  {res.res_name} : {Math.round(res.overall * 10) / 10}/10
                </p>
              </>
            );
          })}
        </div>
      </div>

      <div className="residences">
        {residences.map((residence) => {
          return (
            <Residence
              residence={residence}
              setSelectedResidence={setSelectedResidence}
            />
          );
        })}
      </div>
      <dialog data-modal id="create-new-residence-modal">
        <NewResidence
          props={{
            username,
            token,
            selectedResidence,
          }}
        />
      </dialog>
    </div>
  );
};

const Residence = ({ residence, setSelectedResidence }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const name = residence.res_name;
    navigate(`${name}`);
  };

  const updateResidence = (residence) => {
    setSelectedResidence(residence);
    document.getElementById('create-new-residence-modal').showModal();
  };
  return (
    <div>
    <button className="update" onClick={() => updateResidence(residence)}>
        Update
      </button>
    <div className="residence" key={residence.res_name} onClick={handleClick}>
      <h1>{residence.res_name}</h1>
      <div className="address-container">
        <h3>{residence.street_address}</h3>
        <h3>{residence.postal_code}</h3>
      </div>
    </div>
    </div>
  );
};

export default HousingInfo;
