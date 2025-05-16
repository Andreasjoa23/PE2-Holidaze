import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Booking {
  id: string;
  venue?: {
    name?: string;
    media?: { url: string }[];
    price?: number;
    maxGuests?: number;
  };
  dateFrom: string;
  dateTo: string;
}

interface BookingsDropdownProps {
  bookings: Booking[];
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BookingsDropdown: React.FC<BookingsDropdownProps> = ({ bookings }) => {
const [isOpen, setIsOpen] = useState(false);

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
                  className="bg-white rounded-xl shadow border p-3 flex items-center gap-4"
                >
                  <img
                    src={
                      booking.venue?.media?.[0]?.url ||
                      "https://via.placeholder.com/100"
                    }
                    alt={booking.venue?.name || "Venue image"}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#0E1E34]">
                      {booking.venue?.name || "Unnamed venue"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                    </p>
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                      <span>{booking.venue?.maxGuests} people</span>
                      <span>{booking.venue?.price} /night</span>
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
