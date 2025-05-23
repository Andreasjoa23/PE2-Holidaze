import { deleteVenue } from "../../api/venues";
import { VenueListProps } from "../../types/props";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/missingImage";

const VenueList: React.FC<VenueListProps> = ({
  venues,
  onEdit,
  onClose,
  onDeleted,
}) => {
  const handleDelete = async (venueId: string) => {
    if (window.confirm("Are you sure you want to delete this venue?")) {
      try {
        await deleteVenue(venueId);
        onDeleted();
      } catch (err) {
        console.error("Failed to delete venue:", err);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Venues ({venues.length})</h2>
          <button onClick={onClose} className="text-blue-700 hover:underline">
            ✕ Close
          </button>
        </div>

        <div className="space-y-4">
          {venues.map((venue) => (
            <div key={venue.id} className="flex bg-gray-100 rounded shadow p-4">
              <img
                src={getPlaceholderImage(venue.media?.[0]?.url, 100, 100)}
                alt={venue.media?.[0]?.alt || venue.name}
                className="w-28 h-28 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{venue.name}</h4>
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
              <div className="flex flex-col justify-start items-end ml-4">
                <button
                  onClick={() => handleDelete(venue.id)}
                  className="text-red-600 hover:text-red-800 mb-2"
                  title="Delete"
                >
                  🗑
                </button>
                <button
                  onClick={() => onEdit(venue)}
                  className="text-blue-700 hover:text-blue-900"
                  title="Edit"
                >
                  ✏️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueList;
