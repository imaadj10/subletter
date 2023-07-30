import { useRef } from 'react';

export default function EditProfile({ props }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = (e) => {
    if (!usernameRef.current.value || !passwordRef.current.value) {
      closeModal(e);
    } else {
      props.setUsername(usernameRef.current.value);
      props.setPassword(passwordRef.current.value);
      closeModal(e);
    }
  };

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
          defaultValue={props.username}
        />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          defaultValue={props.password}
        />

        <div className="buttons-container">
          <button className="submit" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
