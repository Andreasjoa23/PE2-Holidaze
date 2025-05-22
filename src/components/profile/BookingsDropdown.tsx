import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteBooking } from "../../api/bookings";
import { BookingSummary } from "../../types/api";
import { Link } from "react-router-dom";

interface BookingsDropdownProps {
  bookings: BookingSummary[];
  onCancel: () => void;
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BookingsDropdown: React.FC<BookingsDropdownProps> = ({
  bookings,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4 relative z-10">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center text-[#0E1E34] font-semibold"
      >
        <span className="flex items-center space-x-2">
          <Calendar className="w-6 h-6" />
          <span className="text-lg">My bookings ({bookings.length})</span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-gray-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl shadow border p-3 flex flex-col sm:flex-row gap-4"
                >
                  <img
                    src={
                      booking.venue?.media?.[0]?.url ||
                      "https://via.placeholder.com/100"
                    }
                    alt={booking.venue?.name || "Venue image"}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="text-base font-semibold text-[#0E1E34] truncate max-w-full">
                      {booking.venue?.name || "Unnamed venue"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(booking.dateFrom)} –{" "}
                      {formatDate(booking.dateTo)}
                    </p>
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>
                        {booking.venue?.maxGuests
                          ? `${booking.venue.maxGuests} people`
                          : "Guests not available"}
                      </span>
                      <span>
                        {booking.venue?.price
                          ? `$${booking.venue.price} /night`
                          : "Price not available"}
                      </span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsDropdown;
