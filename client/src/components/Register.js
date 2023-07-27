import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:1234/register', {
          username,
          password,
        })
        .then((res) => {
          console.log(res.data);
          cookies.set("TOKEN", res.data.token, {
            path: '/',
          });
          history('/home', {});
        })
        .catch((e) => {
          alert('Please Try Again');
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="section form-page">
      <h1>Sign Up!</h1>
      <form action="POST">
        <label for="username">Username</label>
        <input
          name="username"
          className="form-text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <label for="email">Email Address</label>
        <input
          name="email"
          className="form-text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submit} className="auth-button">
          Submit
        </button>
      </form>
      <div>
        <span className="padding-right">Already have an account?</span>
        <Link to="/">Login Page</Link>
      </div>
    </div>
  );
};

export default Register;
