import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Home, Trash, Pencil } from "lucide-react";
import { Venue } from "../../types/api";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";

interface HeaderListingsProps {
  listings: Partial<Venue>[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onEdit: (venue: Partial<Venue>) => void;
  onRefresh: () => void;
}

/**
 * Displays a user's venue listings with the ability to edit, delete (with confirmation), or view metadata.
 * Used inside the site header as a quick-access dropdown view.
 */
const HeaderListings: React.FC<HeaderListingsProps> = ({
  listings,
  onBack,
  onDelete,
  onEdit,
  onRefresh,
}) => {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Partial<Venue> | null>(null);

  const handleConfirmDelete = () => {
    if (selectedVenue?.id) {
      onDelete(selectedVenue.id);
      onRefresh();
    }
    setSelectedVenue(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 space-y-4">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 font-semibold text-[#0E1E34]">
          <Home size={20} />
          <span>My listings</span>
        </div>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {/* Listings list */}
      {listings.length > 0 ? (
        listings.map((venue) => (
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
              <h3 className="font-semibold text-[#0E1E34]">
                {venue.name || "Unnamed Venue"}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {venue.description || "No description"}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{calculateBeds(venue.maxGuests || 1)} beds</span>
                <span>{venue.maxGuests || 1} people</span>
                <span>{venue.price || 0} /night</span>
              </div>

              {venue.bookings?.length && venue.bookings.length > 0 && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full mt-1">
                  {venue.bookings.length} booking
                  {venue.bookings.length > 1 ? "s" : ""}
                </span>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => onEdit(venue)}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedVenue(venue);
                    setShowDeleteModal(true);
                  }}
                  className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You have no listings.</p>
      )}

      <button
        onClick={() => navigate("/profile")}
        className="w-full bg-[#0E1E34] text-white py-2 rounded-lg font-medium hover:bg-[#182944] transition"
      >
        View all
      </button>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedVenue(null);
        }}
        onConfirm={handleConfirmDelete}
        venueName={selectedVenue?.name}
      />
    </div>
  );
};

export default HeaderListings;
