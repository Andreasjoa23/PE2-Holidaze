import React, { useEffect } from "react";
import { deleteVenue } from "../../api/venues";
import { VenueListProps } from "../../types/props";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";

/**
 * Modal component that displays a list of venues owned by the user.
 * Allows for editing or deleting venues.
 *
 * @component
 * @param {VenueListProps} props
 * @returns {JSX.Element}
 */
const VenueList: React.FC<VenueListProps> = ({
  venues,
  onEdit,
  onClose,
  onDeleted,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /**
   * Handle venue deletion with confirmation
   * @param {string} venueId - ID of the venue to delete
   */
  const handleDelete = async (venueId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this venue?");
    if (!confirmed) return;

    try {
      await deleteVenue(venueId);
      onDeleted();
    } catch (err) {
      console.error("Failed to delete venue:", err);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="venue-list-title"
        className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]"
      >
        <header className="flex justify-between items-center mb-4">
          <h2 id="venue-list-title" className="text-xl font-semibold text-[#0E1E34]">
            My Venues ({venues.length})
          </h2>
          <button
            onClick={onClose}
            className="text-blue-700 hover:underline"
            aria-label="Close venue list"
          >
            ✕ Close
          </button>
        </header>

        {venues.length === 0 ? (
          <p className="text-center text-gray-500">You have no venues listed.</p>
        ) : (
          <div className="space-y-4">
            {venues.map((venue) => (
              <article
                key={venue.id}
                className="flex bg-gray-100 rounded-lg shadow p-4"
              >
                <img
                  src={getPlaceholderImage(venue.media?.[0]?.url, 100, 100)}
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="w-28 h-28 object-cover rounded mr-4"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-[#0E1E34]">{venue.name}</h3>
                  <p className="text-sm text-gray-600">
                    {venue.description || "No description"}
                  </p>

                  <div className="flex gap-4 mt-2 text-sm text-gray-700">
                    <span>🛏 {calculateBeds(venue.maxGuests || 1)} beds</span>
                    <span>👥 {venue.maxGuests} guests</span>
                    <span>
                      💰 {venue.price} <span className="text-xs">/night</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-start items-end ml-4 space-y-2">
                  <button
                    onClick={() => handleDelete(venue.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label={`Delete venue: ${venue.name}`}
                  >
                    🗑 Delete
                  </button>
                  <button
                    onClick={() => onEdit(venue)}
                    className="text-blue-700 hover:text-blue-900 transition"
                    aria-label={`Edit venue: ${venue.name}`}
                  >
                    ✏️ Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default VenueList;
