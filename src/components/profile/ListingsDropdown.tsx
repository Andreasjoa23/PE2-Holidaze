import React, { useState, useEffect } from "react";
import {
  Home,
  ChevronDown,
  ChevronUp,
  Trash2,
  Pencil,
  BellRing,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditVenueModal from "./EditVenueModal";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  customer?: {
    name?: string;
    email?: string;
    avatar?: {
      url: string;
      alt?: string;
    };
  };
}

interface Listing {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location: {
    address: string;
    city: string;
    country: string;
  };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  bookings?: Booking[];
}

interface ListingsDropdownProps {
  listings: Listing[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

const ListingsDropdown: React.FC<ListingsDropdownProps> = ({
  listings,
  onDelete,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Listing | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBookingsModal, setShowBookingsModal] = useState(false);
  const [hasNewBookings, setHasNewBookings] = useState(false);

  useEffect(() => {
    const anyWithBookings = listings.some(
      (venue) => venue.bookings && venue.bookings.length > 0
    );
    setHasNewBookings(anyWithBookings);
  }, [listings]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setHasNewBookings(false);
  };

  const handleDeleteClick = (venue: Listing) => {
    setSelectedVenue(venue);
    setShowDeleteModal(true);
  };

  const handleEditClick = (venue: Listing) => {
    if (onEdit) onEdit(venue);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4 relative z-10">
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center text-[#0E1E34] font-semibold relative"
      >
        <span className="flex items-center space-x-2">
          <Home className="w-6 h-6" />
          <span className="text-lg">My listings ({listings.length})</span>
        </span>

        {!isOpen && hasNewBookings && (
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <BellRing className="text-red-500 w-4 h-4 animate-bounce" />
          </div>
        )}

        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          {sortedListings.length > 0 ? (
            sortedListings.map((venue) => (
              <div
                key={venue.id}
                className="bg-white rounded-xl shadow border p-3 flex flex-col"
              >
                <img
                  src={venue.media[0]?.url || "https://via.placeholder.com/100"}
                  alt={venue.name}
                  className="w-full h-32 rounded-lg object-cover mb-3"
                />
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-[#0E1E34] line-clamp-1">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => {
                      setSelectedVenue(venue);
                      setShowDeleteModal(true);
                    }}>
                      <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
                    </button>
                    <button onClick={() => handleEditClick(venue)}>
                      <Pencil className="w-4 h-4 text-gray-500 hover:text-gray-800" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">You have no listings.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        venueName={selectedVenue?.name}
      />

      <EditVenueModal
        isOpen={showEditModal && !!selectedVenue}
        onClose={() => {
          setShowEditModal(false);
          setSelectedVenue(null);
        }}
        initialData={selectedVenue}
        onSuccess={() => {
          setShowEditModal(false);
          setSelectedVenue(null);
          onUpdate();
        }}
      />
    </div>
  );
};

export default ListingsDropdown;
