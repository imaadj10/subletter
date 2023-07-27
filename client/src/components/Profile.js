import './Profile.css';
import React from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import profile_Image from '../assets/temp-avatar.jpg';

const Profile = () => {
  const history = useNavigate();
  const cookies = new Cookies();

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
		history('/home', {});
  };

  return (
    <div>
      <div className="Profile-image">
        <img src={profile_Image} alt="Profile" />
      </div>
      <h1 className="Profile-name">John Doe</h1>
      <div className="Profile-university">University of British Columbia</div>
      <div className="Profile-description">
        <p>
          Hey there! I'm Alex, a spirited university student with an insatiable
          wanderlust and an unyielding love for music. Majoring in Anthropology,
          I'm constantly fascinated by the diverse cultures that shape our
          world. When I'm not buried in books, you'll find me exploring the
          great outdoors, camera in hand, capturing the breathtaking landscapes
          and candid moments that inspire my soul. As a budding musician, I
          spend my free time strumming melodies on my acoustic guitar or losing
          myself in the lyrics of classic rock bands. I'm always up for
          spontaneous adventures, whether it's hiking to a hidden waterfall or
          jamming with fellow music enthusiasts.
        </p>
      </div>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
