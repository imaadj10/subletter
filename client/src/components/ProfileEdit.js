import { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Profile.css';
import axios from 'axios';

export default function EditProfile({ props }) {
  const history = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  async function submit(e) {
    e.preventDefault()
    
    if (!usernameRef.current.value || !passwordRef.current.value) {
      closeModal(e);
    } else {
      try {
        // Get the new_username and new_password from the input fields using refs
        const new_username = usernameRef.current.value;
        const new_password = passwordRef.current.value;

        // Make a POST request to the server with the new_username and new_password in the request body
        console.log(props.globalUsername);
        console.log(new_username);
        console.log(new_password);

        await axios
          .patch('http://localhost:1234/users', {
            old_username: props.globalUsername,
            new_username: new_username,
            new_password: new_password, // Shorthand notation since the variable name matches the property name
          })
          .then((res) => {
            props.setGlobalUsername(new_username);
            props.setPassword(new_password);
            closeModal(e);
            console.log(props.globalUsername);
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
          defaultValue={props.globalUsername}
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          defaultValue={props.password}
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
