import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { setGlobalUsername } = useContext(UserContext);
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      history('/home');
    }
  }, [history, token]);


  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:1234/login', {
          username: username.toLowerCase(),
          password,
        })
        .then((res) => {
          cookies.set('TOKEN', res.data.token, {
            path: '/',
          });
          setGlobalUsername(res.data.username);
          history('/home', {});
        })
        .catch((e) => {
          alert(e.response.data.message);
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="section form-page">
      <h1>Login Page</h1>
      <form action="POST">
        <label htmlFor="username">Username</label>
        <input
          className="form-text"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-text"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submit} className="auth-button">
          Submit
        </button>
      </form>
      <div>
        <span className="padding-right">Don't have an account?</span>
        <Link to="/register">Register!</Link>
      </div>
    </div>
  );
};

export default Login;
