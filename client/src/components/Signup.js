import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  async function submit(e) {
    e.preventDefault();

    try {

        await axios.post("http://localhost:1234/main/signup", {
            username, password
        })
        .then((res) => {
						console.log(res.data);
            if ((res.data === 'exists')) {
							alert('User already exists');
            } else if ((res.data === 'notexists')) {
							history('/home', { state: { id: username } });
            }
          })
          .catch((e) => {
            alert('wrong details');
            console.log(e);
        });

    } catch(e) {
        console.log(e);
    }
  }

  return (
    <div>
      <h1>Signup Page</h1>

      <form action="POST">
        <input
          type="text"
          placeholders="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholders="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" onClick={submit} />
      </form>
      {/* <button onClick={handleLogin}>Login</button> */}

      <Link to="/">Login Page</Link>
    </div>
  );
};

export default Signup;
