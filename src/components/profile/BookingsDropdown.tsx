import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

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
  onBack?: () => void;
}

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const BookingsDropdown: React.FC<BookingsDropdownProps> = ({
  bookings,
  onBack,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.dateFrom).getTime();
    const dateB = new Date(b.dateFrom).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

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
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
        >
          {sortedBookings.length > 0 ? (
            sortedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border rounded-2xl shadow-sm p-3 flex flex-col"
              >
                <img
                  src={
                    booking.venue?.media?.[0]?.url ||
                    "https://via.placeholder.com/300"
                  }
                  alt={booking.venue?.name || "Venue image"}
                  className="w-full h-32 rounded-lg object-cover mb-3"
                />
                <h3 className="text-sm font-semibold text-[#0E1E34] line-clamp-2">
                  {booking.venue?.name || "Unnamed venue"}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                </p>
                <div className="text-xs text-gray-500 mt-2 flex justify-between">
                  <span>{booking.venue?.maxGuests} guests</span>
                  <span>{booking.venue?.price} /night</span>
                </div>
                <button
                  onClick={() =>
                    booking.venue?.id &&
                    window.location.assign(`/venue/${booking.venue.id}`)
                  }
                  className="mt-3 w-full bg-[#0E1E34] text-white text-sm py-1.5 rounded-lg hover:bg-[#182944] transition"
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              You have no bookings.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BookingsDropdown;
