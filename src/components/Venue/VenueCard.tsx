import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBed, FaUserFriends, FaHeart, FaRegHeart } from "react-icons/fa";
import { isFavorite, toggleFavoriteVenue } from "./favoritesHelpers";
import { isLoggedIn } from "../../utils/isLoggedIn";
import { VenueCardProps } from "../../types/props";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";

/**
 * Renders a card UI for a single venue including image, name, description,
 * guest capacity, price, and favorite functionality.
 *
 * @component
 * @param id - The unique venue ID.
 * @param name - The venue title.
 * @param description - A brief venue description.
 * @param media - Array of image objects.
 * @param price - Nightly rate.
 * @param maxGuests - Max guest capacity.
 * @param onFavoriteToggle - Optional callback triggered after toggling favorite.
 */
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

  const imageUrl = getPlaceholderImage(media?.[0]?.url, 400, 300);

  const handleClick = () => navigate(`/venue/${id}`);

  useEffect(() => {
    setIsFav(isFavorite(id));
  }, [id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isLoggedIn()) {
      alert("Please log in to save favorites.");
      return;
    }

    const updated = toggleFavoriteVenue(id);
    setIsFav(updated.includes(id));
    onFavoriteToggle?.();
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md transition transform hover:scale-102 hover:shadow-lg flex flex-col relative"
      role="button"
      aria-label={`View venue details for ${name}`}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:scale-105 transition"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900 truncate mb-2">
          {name}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between text-gray-700">
            <div className="flex items-center gap-2">
              <FaBed className="text-base" />
              <span>{calculateBeds(maxGuests)} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-base" />
              <span>{maxGuests} guests</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-gray-900">${price}</span>
              <span className="text-gray-500"> /night</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="bg-[#0E1E34] text-white font-semibold px-8 py-3 rounded-full text-base shadow-md hover:shadow-lg transition"
              aria-label="Go to venue detail page"
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
