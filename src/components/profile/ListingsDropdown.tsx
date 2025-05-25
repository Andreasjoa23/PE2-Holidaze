import React, { useState } from "react";
import { Home, Trash2, Pencil } from "lucide-react";
import DeleteConfirmationModal from "../ui/DeleteConfirmationModal";
import EditVenueModal from "./EditVenueModal";
import { Venue } from "../../types/api";
import { ListingsDropdownProps } from "../../types/props";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";
import DropdownCard from "../ui/DropdownCard";

/**
 * Dropdown section displaying user's listed venues.
 * Supports inline editing and deletion.
 */
const ListingsDropdown: React.FC<ListingsDropdownProps> = ({
  listings,
  onDelete,
  onUpdate,
}) => {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowDeleteModal(true);
  };

  const handleEditClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setShowEditModal(true);
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
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You have no listings.</p>
      )}

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
        initialData={selectedVenue as Venue}
        onSuccess={() => {
          setShowEditModal(false);
          setSelectedVenue(null);
          onUpdate();
        }}
      />
    </DropdownCard>
  );
};

export default ListingsDropdown;
