import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Login from './components/Authentication/Login';
import MyComponent from './components/Authentication/Register';
import HotelsList from './components/Hotels/Hotelslist';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SortComponent from './components/Hotels/SortComponent';
import Hotel from './components/Hotels/Hotel';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}/>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<MyComponent />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path='/search' element={<SearchPanel />} />
        <Route path='/sort' element={<SortComponent />} />
        <Route path='/card' element={<Hotel />} />
      </Routes>
    </div>
  );
}

export default App;