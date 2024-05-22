import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Login from './components/Authentication/Login';
import MyComponent from './components/Authentication/Register';
import HotelsList from './components/Hotels/Hotelslist';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SortComponent from './components/Hotels/SortComponent';
import Hotel from './components/Hotels/Hotel';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/register' && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isLoggedIn, navigate, location]);

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
        
        {/* Protected routes */}
        <Route path="/hotels" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <HotelsList />
          </ProtectedRoute>
        } />
        <Route path="/search" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <SearchPanel />
          </ProtectedRoute>
        } />
        <Route path="/sort" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <SortComponent />
          </ProtectedRoute>
        } />
        <Route path="/card" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Hotel />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;