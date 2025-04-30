// src/components/homepage/SearchBanner.tsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FaSearch, FaCalendarAlt, FaUser, FaTimes } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FormImg from "../../assets/FormImg.png";

const clickSound = new Audio("/click.mp3");

const SearchBanner: React.FC = () => {
  const navigate = useNavigate();
  const dateInputRef = useRef<HTMLDivElement>(null);

  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [months, setMonths] = useState(isMobile ? 1 : 2);

  // Responsivt: oppdater isMobile & months
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setMonths(mobile ? 1 : 2);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ESC lukker kalender
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowCalendar(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = () => {
    clickSound.play();
    const [range] = date;
    navigate(
      `/venues?destination=${encodeURIComponent(
        destination
      )}&start=${range.startDate.toISOString()}&end=${range.endDate.toISOString()}&guests=${guests}`
    );
  };

  // Selve kalender‐innholdet (uten portal)
  const calendarContent = (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowCalendar(false)}
          aria-label="Close calendar"
          className="text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
      </div>
      <DateRange
        ranges={date}
        onChange={(item) => setDate([item.selection])}
        months={months}
        direction="horizontal"
        minDate={new Date()}
        rangeColors={["#0E1E34"]}
      />
      <div className="mt-4 text-right">
        <button
          onClick={() => setShowCalendar(false)}
          className="bg-[#0E1E34] text-white px-6 py-2 rounded-full hover:bg-[#1d2d50] transition"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <section
      className="relative w-full rounded-2xl my-12 py-16 md:h-[600px] overflow-visible"
      style={{
        backgroundImage: `url(${FormImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
          Where to next?
        </h2>

        <div className="bg-white rounded-2xl shadow-sm w-full max-w-sm sm:max-w-md md:max-w-5xl mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-6">
          {/* Destination */}
          <div className="flex items-center flex-1 border border-gray-200 rounded-full px-4 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where to go?"
              className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Date Picker */}
          <div
            ref={dateInputRef}
            className="relative flex items-center flex-1 border border-gray-200 rounded-full px-4 py-2 cursor-pointer"
            onClick={() => setShowCalendar(true)}
          >
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <span className="text-gray-700 text-sm">
              {`${date[0].startDate.toLocaleDateString()} – ${date[0].endDate.toLocaleDateString()}`}
            </span>

            {/* Inline dropdown på desktop */}
            {showCalendar && !isMobile && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 mt-2 z-50"
                style={{ width: dateInputRef.current?.offsetWidth }}
              >
                {calendarContent}
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="flex items-center flex-1 border border-gray-200 rounded-full px-4 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="number"
              min={1}
              className="w-16 outline-none text-gray-700 text-sm"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#0E1E34] text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-[#1d2d50] transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Fullskjerms‐modal på mobil */}
      {showCalendar &&
        isMobile &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCalendar(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>{calendarContent}</div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default SearchBanner;
