import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface BookingsDropdownProps {
  bookings: any[];
}

const BookingsDropdown: React.FC<BookingsDropdownProps> = ({ bookings }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
      <button
        onClick={() => setIsOpen((o) => !o)}
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
              bookings.map((b) => (
                <p
                  key={b.id}
                  className="py-2 text-gray-700 border-b last:border-b-0"
                >
                  {b.venue.name}
                </p>
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
