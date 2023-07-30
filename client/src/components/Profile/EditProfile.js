import { useRef } from 'react';

export default function EditProfile({ props }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const submit = () => {
    if (!usernameRef.current.value || !passwordRef.current.value) {
      return;
    }
    console.log(usernameRef.current.value);
    props.setUsername(usernameRef.current.value);
    props.setPassword(passwordRef.current.value);
    props.setModalStatus(false);
    props.wholeRef.current.style.opacity = 1;
  };

  return (
    <>
      <div className="modal">
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

        <button className="submit" onClick={submit}>
          Submit
        </button>
      </div>
    </>
  );
}
