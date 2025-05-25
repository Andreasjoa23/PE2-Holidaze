import React, { useState } from "react";
import { Home, Trash2, Pencil } from "lucide-react";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";
import EditVenueModal from "./EditVenueModal";
import { Venue } from "../../types/api";
import { ListingsDropdownProps } from "../../types/props";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";
import DropdownCard from "../ui/DropdownCard";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Dropdown section displaying user's listed venues.
 * Supports editing, deletion, viewing, and booking details.
 */
const ListingsDropdown: React.FC<ListingsDropdownProps> = ({
  listings,
  onDelete,
  onUpdate,
}) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);

  const handleDeleteClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowDeleteModal(true);
  };

  const handleEditClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowEditModal(true);
  };

  const handleShowBookings = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowBookingsModal(true);
  };

  const confirmDelete = () => {
    if (selectedVenue) {
      onDelete(selectedVenue.id);
    }
    setShowDeleteModal(false);
    setSelectedVenue(null);
  };

  return (
    <DropdownCard
      icon={<Home className="w-6 h-6" />}
      title="My listings"
      itemCount={listings.length}
    >
      {listings.length > 0 ? (
        listings.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-xl shadow border p-3 flex items-center gap-4"
          >
            <img
              src={getPlaceholderImage(venue.media?.[0]?.url, 100, 100)}
              alt={venue.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-base font-semibold text-[#0E1E34] truncate max-w-full">
                  {venue.name}
                </h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDeleteClick(venue)}>
                    <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
                  </button>
                  <button onClick={() => handleEditClick(venue)}>
                    <Pencil className="w-4 h-4 text-gray-500 hover:text-gray-800" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2">
                {venue.description || "No description provided."}
              </p>

              <div className="text-xs text-gray-500 mt-1 flex justify-between">
                <span>{calculateBeds(venue.maxGuests || 1)} beds</span>
                <span>{venue.maxGuests} people</span>
                <span>{venue.price} /night</span>
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

              <div className="mt-2">
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

      {/* Delete Confirmation */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        venueName={selectedVenue?.name}
      />

      {/* Edit Venue Modal */}
      <EditVenueModal
        isOpen={showEditModal && !!selectedVenue}
        onClose={() => {
          setShowEditModal(false);
          setSelectedVenue(null);
        }}
        initialData={selectedVenue as Venue}
        onSuccess={() => {
          setShowEditModal(false);
          setSelectedVenue(null);
          onUpdate();
        }}
      />

      {/* Bookings Popup */}
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
    </DropdownCard>
  );
};

export default ListingsDropdown;
