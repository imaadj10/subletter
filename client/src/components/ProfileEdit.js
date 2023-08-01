import { useRef } from 'react';
import '../css/Profile.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';



export default function EditProfile({ props }) {
  const cookies = new Cookies();
  const history = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function submit(e) {
    e.preventDefault();

    if (!usernameRef.current.value && !passwordRef.current.value) {
      closeModal(e);
    } else {
      try {
        // Get the new_username and new_password from the input fields using refs
        const new_username = usernameRef.current.value;
        const new_password = passwordRef.current.value;

        await axios
          .patch('http://localhost:1234/users', {
            old_username: props.username,
            new_username: new_username,
            new_password: new_password, 
          })
          .then((res) => {
            cookies.set('TOKEN', res.data.token, {
              path: '/',
            });
            cookies.set('USERNAME', res.data.username, {
              path: '/',
            });
            closeModal(e);
            history('/profile', {});
          })
          .catch((e) => {
            alert('Res then failed');
            console.log(e);
          });
      } catch (e) {
        // If an error occurs, show an alert and log the error
        alert('Failed to change info');
        console.log(e);
      }
    }
  }

  const closeModal = (e) => {
    e.preventDefault();
    document.getElementById('edit-details-modal').close();
  };

  return (
    <div>
      <form onSubmit={submit}>
        <h1>Account Details</h1>
        <label htmlFor="username">Username</label>
        <input
          ref={usernameRef}
          type="text"
          name="username"
          defaultValue=''
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          defaultValue=''
        />

        <div className="buttons-container">
          <button onClick={closeModal} className="red">
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
