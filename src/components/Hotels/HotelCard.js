import React from 'react';
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
  // Select the first image from the images array
  const imageUrl = hotel.images.length > 0 ? hotel.images[0] : '';

  // Assuming you want to use the first room's cost details for displaying prices
  const firstRoomCostDetails = hotel.rooms.length > 0 ? hotel.rooms[0].costDetails : { baseCost: 0, taxesAndFees: 0 };
  const baseCost = firstRoomCostDetails.baseCost;
  const taxesAndFees = firstRoomCostDetails.taxesAndFees;

  return (
    <div className="flex flex-col max-w-[288px]">
      <div className="flex overflow-hidden relative flex-col justify-end pt-20 w-full aspect-[1.2]">
        <img
          loading="lazy"
          src={imageUrl}
          alt={hotel.name}
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="relative mt-32 w-full min-h-[31px]" />
      </div>
      <div className="flex gap-5 justify-between mt-2 w-full">
        <div className="flex flex-col self-start px-5 mt-1">
          <div className="text-sm font-semibold leading-5 text-zinc-900">
            {hotel.name}
          </div>
          <div className="mt-2 text-xs font-medium leading-4 text-zinc-500">
            {hotel.location}
          </div>
        </div>
        <div className="flex flex-col px-5">
          <div className="justify-center self-end py-1.5 text-sm font-semibold leading-5 text-emerald-600 whitespace-nowrap bg-emerald-50 rounded">
            {hotel.rating}
          </div>
          <div className="mt-1.5 text-xs font-medium leading-4 text-right text-zinc-500">
            {hotel.reviewsCount ? `${hotel.reviewsCount}+ reviews` : 'No reviews'}
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 px-5 mt-4">
        <div className="text-base font-semibold leading-6 text-zinc-900">
          ₹{parseFloat(baseCost).toFixed(2)}
        </div>
        <div className="flex-auto text-xs leading-4 text-zinc-500">
          + ₹{parseFloat(taxesAndFees).toFixed(2)} tax<span className="text-zinc-500"> / night</span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;