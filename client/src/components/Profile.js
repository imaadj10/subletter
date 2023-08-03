import '../css/Profile.css';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from './ProfileEdit';
import profile_Image from '../assets/temp-avatar.jpg';
import axios from 'axios';

const Profile = () => {
  const [description, setDescription] = useState('');
  const [school, setSchool] = useState('');

  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const username = cookies.get('USERNAME');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`http://localhost:1234/users/?username=${username}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setDescription(res.data.description);
            setSchool(res.data.school_name);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  async function deleteAccount() {
    try {
      await axios
        .delete(`http://localhost:1234/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          cookies.remove('TOKEN', { path: '/' });
          cookies.remove('USERNAME', { path: '/' });
          history('/home', {});
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    cookies.remove('USERNAME', { path: '/' });
    history('/home', {});
  };

  const Edit = () => {
    document.getElementById('edit-details-modal').showModal();
  };

  return (
    <div>
      <div className="Profile">
        <div className="Profile-Upper-Section">
          <div className="Profile-left">
            <div className="Profile-image">
              <img src={profile_Image} alt="Profile" />
            </div>
            <div className="Profile-detail">
              <div className="Profile-university">{school}</div>
              <div className="Profile-major">Anthropology</div>
              <div className="Profile-year">3rd Year</div>
            </div>
          </div>
          <div className="Profile-right">
            <h1 className="Profile-name">{username}</h1>
            <div className="Profile-description">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button onClick={Edit}>Edit Details</button>
          <button className="red" onClick={logout}>
            Logout
          </button>
          <button className="red" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>

      <dialog data-modal id="edit-details-modal">
        <EditProfile
          props={{
            token,
            username,
            description,
            setDescription,
          }}
        />
      </dialog>
    </div>
  );
};

export default Profile;
