import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { deleteBooking } from "../../api/bookings";
import { BookingSummary } from "../../types/api";
import { Link } from "react-router-dom";
import { getPlaceholderImage } from "../../utils/missingImage";
import DropdownCard from "../ui/DropdownCard";

interface BookingsDropdownProps {
  /** List of user's bookings */
  bookings: BookingSummary[];
  /** Callback to refresh bookings after cancellation */
  onCancel: () => void;
}

/**
 * Dropdown section displaying user's bookings.
 * Supports cancellation and linking to booked venue.
 */
const BookingsDropdown: React.FC<BookingsDropdownProps> = ({
  bookings,
  onCancel,
}) => {
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id);
      onCancel();
      setConfirmingId(null);
    } catch (err) {
      console.error("Failed to cancel booking:", err);
    }
  };

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <DropdownCard
      icon={<Calendar className="w-6 h-6" />}
      title="My bookings"
      itemCount={bookings.length}
    >
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow border p-3 flex flex-col sm:flex-row gap-4"
          >
            <img
              src={getPlaceholderImage(booking.venue?.media?.[0]?.url, 100, 100)}
              alt={booking.venue?.name || "Venue image"}
              className="w-24 h-24 rounded-lg object-cover"
            />

            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="text-base font-semibold text-[#0E1E34] truncate max-w-full">
                {booking.venue?.name || "Unnamed venue"}
              </h3>
              <p className="text-sm text-gray-600">
                {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
              </p>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>{booking.guests} guests</span>
                <span>${booking.venue?.price || 0} /night</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {confirmingId === booking.id ? (
                  <>
                    <button
                      onClick={() => handleDelete(booking.id)}
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
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setConfirmingId(booking.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1 rounded-full"
                    >
                      Cancel booking
                    </button>
                    {booking.venue?.id && (
                      <Link
                        to={`/venue/${booking.venue.id}`}
                        className="bg-[#0E1E34] hover:bg-[#1a2c4f] text-white text-xs px-4 py-1 rounded-full"
                      >
                        See Venue
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">You have no bookings.</p>
      )}
    </DropdownCard>
  );
};

export default BookingsDropdown;