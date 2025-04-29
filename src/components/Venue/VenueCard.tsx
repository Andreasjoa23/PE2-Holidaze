import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaUserFriends, FaHeart } from "react-icons/fa";

interface VenueCardProps {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
}

const VenueCard: React.FC<VenueCardProps> = ({ id, name, description, media, price, maxGuests }) => {
  const navigate = useNavigate();
  const imageUrl = media && media.length > 0 ? media[0].url : "https://via.placeholder.com/400";

  const handleViewClick = () => {
    navigate(`/venue/${id}`);
  };

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white flex flex-col relative">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title and Actions */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
          <div className="flex items-center gap-2">
            <FaHeart className="text-[#0A1F44]" />
            <button
              onClick={handleViewClick}
              className="bg-[#0A1F44] text-white px-3 py-1 rounded-md text-sm font-medium"
            >
              View
            </button>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Info Section */}
        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaBed />
            <span>{Math.floor(maxGuests / 2)} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserFriends />
            <span>{maxGuests} guests</span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-4 font-bold text-lg text-gray-900">
          ${price} <span className="text-sm font-normal text-gray-500">/night</span>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;