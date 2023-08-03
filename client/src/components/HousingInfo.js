import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../css/Housing.css';
import NewResidence from './NewResidence';

const HousingInfo = () => {
  const [residences, setResidences] = useState([]);
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
  }, []);

  const createNewResidence = () => {
    document.getElementById('create-new-residence-modal').showModal();
  };


  return (
    <div>
      <h1> Housing Information </h1>
      <button className="plus" onClick={createNewResidence} />
      <div className="residences">
        {residences.map((residence) => {
          return (
            <div className="residence" key={residence.res_name}>
              <h1>{residence.res_name}</h1>
              <div className="address-container">
                <h3>{residence.street_address}</h3>
                <h3>{residence.postal_code}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <dialog data-modal id="create-new-residence-modal">
        <NewResidence
          props={{
            username,
            token,
          }}
        />
      </dialog>
    </div>
  );
};

export default HousingInfo;
