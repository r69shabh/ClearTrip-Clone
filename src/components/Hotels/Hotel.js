import React, { useState, useEffect } from 'react';

const Hotel = ({ hotelId }) => {
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`, {
          method: 'GET',
          headers: {
            'projectId': 'f104bi07c490',
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setHotelDetails(data.data.hotel);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!hotelDetails) {
    return <div>Hotel details not found</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden my-8">
      <img className="w-full h-64 object-cover object-center" src={hotelDetails.images[0]} alt={hotelDetails.name} />
      <div className="py-4 px-6">
        <h2 className="text-2xl font-semibold text-gray-800">{hotelDetails.name}</h2>
        <p className="text-sm text-gray-600">{hotelDetails.location}</p>
        <p className="text-sm text-gray-600">Rating: {hotelDetails.rating}</p>
        <div className="flex items-center mt-4">
          <p className="text-sm text-gray-600">Amenities: </p>
          <ul className="ml-2">
            {hotelDetails.amenities.map((amenity, index) => (
              <li key={index} className="text-xs text-gray-600">{amenity}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg text-gray-800">Rooms:</p>
          <p className="text-lg text-gray-800">Starting from ${hotelDetails.rooms[0].costDetails.baseCost}</p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;