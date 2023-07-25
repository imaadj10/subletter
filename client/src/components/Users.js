import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1234/users')
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
