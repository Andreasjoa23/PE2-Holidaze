import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, X, Home, Trash, Pencil } from "lucide-react";
import { Venue } from "../../types/api";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderListingsProps {
  listings: Partial<Venue>[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onEdit: (venue: Partial<Venue>) => void;
  onRefresh: () => void;
}

/**
 * Header dropdown view for user's listings, with edit/delete/view/bookings.
 */
const HeaderListings: React.FC<HeaderListingsProps> = ({
  listings,
  onBack,
  onDelete,
  onEdit,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState<Partial<Venue> | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  const handleConfirmDelete = () => {
    if (selectedVenue?.id) {
      onDelete(selectedVenue.id);
      onRefresh();
    }
    setSelectedVenue(null);
    setShowDeleteModal(false);
  };

  const handleShowBookings = (venue: Partial<Venue>) => {
    setSelectedVenue(venue);
    setShowBookingsModal(true);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 space-y-4">
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
                <button
                  onClick={() => handleShowBookings(venue)}
                  className="mt-1 inline-block bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-3 py-1 rounded-full transition"
                >
                  {venue.bookings.length} booking
                  {venue.bookings.length > 1 ? "s" : ""}
                </button>
              )}

              <div className="flex gap-3 mt-2 flex-wrap">
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
                <Link
                  to={`/venue/${venue.id}`}
                  className="bg-[#0E1E34] hover:bg-[#1a2c4f] text-white text-xs px-4 py-1 rounded-full"
                >
                  See Venue
                </Link>
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

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedVenue(null);
        }}
        onConfirm={handleConfirmDelete}
        venueName={selectedVenue?.name}
      />

      <AnimatePresence>
        {showBookingsModal && selectedVenue?.bookings && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBookingsModal(false)}
          >
            <div
              className="bg-white rounded-xl p-6 w-full max-w-md mx-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4 text-[#0E1E34]">
                Upcoming Bookings for {selectedVenue.name}
              </h3>
              <ul className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {selectedVenue.bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm flex items-start gap-4"
                  >
                    <img
                      src={getPlaceholderImage(
                        booking.customer?.avatar?.url,
                        48,
                        48
                      )}
                      alt={
                        booking.customer?.avatar?.alt ||
                        booking.customer?.name ||
                        "Guest"
                      }
                      className="w-12 h-12 rounded-full object-cover border border-white shadow"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-[#0E1E34] mb-1">
                        <strong>📅 From:</strong>{" "}
                        {new Date(booking.dateFrom).toLocaleDateString()}{" "}
                        <strong>to</strong>{" "}
                        {new Date(booking.dateTo).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>👥 Guests:</strong> {booking.guests}
                      </p>
                      {booking.customer?.name && (
                        <p className="text-sm text-gray-600">
                          <strong>👤 Booked by:</strong> {booking.customer.name}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg"
                onClick={() => setShowBookingsModal(false)}
                aria-label="Close bookings modal"
              >
                &times;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderListings;
