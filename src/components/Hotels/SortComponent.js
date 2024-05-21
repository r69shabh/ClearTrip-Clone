import React, { useState } from 'react';

const SortComponent = ({ onSort }) => {
  const [sortOption, setSortOption] = useState('');

  const sortOptions = [
    'Price (highest first)',
    'Price (lowest first)',
    'Property rating (high to low)',
    'Property rating (low to high)',
  ];

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    onSort(selectedOption);
  };

  return (
    <div className="flex gap-4 items-center px-6 py-3 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="text-lg font-semibold text-gray-700">Sort by:</div>
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="px-3 py-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
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