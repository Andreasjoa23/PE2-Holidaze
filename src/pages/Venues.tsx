import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVenues } from "../api/venues";
import VenueCard from "../components/Venue/VenueCard";
import { DateRange } from "react-date-range";
import { FaSearch, FaCalendarAlt, FaUser } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Illustration from "../assets/VenueIllustration3.png";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location: { city?: string; country?: string };
  created: string;
}

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
  const [date, setDate] = useState([
    { startDate: initStart, endDate: initEnd, key: "selection" },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllVenues();
        const data: Venue[] = response.data;

        console.log("Fetched venues:", data);

        const sorted = data.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime()
        );

        setVenues(sorted);
      } catch (err) {
        console.error("Error fetching venues:", err);
        setError("Failed to fetch venues");
      }
    })();
  }, []);

  const handleSearch = () => {
    const [range] = date;
    setSearchParams({
      destination,
      guests: String(guests),
      start: range.startDate.toISOString(),
      end: range.endDate.toISOString(),
    });
  };

  const filteredVenues = venues.filter((v) => {
    if (!destination) return v.maxGuests >= guests;

    const q = destination.toLowerCase();
    const match =
      v.name.toLowerCase().includes(q) ||
      v.location.city?.toLowerCase().includes(q) ||
      v.location.country?.toLowerCase().includes(q);
    return match && v.maxGuests >= guests;
  });

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <section className="pt-20 space-y-12 pb-12 bg-white px-4 md:px-8 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0E1E34] leading-tight mb-4">
            Find Your Perfect Getaway
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Browse exclusive stays handpicked by our community to make your next
            vacation truly unforgettable.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src={Illustration}
            alt="Travel illustration"
            className="w-64 md:w-80 lg:w-96"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow">
        <h2 className="text-xl md:text-2xl font-bold text-[#0E1E34] mb-6 text-center">
          Refine Your Search
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {`${date[0].startDate.toLocaleDateString()} – ${date[0].endDate.toLocaleDateString()}`}
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

        <div className="mt-6 text-center">
          <button
            onClick={handleSearch}
            className="bg-[#0E1E34] text-white font-semibold px-8 py-3 rounded-full text-sm md:text-base hover:bg-[#182944] transition"
          >
            Search
          </button>
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
    </section>
  );
}
