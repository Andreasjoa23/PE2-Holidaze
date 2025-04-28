import { useEffect, useState } from "react";
import { getAllVenues } from "../api/venues";
import VenueCard from "../components/VenueCard";
import { FaSearch, FaWifi, FaParking, FaCoffee, FaDog } from "react-icons/fa";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location: {
    city?: string;
    country?: string;
  };
}

export default function Venues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [displayVenues, setDisplayVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await getAllVenues();
        console.log("Fetched venues:", response);

        setVenues(response);           // Lagrer ALLE venues
        setDisplayVenues(response.slice(0, 9)); // Viser først 9 på skjerm
      } catch (err) {
        console.error("Failed to fetch venues", err);
        setError("Failed to fetch venues");
      }
    }
    fetchVenues();
  }, []);

  useEffect(() => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(search.toLowerCase())
    );
    setDisplayVenues(filtered);
  }, [search, venues]);

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold text-primary mb-4">Venues</h1>

      {/* Søkefelt */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search venues..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
        />
        <FaSearch className="absolute right-4 top-3.5 text-gray-400" />
      </div>

      {/* Filterikoner */}
      <div className="flex justify-center gap-6 mb-8">
        <FaWifi size={24} />
        <FaParking size={24} />
        <FaCoffee size={24} />
        <FaDog size={24} />
      </div>

      {/* Kortvisning */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayVenues.map((venue) => (
          <VenueCard
            key={venue.id}
            id={venue.id}
            name={venue.name}
            description={venue.description}
            media={venue.media}
            price={venue.price}
            maxGuests={venue.maxGuests}
          />
        ))}
      </div>
    </section>
  );
}