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
    <div className="flex gap-5 justify-between items-start px-4 py-3.5 text-base leading-6 whitespace-nowrap bg-white rounded-3xl border-2 border-solid border-zinc-300 max-w-[260px] text-zinc-900">
      <div className="my-auto">Sort</div>
      <select
        value={sortOption}
        onChange={handleSortChange}
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