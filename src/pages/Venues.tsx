import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVenues } from "../api/venues";
import VenueCard from "../components/Venue/VenueCard";
import { DateRange, Range } from "react-date-range";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaWifi,
  FaPaw,
  FaParking,
  FaCoffee,
} from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Illustration from "../assets/VenueIllustration3.png";
import { Venue, ApiListResponse } from "../types/api";
import { motion } from "framer-motion";
import { Parallax } from "react-scroll-parallax";

export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const initDestination = searchParams.get("destination") || "";
  const initGuests = parseInt(searchParams.get("guests") || "1", 10);
  const initStart = searchParams.get("start")
    ? new Date(searchParams.get("start")!)
    : new Date();
  const initEnd = searchParams.get("end")
    ? new Date(searchParams.get("end")!)
    : new Date();

  const [destination, setDestination] = useState(initDestination);
  const [guests, setGuests] = useState(initGuests);
  const [date, setDate] = useState<Range[]>([
    { startDate: initStart, endDate: initEnd, key: "selection" },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [filters, setFilters] = useState({
    wifi: false,
    pets: false,
    parking: false,
    breakfast: false,
  });
  const [sortOption, setSortOption] = useState("most-booked");

  const loadVenues = async () => {
    try {
      const response = await getAllVenues();
      const result = response as ApiListResponse<Venue>;
      setVenues(result.data);
    } catch {
      setError("Failed to fetch venues");
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  useEffect(() => {
    const params: Record<string, string> = {
      destination,
      guests: String(guests),
      start: date[0].startDate?.toISOString() || "",
      end: date[0].endDate?.toISOString() || "",
    };
    setSearchParams(params);
  }, [destination, guests, date, setSearchParams]);

  const filteredVenues = venues
    .filter((v) => {
      const q = destination.toLowerCase();
      const match =
        !destination ||
        v.name.toLowerCase().includes(q) ||
        v.location?.city?.toLowerCase().includes(q) ||
        v.location?.country?.toLowerCase().includes(q);

      const meetsFilters =
        (!filters.wifi || v.meta.wifi) &&
        (!filters.pets || v.meta.pets) &&
        (!filters.parking || v.meta.parking) &&
        (!filters.breakfast || v.meta.breakfast);

      return match && v.maxGuests >= guests && meetsFilters;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "newest":
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        case "most-booked":
        default:
          return (b.bookings?.length || 0) - (a.bookings?.length || 0);
      }
    });

  const formatDate = (d?: Date) => d?.toLocaleDateString() || "Select date";

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-20 space-y-12 pb-12 bg-white px-4 md:px-8 lg:px-20"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0E1E34] leading-tight mb-4">
            Find Your Perfect Getaway
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Browse exclusive stays handpicked by our community to make your next
            vacation truly unforgettable.
          </p>
        </motion.div>
        <Parallax speed={10}>
          <img
            src={Illustration}
            alt="Travel illustration"
            className="w-64 md:w-80 lg:w-96"
          />
        </Parallax>
      </div>

      {/* Resten av koden for søkefilter, kalendervisning og venue cards vises her. */}

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
        <h2 className="text-xl md:text-2xl font-bold text-[#0E1E34] mb-6 text-center">
          Refine Your Search
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 mb-1">
              Destination
            </span>
            <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#0E1E34]">
              <FaSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                className="outline-none w-full text-sm md:text-base"
                placeholder="Where to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 mb-1">
              Dates
            </span>
            <div
              className="flex items-center border border-gray-200 rounded-full px-4 py-2 cursor-pointer focus-within:ring-2 focus-within:ring-[#0E1E34]"
              onClick={() => setShowCalendar(true)}
            >
              <FaCalendarAlt className="text-gray-400 mr-2" />
              <span className="text-sm md:text-base">
                {`${formatDate(date[0].startDate)} – ${formatDate(date[0].endDate)}`}
              </span>
            </div>
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 mb-1">
              Guests
            </span>
            <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#0E1E34]">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="number"
                min={1}
                className="outline-none w-16 text-sm md:text-base"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              />
            </div>
          </label>
        </div>

        <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
          <div className="flex flex-wrap gap-3">
            {[
              { key: "wifi", label: "Wi-Fi", icon: <FaWifi /> },
              { key: "pets", label: "Pets", icon: <FaPaw /> },
              { key: "parking", label: "Parking", icon: <FaParking /> },
              { key: "breakfast", label: "Breakfast", icon: <FaCoffee /> },
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof prev],
                  }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  filters[key as keyof typeof filters]
                    ? "bg-[#0E1E34] text-white"
                    : "bg-gray-100 text-[#0E1E34]"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          <div className="mt-4 md:mt-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-[#0E1E34] text-white px-4 py-2 rounded-full text-sm font-medium pr-5 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0E1E34] transition"
            >
              <option value="most-booked">Most Booked</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        {showCalendar && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCalendar(false)}
          >
            <div
              className="bg-white rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <DateRange
                editableDateInputs
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
                rangeColors={["#0E1E34"]}
              />
              <div className="p-4 text-right bg-gray-100">
                <button
                  onClick={() => setShowCalendar(false)}
                  className="bg-[#0E1E34] text-white px-6 py-2 rounded-full hover:bg-[#182944] transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-center text-3xl font-bold text-[#0E1E34]">
          {filteredVenues.length} stays found
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredVenues.map((v) => (
            <VenueCard
              key={v.id}
              id={v.id}
              name={v.name}
              description={v.description}
              media={v.media}
              price={v.price}
              maxGuests={v.maxGuests}
              location={v.location}
            />
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No venues match your criteria.
          </p>
        )}
      </div>
    </motion.section>
  );
}
