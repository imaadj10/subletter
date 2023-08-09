import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar.js';
import Notifications from './components/Notifications';
import Listings from './components/Listings';
import Profile from './components/Profile';
import HousingInfo from './components/HousingInfo';
import MessageBoard from './components/MessageBoard';
import SingleListing from './components/SingleListing';
import Schools from './components/Schools';
import { ChakraProvider } from '@chakra-ui/react'
import SingleResidence from './components/SingleResidence';
import Error from './components/Error';
import SearchResidences from './components/SearchResidences';

function App() {
  const location = useLocation();
  const [forceNavbarRerender, setForceNavbarRerender] = useState(false);

  useEffect(() => {
    setForceNavbarRerender(true);
    return () => {
      setForceNavbarRerender(false);
    };
  }, [location]);

  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/housinginfo/:residence" element={<SingleResidence />} />
        <Route path="/housinginfo" element={<HousingInfo />} />
        <Route path="/listings/:id" element={<SingleListing />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messageboard" element={<MessageBoard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/searchresidences" element={<SearchResidences />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
