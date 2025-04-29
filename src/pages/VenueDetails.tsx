import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateRange } from "react-date-range";
import { FaWifi, FaParking, FaCoffee, FaDog, FaUsers, FaBed, FaImages, FaHeart } from "react-icons/fa";
import apiClient from "../api/apiClient";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await apiClient.get(`/holidaze/venues/${id}?_bookings=true`);
        setVenue(response.data.data);
        console.log("Fetched venue:", response.data.data);
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
  };

  const getDisabledDates = () => {
    if (!venue?.bookings) return [];
    const disabledDates: Date[] = [];
    venue.bookings.forEach((booking: any) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        disabledDates.push(new Date(d));
      }
    });
    return disabledDates;
  };

  if (isLoading) return <p className="text-center mt-10">Loading venue details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!venue) return <p className="text-center mt-10">Venue not found.</p>;

  return (
    <section className="p-4 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-5xl font-bold text-[#0E1E34] mb-4 md:mb-8">{venue.name}</h1>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
        <img
          onClick={() => setIsLightboxOpen(true)}
          src={venue.media?.[0]?.url || "https://via.placeholder.com/600x400"}
          alt={venue.name}
          className="w-full h-60 md:h-80 object-cover rounded-2xl shadow-lg cursor-pointer col-span-2"
        />
        <div className="flex md:flex-col gap-4">
          {venue.media?.slice(1, 3).map((img: any, index: number) => (
            <img
              key={index}
              onClick={() => setIsLightboxOpen(true)}
              src={img.url || "https://via.placeholder.com/300"}
              alt={venue.name}
              className="w-1/2 md:w-full h-24 md:h-36 object-cover rounded-2xl shadow-md cursor-pointer"
            />
          ))}
          <button
            className="flex items-center justify-center px-4 py-2 bg-[#0E1E34] text-white text-sm rounded-full shadow md:hidden"
            onClick={() => setIsLightboxOpen(true)}
          >
            <FaImages className="mr-2" /> Se all Images
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={venue.media.map((img: any) => ({ src: img.url }))}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2 text-[#0E1E34]">
            <p className="font-semibold">{venue.location?.city}, {venue.location?.country}</p>
            <div className="flex items-center gap-2 font-semibold">
              <FaUsers /> {venue.maxGuests} Guests
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <FaBed /> {Math.floor(venue.maxGuests / 2)} Beds
            </div>
          </div>

          <div className="border-b border-gray-300"></div>

          <div className="h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Host info coming soon...
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0E1E34] mb-2">Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{venue.description}</p>
          </div>

          <div className="flex gap-4 flex-wrap">
            {venue.meta?.wifi && (
              <div className="flex flex-col items-center">
                <div className="bg-[#0E1E34] p-3 rounded-full text-white">
                  <FaWifi />
                </div>
                <p className="text-xs mt-1 text-[#0E1E34]">Wifi</p>
              </div>
            )}
            {venue.meta?.parking && (
              <div className="flex flex-col items-center">
                <div className="bg-[#0E1E34] p-3 rounded-full text-white">
                  <FaParking />
                </div>
                <p className="text-xs mt-1 text-[#0E1E34]">Parking</p>
              </div>
            )}
            {venue.meta?.breakfast && (
              <div className="flex flex-col items-center">
                <div className="bg-[#0E1E34] p-3 rounded-full text-white">
                  <FaCoffee />
                </div>
                <p className="text-xs mt-1 text-[#0E1E34]">Breakfast</p>
              </div>
            )}
            {venue.meta?.pets && (
              <div className="flex flex-col items-center">
                <div className="bg-[#0E1E34] p-3 rounded-full text-white">
                  <FaDog />
                </div>
                <p className="text-xs mt-1 text-[#0E1E34]">Pet Friendly</p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Section */}
        <div>
          <h2 className="text-xl font-bold text-[#0E1E34] mb-4">Select your stay</h2>
          <DateRange
            ranges={dateRange}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            rangeColors={["#0E1E34"]}
            minDate={new Date()}
            disabledDates={getDisabledDates()}
            className="shadow-xl rounded-xl overflow-hidden"
          />
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleBooking}
              className="bg-[#0E1E34] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1d2d50] transition"
            >
              Book Now
            </button>
            <button className="text-[#0E1E34] text-xl">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueDetails;
