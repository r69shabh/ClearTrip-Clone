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
    <div className="flex justify-center items-center px-16 py-2.5 bg-white max-md:px-5">
      <div className="flex gap-0 max-w-full w-[578px] max-md:flex-wrap">
        <div className="flex flex-col grow shrink-0 items-start py-3.5 pr-20 pl-3.5 rounded-xl basis-0 bg-zinc-100 w-fit max-md:pr-5">
          <div className="text-xs leading-4 text-gray-600">Destination</div>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-3.5 text-sm text-black bg-transparent border-none outline-none"
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
          className="flex gap-2 justify-center px-7 py-5 text-2xl font-medium leading-8 text-center text-white whitespace-nowrap bg-orange-600 rounded-none max-md:px-5"
          onClick={() => onSearch(destination)}
        >
          <div className="grow my-auto">Search</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d6d4f6125f7997a445fb71d2dc845a7ea1bb655ba70b772c477839d6f638bc6?"
            className="shrink-0 w-6 aspect-square"
            alt="search icon"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;