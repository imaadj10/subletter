import './Profile.css';
import { useState, useRef, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import profile_Image from '../../assets/temp-avatar.jpg';
import UserContext from '../../UserContext';


const Profile = () => {
  const { globalUsername, setGlobalUsername } = useContext(UserContext);
  const history = useNavigate();
  const cookies = new Cookies();
  // const [username, setUsername] = useState('John Doe');
  const [password, setPassword] = useState('abc');
  const [modalStatus, setModalStatus] = useState(false);
  const wholeRef = useRef(null);

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });
    history('/home', {});
  };

  const Edit = () => {
    setModalStatus(true);
    wholeRef.current.style.opacity = 0.2;
  };

  return (
    <>
      <div ref={wholeRef} className="Profile">
        <div className="Profile-Upper-Section">
          <div className="Profile-left">
            <div className="Profile-image">
              <img src={profile_Image} alt="Profile" />
            </div>
            <div className="Profile-detail">
              <div className="Profile-university">
                University of British Columbia
              </div>
              <div className="Profile-major">Anthropology</div>
              <div className="Profile-year">3rd Year</div>
            </div>
          </div>
          <div className="Profile-right">
            <h1 className="Profile-name">{globalUsername}</h1>
            <div className="Profile-description">
              <p>
                Hey there! I'm Alex, a spirited university student with an
                insatiable wanderlust and an unyielding love for music. Majoring
                in Anthropology, I'm constantly fascinated by the diverse
                cultures that shape our world. When I'm not buried in books,
                you'll find me exploring the great outdoors, camera in hand,
                capturing the breathtaking landscapes and candid moments that
                inspire my soul. As a budding musician, I spend my free time
                strumming melodies on my acoustic guitar or losing myself in the
                lyrics of classic rock bands. I'm always up for spontaneous
                adventures, whether it's hiking to a hidden waterfall or jamming
                with fellow music enthusiasts.
              </p>

              <p>
                Hey there! I'm Alex, a spirited university student with an
                insatiable wanderlust and an unyielding love for music. Majoring
                in Anthropology, I'm constantly fascinated by the diverse
                cultures that shape our world. When I'm not buried in books,
                you'll find me exploring the great outdoors, camera in hand,
                capturing the breathtaking landscapes and candid moments that
                inspire my soul. As a budding musician, I spend my free time
                strumming melodies on my acoustic guitar or losing myself in the
                lyrics of classic rock bands. I'm always up for spontaneous
                adventures, whether it's hiking to a hidden waterfall or jamming
                with fellow music enthusiasts.
              </p>

              <p>
                Hey there! I'm Alex, a spirited university student with an
                insatiable wanderlust and an unyielding love for music. Majoring
                in Anthropology, I'm constantly fascinated by the diverse
                cultures that shape our world. When I'm not buried in books,
                you'll find me exploring the great outdoors, camera in hand,
                capturing the breathtaking landscapes and candid moments that
                inspire my soul. As a budding musician, I spend my free time
                strumming melodies on my acoustic guitar or losing myself in the
                lyrics of classic rock bands. I'm always up for spontaneous
                adventures, whether it's hiking to a hidden waterfall or jamming
                with fellow music enthusiasts.
              </p>
            </div>
          </div>
        </div>
        <button className="edit" onClick={Edit}>
          Edit Details
        </button>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      {modalStatus && (
        <EditProfile
          props={{
            globalUsername,
            password,
            modalStatus,
            wholeRef,
            setGlobalUsername,
            setPassword,
            setModalStatus,
          }}
        />
      )}
    </>
  );
};

export default Profile;
