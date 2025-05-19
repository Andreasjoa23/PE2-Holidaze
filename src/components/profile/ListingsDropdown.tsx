import React, { useState } from "react";
import { Trash2, Pencil, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmationModal from "../../utils/DeleteConfirmation";

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
}

interface ListingsDropdownProps {
  listings: Listing[];
  onDelete: (id: string) => Promise<void> | void;
  onUpdate: () => void;
  onBack?: () => void;
  onEdit?: (venue: Listing) => void;
}

const ListingsDropdown: React.FC<ListingsDropdownProps> = ({
  listings,
  onDelete,
  onUpdate,
  onBack,
  onEdit,
}) => {
  const [sortOrder, setSortOrder] = useState<"low" | "high">("low");
  const [selectedVenue, setSelectedVenue] = useState<Listing | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const sortedListings = [...listings].sort((a, b) => {
    return sortOrder === "low" ? a.price - b.price : b.price - a.price;
  });

  const confirmDelete = async () => {
    if (selectedVenue) {
      await onDelete(selectedVenue.id);
      onUpdate();
      setSelectedVenue(null);
      setShowDeleteModal(false);
    }
  };

  const handleEditClick = (venue: Listing) => {
    if (onEdit) onEdit(venue);
  };

  return (
    <div className="w-full max-w-full bg-white rounded-xl shadow p-4 relative z-10">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-sm text-[#0E1E34] hover:underline"
        >
          <ArrowLeft size={16} /> Back
        </button>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">My Listings ({listings.length})</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "low" | "high")}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="low">Sort: Price low → high</option>
          <option value="high">Sort: Price high → low</option>
        </select>
      </div>

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
                <p className="text-sm text-gray-600 line-clamp-2">
                  {venue.description}
                </p>
                <div className="text-xs text-gray-500 mt-2 flex gap-4">
                  <span>{Math.floor(venue.maxGuests / 2)} beds</span>
                  <span>{venue.maxGuests} people</span>
                  <span className="ml-auto">{venue.price} /night</span>
                </div>

                <button
                  onClick={() => window.location.assign(`/venue/${venue.id}`)}
                  className="mt-3 w-full bg-[#0E1E34] text-white text-sm py-1.5 rounded-lg hover:bg-[#182944] transition"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              You have no listings.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        venueName={selectedVenue?.name}
      />
    </div>
  );
};

export default ListingsDropdown;
