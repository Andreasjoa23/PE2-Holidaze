import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { getAllVenues } from "../../api/venues";
import {
  getFavoriteVenueIds,
  toggleFavoriteVenue,
} from "../Venue/favoritesHelpers";
import { Venue, ApiListResponse } from "../../types/api";
import { getPlaceholderImage } from "../../utils/missingImage";

/**
 * View-style version of user's favorited venues shown in the header dropdown.
 */
const HeaderFavorites: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [favorites, setFavorites] = useState<Venue[]>([]);
  const navigate = useNavigate();

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

  const handleRemove = (id: string) => {
    toggleFavoriteVenue(id);
    fetchFavorites();
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 font-semibold text-[#0E1E34]">
          <svg
            className="w-5 h-5 text-red-500"
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
          <span>My favorites</span>
        </div>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {favorites.length > 0 ? (
        favorites.map((venue) => (
          <div
            key={venue.id}
            className="border rounded-xl p-3 flex gap-4 shadow-sm"
          >
            <img
              src={getPlaceholderImage(venue.media?.[0]?.url, 100, 100)}
              alt={venue.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 space-y-1 overflow-hidden">
              <h3 className="font-semibold text-[#0E1E34] truncate">
                {venue.name || "Unnamed Venue"}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {venue.description || "No description"}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{venue.maxGuests} people</span>
                <span>${venue.price} /night</span>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/venue/${venue.id}`)}
                  className="bg-[#0E1E34] hover:bg-[#1a2c4f] text-white text-xs px-4 py-1 rounded-full"
                >
                  View
                </button>
                <button
                  onClick={() => handleRemove(venue.id)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 text-xs px-4 py-1 rounded-full"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You have no favorites.</p>
      )}

      <button
        onClick={() => navigate("/profile")}
        className="w-full bg-[#0E1E34] text-white py-2 rounded-lg font-medium hover:bg-[#182944] transition"
      >
        View all
      </button>
    </div>
  );
};

export default HeaderFavorites;
