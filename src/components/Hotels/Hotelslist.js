import React, { useState } from 'react';
import SearchPanel from '../SearchPanel/SearchPanel';
import SortComponent from './SortComponent';
import HotelCard from './HotelCard';
import Hotel from './Hotel'; // Import the new Hotel component

const HotelsList = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [hotels, setHotels] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null); // State to keep track of the selected hotel ID

  const handleSearch = async (destination) => {
    const [city, state] = destination.split(', ');
    setSelectedCity({ city_name: city, state_name: state });
    
    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`, {
        method: 'GET',
        headers: {
          'projectId': 'f104bi07c490',
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setHotels(data.data.hotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSort = async (sortOption) => {
    if (!selectedCity.city_name) return;

    let sortParam = '';

    switch (sortOption) {
      case 'Price (highest first)':
        sortParam = '{"avgCostPerNight":-1}';
        break;
      case 'Price (lowest first)':
        sortParam = '{"avgCostPerNight":1}';
        break;
      case 'Property rating (high to low)':
        sortParam = '{"rating":-1}';
        break;
      case 'Property rating (low to high)':
        sortParam = '{"rating":1}';
        break;
      default:
        return;
    }

    try {
      const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${selectedCity.city_name}, ${selectedCity.state_name}"}&sort=${sortParam}`, {
        method: 'GET',
        headers: {
          'projectId': 'f104bi07c490',
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      setHotels(data.data.hotels);
    } catch (error) {
      console.error("Error fetching sorted hotels:", error);
    }
  };

  const handleHotelClick = (hotelId) => {
    setSelectedHotelId(hotelId); // Set the selected hotel ID
  };
                                                          
  return (
    <div className="container mx-auto mt-6">
      {selectedHotelId ? (
        <Hotel hotelId={selectedHotelId} />
      ) : (
        <>
          <div className="flex flex-col items-center space-y-4">
            <SearchPanel onSearch={handleSearch} />
            <div className="flex justify-between items-center w-full max-w-3xl px-4">
              <div className="text-lg text-gray-700">
                {selectedCity.city_name && selectedCity.state_name 
                  ? `Showing hotels from ${selectedCity.city_name}, ${selectedCity.state_name}`
                  : 'Select a destination to see hotels'}
              </div>
              <div className="w-64">
                <SortComponent onSort={handleSort} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 px-4">
            {hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} onClick={() => handleHotelClick(hotel.id)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};


export default HotelsList;