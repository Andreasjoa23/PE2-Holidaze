import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FaSearch, FaCalendarAlt, FaUser, FaTimes } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FormImg from "../../assets/FormImg.png";

const HOLIDAZE_BLUE = "#0E1E34";
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

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setMonths(mobile ? 1 : 2);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  const calendarContent = (
    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-md">
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
        rangeColors={[HOLIDAZE_BLUE]}
      />
      <div className="mt-4 text-right">
        <button
          onClick={() => setShowCalendar(false)}
          className="bg-[var(--holidaze-blue)] text-white px-6 py-2 rounded-full hover:bg-[#1d2d50] transition"
          style={{ backgroundColor: HOLIDAZE_BLUE }}
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <section
      className="relative w-full rounded-2xl my-12 py-16 overflow-visible"
      style={{
        backgroundImage: `url(${FormImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center px-4">
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-8">
          Where to next?
        </h2>

        <div className="bg-white rounded-3xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row gap-4 p-6 md:p-8">
          <div className="flex items-center flex-1 border border-gray-200 rounded-full px-4 py-3">
            <FaSearch className="text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Where to go?"
              className="w-full outline-none text-gray-700 placeholder-gray-400 text-base"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div
            ref={dateInputRef}
            className="relative flex items-center flex-1 border border-gray-200 rounded-full px-4 py-3 cursor-pointer"
            onClick={() => setShowCalendar(true)}
          >
            <FaCalendarAlt className="text-gray-400 mr-3 flex-shrink-0" />
            <span className="text-gray-700 text-base">
              {`${date[0].startDate.toLocaleDateString()} – ${date[0].endDate.toLocaleDateString()}`}
            </span>

            {showCalendar && !isMobile && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full left-0 mt-2 z-50"
                style={{ width: dateInputRef.current?.offsetWidth }}
              >
                {calendarContent}
              </div>
            )}
          </div>

          <div className="flex items-center flex-1 border border-gray-200 rounded-full px-4 py-3">
            <FaUser className="text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="number"
              min={1}
              className="w-16 outline-none text-gray-700 text-base"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-[var(--holidaze-blue)] text-white px-8 py-3 rounded-full font-medium text-base hover:bg-[#1d2d50] transition"
            style={{ backgroundColor: HOLIDAZE_BLUE }}
          >
            Search
          </button>
        </div>
      </div>

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
