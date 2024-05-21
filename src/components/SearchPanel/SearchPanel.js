import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchPanel = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://academics.newtonschool.co/api/v1/bookingportals/city', {
          headers: {
            projectID: 'f104bi07c490'
          },
        });

        setLocations(response.data.data.cities.map(city => city.cityState));
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="flex justify-center items-center px-6 py-4 bg-white shadow-md rounded-lg">
      <div className="flex gap-4 w-full max-w-2xl bg-gray-50 p-4 rounded-lg shadow-inner">
        <div className="flex flex-col flex-grow py-2 px-4 bg-white rounded-lg shadow-md">
          <label className="text-xs font-semibold text-gray-600">Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-2 text-sm text-black bg-transparent border-none outline-none w-full"
          >
            <option value="">Where are you going?</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <button
          className="flex items-center gap-2 px-6 py-2 text-xl font-medium text-white bg-orange-600 rounded-lg shadow-md hover:bg-orange-700"
          onClick={() => onSearch(destination)}
        >
          <span>Search</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d6d4f6125f7997a445fb71d2dc845a7ea1bb655ba70b772c477839d6f638bc6?"
            className="w-5 h-5"
            alt="search icon"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;