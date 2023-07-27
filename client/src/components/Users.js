import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";


const Users = () => {
  const [users, setUsers] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");

  useEffect(() => {
    axios
      .get('http://localhost:1234/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => {
        console.log('Error fetching users data');
      });
  }, []);

  return (
    <div>
      <h1> Users </h1>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Users;
