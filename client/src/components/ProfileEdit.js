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

        // Make a POST request to the server with the new_username and new_password in the request body
        console.log(props.username);
        console.log(new_username);
        console.log(new_password);

        await axios
          .patch('http://localhost:1234/users', {
            old_username: props.username,
            new_username: new_username,
            new_password: new_password, // Shorthand notation since the variable name matches the property name
          })
          .then((res) => {
            cookies.set('USERNAME', new_username, {
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
    <>
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
    </>
  );
}
