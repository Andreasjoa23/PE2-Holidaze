import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getAllVenues } from "../../api/venues";
import {
  getFavoriteVenueIds,
  toggleFavoriteVenue,
} from "../Venue/helpers/favoritesHelpers";
import { useNavigate } from "react-router-dom";
import { FaBed, FaUserFriends } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Venue, ApiListResponse } from "../../types/api";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/image/missingImage";

/**
 * Dropdown component that displays the user's favorited venues.
 * Allows viewing or removing venues from the favorites list.
 */
const FavoritesDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState<Venue[]>([]);
  const navigate = useNavigate();

  /**
   * Fetch favorited venue data by filtering all venues against stored favorite IDs.
   */
  const fetchFavorites = async () => {
    const response = await getAllVenues();
    const allVenues = (response as ApiListResponse<Venue>).data;
    const favIds = getFavoriteVenueIds();
    const favVenues = allVenues.filter((v) => favIds.includes(v.id));
    setFavorites(favVenues);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  /**
   * Toggle a venue's favorite status and refresh the list.
   */
  const handleRemove = (id: string) => {
    toggleFavoriteVenue(id);
    fetchFavorites();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
      {/* Header toggle */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex justify-between items-center text-[#0E1E34] font-semibold"
      >
        <span className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
              4.5 2.09C13.09 3.81 14.76 3 
              16.5 3 19.58 3 22 5.42 22 
              8.5c0 3.78-3.4 6.86-8.55 
              11.54L12 21.35z"
            />
          </svg>
          <span className="text-lg">My favorites ({favorites.length})</span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-500" />
        )}
      </button>

      {/* Dropdown content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="favorites-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-4 max-h-[400px] overflow-y-auto pr-1"
          >
            {favorites.length > 0 ? (
              favorites.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-white rounded-2xl shadow p-4 flex flex-col"
                >
                  {/* Venue image */}
                  <img
                    src={getPlaceholderImage(venue.media?.[0]?.url, 400, 300)}
                    alt={venue.name}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />

                  {/* Venue info */}
                  <h3 className="text-lg font-bold text-[#0E1E34] truncate">
                    {venue.name}
                  </h3>
                  <span className="text-sm text-gray-500 mb-2">
                    ${venue.price} /night
                  </span>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 overflow-hidden">
                    {venue.description || "No description provided."}
                  </p>

                  {/* Capacity and features */}
                  <div className="flex items-center gap-4 text-sm text-gray-700 mb-4">
                    <div className="flex items-center gap-1">
                      <FaBed /> {calculateBeds(venue.maxGuests || 1)} beds
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUserFriends /> {venue.maxGuests} people
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/venue/${venue.id}`)}
                      className="bg-[#0E1E34] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1d2d50] transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleRemove(venue.id)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm hover:bg-red-200 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                You have no favorites.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoritesDropdown;
