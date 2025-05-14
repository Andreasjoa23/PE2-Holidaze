import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Booking {
  id: string;
  venue?: {
    name?: string;
    media?: { url: string }[];
    price?: number;
  };
  dateFrom: string;
  dateTo: string;
}

interface BookingsDropdownProps {
  bookings: Booking[];
}

const BookingsDropdown: React.FC<BookingsDropdownProps> = ({ bookings }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
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

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="bookings"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            {bookings.length > 0 ? (
              bookings
                .filter((b) => b.venue)
                .map((b) => (
                  <div
                    key={b.id}
                    className="p-3 border-b last:border-b-0 text-sm"
                  >
                    <p className="font-semibold">
                      {b.venue?.name || "Unnamed venue"}
                    </p>
                    <p className="text-gray-600">
                      From {new Date(b.dateFrom).toLocaleDateString()} to{" "}
                      {new Date(b.dateTo).toLocaleDateString()}
                    </p>
                    {b.venue?.price && (
                      <p className="text-gray-500">
                        Price: {b.venue.price} / night
                      </p>
                    )}
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">
                You have no bookings.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingsDropdown;
