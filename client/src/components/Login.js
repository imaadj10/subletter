import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('/main', { username, password });

  //     if (response.data.success) {
  //       history.push('/dashboard');
  //     } else {
  //       alert('Login failed. Please try again');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     alert('An error occurred during login.');
  //   }
  // };

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post('http://localhost:1234/main', {
          username,
          password,
        })
        .then((res) => {
          if ((res.data === 'exists')) {
            history('/home', {});
          } else if ((res.data === 'notexists')) {
            alert('User does not exist');
          }
        })
        .catch((e) => {
          alert('wrong details error');
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='section form-page'>
      <h1>Login Page</h1>
      <form action="POST">
        <label htmlFor='username'>Username</label>
        <input
          className='form-text'
          type='text'
          name='username'
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          className='form-text'
          type='text'
          name='password'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submit}>Submit</button>
      </form>
      <div>
        <span className='padding-right'>Don't have an account?</span>
        <Link to="/signup">Sign Up!</Link>   
      </div>  
    </div>
  );
};

export default Login;
