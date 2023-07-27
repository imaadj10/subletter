import './Profile.css';
import React from 'react';
import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';


const Profile = () => {
  // const history = useHistory;
  const history = useNavigate();
  const cookies = new Cookies();
  // const token = cookies.get('TOKEN');

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
		history('/home', {});
  };

  return (
    <div>
      <h1> Welcome to Profile!</h1>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
