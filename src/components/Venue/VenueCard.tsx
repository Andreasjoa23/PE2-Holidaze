import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaUserFriends } from "react-icons/fa";

interface VenueCardProps {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location?: { city?: string; country?: string };
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  description,
  media,
  price,
  maxGuests,
}) => {
  const navigate = useNavigate();
  const imageUrl =
    media && media.length > 0
      ? media[0].url
      : "https://via.placeholder.com/400";

  const handleClick = () => navigate(`/venue/${id}`);

  return (
    <div
      onClick={handleClick}
      className="
        cursor-pointer
        bg-white
        rounded-2xl
        overflow-hidden
        shadow-md
        transition
        transform
        hover:scale-102
        hover:shadow-lg
        flex
        flex-col
      "
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900 truncate mb-2">
          {name}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between text-gray-700">
            <div className="flex items-center gap-2">
              <FaBed className="text-base" />
              <span>{Math.floor(maxGuests / 2)} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-base" />
              <span>{maxGuests} guests</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-500">/night</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="
                bg-[#0E1E34]
                text-white
                font-semibold
                px-8
                py-3
                rounded-full
                text-base
                shadow-md
                hover:shadow-lg
                transition
              "
            >
              View Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
