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
  const descriptionRef = useRef(null);

  async function submit(e) {
    e.preventDefault();

    // Get the new_username and new_password from the input fields using refs
    const new_username = usernameRef.current.value;
    const new_password = passwordRef.current.value;
    const new_description = descriptionRef.current.value;

    if (!new_username && !new_password && !new_description) {
      closeModal(e);
    } else {
      try {
        // Values that are going to be send to the backend
        let input_username = undefined;
        let input_description = undefined;

        // Check if inputted username is the same as the current username
        if (new_username !== props.username) {
          input_username = new_username;
        }

        // Check if inputted description is the same as the current description
        if (new_description !== props.description) {
          input_description = descriptionRef.current.value;
        }

        await axios
          .patch(
            'http://localhost:1234/users',
            {
              old_username: props.username,
              new_username: input_username,
              new_password: new_password,
              new_description: input_description,
            },
            {
              headers: { Authorization: `Bearer ${props.token}` },
            }
          )
          .then((res) => {
            cookies.set('TOKEN', res.data.token, {
              path: '/',
            });

            // Reset the USERNAME cookie if new username is not undefined
            if (new_username) {
              cookies.set('USERNAME', res.data.username, {
                path: '/',
              });
            }

            if (input_description) {
              props.setDescription(input_description);
            }
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
        <input ref={usernameRef} type="text" name="username" defaultValue="" />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          defaultValue=""
        />

        <label htmlFor="description">Description</label>
        <textarea
          ref={descriptionRef}
          type="text"
          name="description"
          defaultValue=""
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
