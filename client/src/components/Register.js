import '../css/Authorization.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('TOKEN');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [availableSchools, setAvailableSchools] = useState([]);

  useEffect(() => {
    if (token) {
      history('/home');
    }
  }, [history, token]);

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:1234/register', {
          username: username.toLowerCase(),
          password,
          name,
          school,
        })
        .then((res) => {
          console.log(res.data);
          cookies.set('TOKEN', res.data.token, {
            path: '/',
          });
          cookies.set('USERNAME', res.data.username, {
            path: '/',
          });
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

  async function getSchoolsList() {
    try {
      await axios
        .get('http://localhost:1234/schools', {
          params: {
            text: school,
          },
        })
        .then((res) => setAvailableSchools(res.data));
      console.log(availableSchools);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getSchoolsList();
  }, [school]);

  return (
    <div className="section form-page">
      <h1>Sign Up!</h1>
      <form action="POST" className="auth-form">
        <label for="name">Name</label>
        <input
          name="name"
          className="form-text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="available-schools">School</label>
        <input
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          list="available-schools"
          name="available-schools"
          className="form-text"
        />
        <datalist id="available-schools">
          {availableSchools.map((school) => {
            console.log(school.school_name);
            return <option value={school.school_name} />;
          })}
        </datalist>

        <label for="username">Username</label>
        <input
          name="username"
          className="form-text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
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
