// src/pages/Venues.tsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVenues } from "../api/venues";
import VenueCard from "../components/Venue/VenueCard";
import { DateRange } from "react-date-range";
import {
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaWifi,
  FaParking,
  FaCoffee,
  FaDog,
} from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location: { city?: string; country?: string };
}

export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // Hentes fra URL eller default
  const initDestination = searchParams.get("destination") || "";
  const initGuests = parseInt(searchParams.get("guests") || "1", 10);
  const initStart = searchParams.get("start")
    ? new Date(searchParams.get("start")!)
    : new Date();
  const initEnd = searchParams.get("end")
    ? new Date(searchParams.get("end")!)
    : new Date();

  // Lokale state for form
  const [destination, setDestination] = useState(initDestination);
  const [guests, setGuests] = useState(initGuests);
  const [date, setDate] = useState([
    { startDate: initStart, endDate: initEnd, key: "selection" },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Fetch venues
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVenues();
        setVenues(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch venues");
      }
    })();
  }, []);

  // Oppdater URL når Search trykkes
  const handleSearch = () => {
    const [range] = date;
    setSearchParams({
      destination,
      guests: String(guests),
      start: range.startDate.toISOString(),
      end: range.endDate.toISOString(),
    });
  };

  // Filtrering basert på destination og guests
  const filteredVenues = venues.filter((v) => {
    const cd = destination.toLowerCase();
    const matchName = v.name.toLowerCase().includes(cd);
    const matchCity = v.location.city?.toLowerCase().includes(cd);
    const matchCountry = v.location.country?.toLowerCase().includes(cd);
    const fitsGuests = v.maxGuests >= guests;
    return (matchName || matchCity || matchCountry) && fitsGuests;
  });

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="p-6 space-y-8">
      {/* Search form */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <div className="text-center text-2xl font-bold text-[#0E1E34]">
          Refine Your Search
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Destinasjon */}
          <div className="flex-1 flex items-center border rounded-full px-4 py-2">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Where to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          {/* Dato */}
          <div
            className="flex-1 flex items-center border rounded-full px-4 py-2 cursor-pointer"
            onClick={() => setShowCalendar(true)}
          >
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <span>
              {`${date[0].startDate.toLocaleDateString()} – ${date[0].endDate.toLocaleDateString()}`}
            </span>
          </div>

          {/* Gjester */}
          <div className="flex-1 flex items-center border rounded-full px-4 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="number"
              min={1}
              className="w-16 outline-none"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          {/* Search-knapp */}
          <button
            onClick={handleSearch}
            className="bg-[#0E1E34] text-white px-6 py-2 rounded-full whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* Kalender-modal */}
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
                  className="bg-[#0E1E34] text-white px-6 py-2 rounded-full"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resultater */}
      <div>
        <h1 className="text-3xl font-bold text-[#0E1E34] mb-4 text-center">
          {filteredVenues.length} stays found
        </h1>
        <div className="flex justify-center gap-6 mb-6">
          <FaWifi size={24} />
          <FaParking size={24} />
          <FaCoffee size={24} />
          <FaDog size={24} />
        </div>
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
