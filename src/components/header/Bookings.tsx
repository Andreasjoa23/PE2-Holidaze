import { useNavigate } from "react-router-dom";
import { ArrowLeft, X, Calendar } from "lucide-react";
import { deleteBooking } from "../../api/bookings";
import { useState } from "react";
import { HeaderBookingsProps } from "../../types/props";
import { getPlaceholderImage } from "../../utils/missingImage";

/**
 * Formats an ISO date string into a localized readable format.
 * @param iso ISO 8601 date string
 * @returns Localized date string
 */
const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Displays a list of a user's bookings with options to cancel each one.
 * Includes a back button, booking details, and a fallback message when empty.
 */
const HeaderBookings: React.FC<HeaderBookingsProps> = ({
  bookings,
  onBack,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  /**
   * Deletes a booking by its ID and refreshes the list.
   * @param id Booking ID
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      setConfirmingId(null);
      onRefresh();
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 font-semibold text-[#0E1E34]">
          <Calendar size={20} />
          <span>My bookings</span>
        </div>
        <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>

      {bookings.length > 0 ? (
        bookings.map((b) => (
          <div key={b.id} className="border rounded-xl p-3 flex gap-4 shadow-sm">
            <img
              src={getPlaceholderImage(b.venue?.media?.[0]?.url, 100, 100)}
              alt={b.venue?.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-[#0E1E34]">{b.venue?.name}</h3>
              <p className="text-sm text-gray-600">
                {formatDate(b.dateFrom)} – {formatDate(b.dateTo)}
              </p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{b.venue?.maxGuests} people</span>
                <span>{b.venue?.price} /night</span>
              </div>

              {confirmingId === b.id ? (
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full"
                  >
                    Yes, cancel
                  </button>
                  <button
                    onClick={() => setConfirmingId(null)}
                    className="text-xs text-gray-600 hover:underline"
                  >
                    No, go back
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmingId(b.id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full"
                >
                  Cancel booking
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You have no bookings.</p>
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

export default HeaderBookings;
