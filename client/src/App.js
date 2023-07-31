import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar.js';
import Notifications from './components/Notifications';
import Listings from './components/Listings';
import Profile from './components/Profile';
import HousingInfo from './components/HousingInfo';
import MessageBoard from './components/MessageBoard';
import Users from './components/Users';
import UserProvider from './UserContext';

function App() {
  const [globalUsername, setGlobalUsername] = useState([]);

  return (
    <UserProvider.Provider value={{ globalUsername, setGlobalUsername }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/housinginfo" element={<HousingInfo />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messageboard" element={<MessageBoard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </UserProvider.Provider>
  );
}

export default App;
