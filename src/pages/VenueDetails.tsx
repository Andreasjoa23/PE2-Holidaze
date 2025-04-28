// src/pages/VenueDetails.tsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FaWifi, FaParking, FaCoffee, FaDog } from "react-icons/fa";
import apiClient from "../api/apiClient";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const VenueDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await apiClient.get(`/holidaze/venues/${id}`);
        setVenue(response.data);
      } catch (err: any) {
        setError("Failed to load venue details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVenue();
    }
  }, [id]);

  const handleBooking = () => {
    console.log("Booking from:", dateRange[0].startDate, "to:", dateRange[0].endDate);
    // Senere kan vi sende bruker til bookingConfirmation eller håndtere booking
  };

  if (isLoading) return <p className="text-center mt-10">Loading venue details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!venue) return <p className="text-center mt-10">Venue not found.</p>;

  return (
    <section className="p-6 md:p-12 max-w-6xl mx-auto">
      {/* Venue Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#0E1E34] mb-8">{venue.name}</h1>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <img
          src={venue.media?.[0]?.url || "https://via.placeholder.com/600x400"}
          alt={venue.name}
          className="col-span-2 w-full h-80 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex flex-col gap-4">
          {venue.media?.slice(1, 3).map((img: any, index: number) => (
            <img
              key={index}
              src={img.url || "https://via.placeholder.com/300"}
              alt={venue.name}
              className="w-full h-36 object-cover rounded-2xl shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Left: Details */}
        <div className="space-y-4">
          <p className="text-gray-700">📍 {venue.location?.city}, {venue.location?.country}</p>
          <p className="text-lg font-semibold">{venue.price} NOK / night</p>
          <p className="text-gray-600">Max guests: {venue.maxGuests}</p>
          <p className="text-yellow-500">⭐ {venue.rating || "No rating yet"}</p>

          {/* Facilities */}
          <div className="flex gap-4 mt-4 text-[#0E1E34]">
            {venue.meta?.wifi && <FaWifi title="Wifi" />}
            {venue.meta?.parking && <FaParking title="Parking" />}
            {venue.meta?.breakfast && <FaCoffee title="Breakfast" />}
            {venue.meta?.pets && <FaDog title="Pets allowed" />}
          </div>
        </div>

        {/* Middle: Calendar */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-4">Select your stay</h2>
          <DateRange
            ranges={dateRange}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#0E1E34"]}
            minDate={new Date()}
          />
          <button
            onClick={handleBooking}
            className="mt-6 w-full bg-[#0E1E34] text-white py-3 rounded-full font-semibold hover:bg-[#1d2d50] transition"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-[#0E1E34] mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">{venue.description}</p>
      </div>
    </section>
  );
};

export default VenueDetails;