import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FormImg from "../../assets/FormImg.png";
import "./styles/SearchBanner.css";

const SearchBanner = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    navigate("/venues");
  };

  return (
    <section className="hero-section relative w-full h-[600px] overflow-hidden rounded-2xl my-12">
      <img
        src={FormImg}
        alt="Background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-10">Where to next?</h2>

        <div className="bg-white flex flex-col md:flex-row items-center p-4 md:space-x-4 rounded-full shadow-md w-full max-w-4xl">
          {/* Destination */}
          <div className="flex items-center border rounded-full px-4 py-2 w-full md:w-auto mb-2 md:mb-0">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="outline-none w-full"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Dates */}
          <div className="relative flex items-center border rounded-full px-4 py-2 w-full md:w-auto mb-2 md:mb-0">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              readOnly
              onClick={() => setOpenDate(!openDate)}
              value={`${date[0].startDate.toLocaleDateString()} - ${date[0].endDate.toLocaleDateString()}`}
              className="cursor-pointer outline-none w-full"
            />
            {openDate && (
              <div className="absolute top-16 left-0 bg-white rounded-2xl shadow-lg p-4 w-[300px] z-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">Select Dates</span>
                  <button onClick={() => setOpenDate(false)} className="text-gray-500 hover:text-black">&times;</button>
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
          <div className="flex items-center border rounded-full px-4 py-2 w-full md:w-auto mb-2 md:mb-0">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="number"
              min="1"
              className="outline-none w-16"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-[#0E1E34] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#1d2d50] transition w-full md:w-auto"
          >
            Check availability
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
