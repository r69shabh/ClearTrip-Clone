import React, { useState } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import SortComponent from './SortComponent';
import HotelCard from './HotelCard';
import axios from 'axios';


const HotelsList = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [hotels, setHotels] = useState([]);

  const handleSearch = (city, state) => {
    setSelectedCity({ city_name: city, state_name: state });
    axios.get(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":{"city_name":"${city}", "state_name":"${state}"}}`, {
      headers: {
        projectID: 'f104bi07c490',
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        email: "example@gmail.com",
        password: "12345",
        appType: "bookingportals"
      }
    })
    .then(response => {
      setHotels(response.data.data.hotels);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  const handleSort = (sortOption) => {
    // Your existing sort logic...
  };

  return (
    <div className="container mx-auto mt-6">
      <div className="flex flex-col items-center space-y-4">
        <SearchPanel onSearch={handleSearch} />
        <div className="flex justify-between w-full max-w-3xl px-4">
        <div className="text-base text-gray-700">Showing hotels from {selectedCity.city_name}, {selectedCity.state_name}</div>
          <div className="w-64">
            <SortComponent onSort={handleSort} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
      </div>
    </div>
  );
};

export default HotelsList;