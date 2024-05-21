import React, { useState, useEffect } from 'react';

const SortComponent = ({ onSort }) => {
  const [sortOption, setSortOption] = useState('');
  const [hotels, setHotels] = useState([]);

  const sortOptions = [
    'Price (highest first)',
    'Price (lowest first)',
    'Property rating (high to low)',
    'Property rating (low to high)',
  ];

  useEffect(() => {
    if (sortOption) {
      fetch('https://api.example.com/sort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": "example@gmail.com",
          "password": "12345",
          "appType": "bookingportals"
        })
      })
        .then(response => response.json())
        .then(data => {
          setHotels(data.data.hotels);
          onSort(data.data.hotels);
        });
    }
  }, [sortOption]);

  return (
    <div className="flex gap-5 justify-between items-start px-4 py-3.5 text-base leading-6 whitespace-nowrap bg-white rounded-3xl border-2 border-solid border-zinc-300 max-w-[260px] text-zinc-900">
      <div className="my-auto">Sort</div>
      <select
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
        }}
        className="shrink-0 self-start w-full aspect-[0.88] h-10 text-lg"
      >
        <option value="">Select sort option</option>
        {sortOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortComponent;