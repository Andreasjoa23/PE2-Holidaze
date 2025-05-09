import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaUserFriends, FaHeart, FaRegHeart } from "react-icons/fa";
import { isFavorite, toggleFavoriteVenue } from "./favoritesHelpers";

interface VenueCardProps {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location?: { city?: string; country?: string };
  onFavoriteToggle?: () => void; // optional callback for syncing
}

const VenueCard: React.FC<VenueCardProps> = ({
  id,
  name,
  description,
  media,
  price,
  maxGuests,
  onFavoriteToggle,
}) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const imageUrl =
    media && media.length > 0
      ? media[0].url
      : "https://via.placeholder.com/400";

  const handleClick = () => navigate(`/venue/${id}`);

  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = toggleFavoriteVenue(id);
    setIsFav(updated.includes(id));
    if (onFavoriteToggle) onFavoriteToggle(); // Notify parent (optional)
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md transition transform hover:scale-102 hover:shadow-lg flex flex-col relative"
    >
      {/* Image + favorite icon */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-105 transition"
        >
          {isFav ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </div>
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
              className="bg-[#0E1E34] text-white font-semibold px-8 py-3 rounded-full text-base shadow-md hover:shadow-lg transition"
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
