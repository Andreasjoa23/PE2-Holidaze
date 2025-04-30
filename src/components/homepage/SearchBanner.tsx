// src/components/homepage/SearchBanner.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FormImg from "../../assets/FormImg.png";

const clickSound = new Audio("/click.mp3"); // legg click.mp3 i /public

const SearchBanner: React.FC = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [guests, setGuests] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    clickSound.play();
    setIsSearching(true);
    setTimeout(() => {
      navigate("/venues");
    }, 800);
  };

  return (
    <section className="relative w-full h-[90vh] md:h-[600px] overflow-hidden rounded-2xl my-12 pt-20 pb-24 px-4 sm:px-6 md:px-9">
      <img
        src={FormImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 sm:px-6">
        <motion.h2
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 md:mb-12 text-center drop-shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Where to next?
        </motion.h2>

        <div className="bg-white flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-4 p-6 sm:p-8 md:p-4 rounded-2xl md:rounded-full shadow-xl w-full max-w-5xl">
          {/* Destination */}
          <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 w-full md:w-auto shadow-sm">
            <FaSearch className="text-[#0E1E34] mr-3 text-lg" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="outline-none w-full placeholder-gray-500 text-gray-800"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Dates */}
          <div className="relative flex items-center border-2 border-gray-200 rounded-full px-4 py-2 w-full md:w-auto shadow-sm">
            <FaCalendarAlt className="text-[#0E1E34] mr-3 text-lg" />
            <input
              type="text"
              readOnly
              onClick={() => setOpenDate(!openDate)}
              value={`${date[0].startDate.toLocaleDateString()} – ${date[0].endDate.toLocaleDateString()}`}
              className="cursor-pointer outline-none w-full placeholder-gray-500 text-gray-800"
            />
            {openDate && (
              <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-5 w-[320px] z-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Select Dates</span>
                  <button
                    onClick={() => setOpenDate(false)}
                    className="text-gray-500 hover:text-black"
                  >
                    &times;
                  </button>
                </div>
                <DateRange
                  editableDateInputs
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  rangeColors={["#0E1E34"]}
                />
                <button
                  onClick={() => setOpenDate(false)}
                  className="bg-[#0E1E34] text-white w-full py-2 rounded-xl mt-4"
                >
                  Select dates
                </button>
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="flex items-center border-2 border-gray-200 rounded-full px-4 py-2 w-full md:w-auto shadow-sm">
            <FaUser className="text-[#0E1E34] mr-3 text-lg" />
            <input
              type="number"
              min="1"
              className="outline-none w-16 text-gray-800"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          {/* Search Button */}
          <motion.button
            onClick={handleSearch}
            disabled={isSearching}
            whileHover={{ scale: isSearching ? 1 : 1.05 }}
            className="bg-[#0E1E34] text-white font-semibold px-8 py-3 rounded-full transition w-full md:w-auto md:ml-auto flex items-center justify-center"
          >
            {isSearching ? (
              <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Check availability"
            )}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
