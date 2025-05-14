import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateRange, Range } from "react-date-range";
import {
  FaWifi,
  FaParking,
  FaCoffee,
  FaDog,
  FaUsers,
  FaBed,
  FaImages,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import apiClient from "../api/apiClient";
import { createBooking } from "../api/bookings";
import Lightbox from "yet-another-react-lightbox";
import {
  isFavorite,
  toggleFavoriteVenue,
} from "../components/Venue/favoritesHelpers";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "yet-another-react-lightbox/styles.css";

type Media = {
  url: string;
  alt?: string;
};

type Booking = {
  dateFrom: string;
  dateTo: string;
};

type Venue = {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  location: {
    city: string;
    country: string;
  };
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  media: Media[];
  bookings: Booking[];
};

const VenueDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await apiClient.get<{ data: Venue }>(
          `/holidaze/venues/${id}?_bookings=true`
        );
        setVenue(response.data.data);
      } catch {
        setError("Failed to load venue details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVenue();
      setIsFav(isFavorite(id));
    }
  }, [id]);

  const handleBooking = async () => {
    const { startDate, endDate } = dateRange[0];
  
    const bookingData = {
      dateFrom: startDate!.toISOString(),
      dateTo: endDate!.toISOString(),
      guests: guests,
      venueId: id!,
    };
  
    try {
      await createBooking(bookingData);
  
      setTimeout(() => {
        navigate("/bookingConfirmation", {
          state: {
            venueImage: venue?.media?.[0]?.url,
            venueName: venue?.name,
            guests: guests,
            dateFrom: startDate?.toISOString(),
            dateTo: endDate?.toISOString(),
          },
        });
      }, 1000);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book. Please try again.");
    }
  };
  

  const getDisabledDates = () => {
    if (!venue?.bookings) return [];
    const disabled: Date[] = [];

    venue.bookings.forEach((booking) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        disabled.push(new Date(d));
      }
    });

    return disabled;
  };

  const handleToggleFavorite = () => {
    const updated = toggleFavoriteVenue(id!);
    setIsFav(updated.includes(id));
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading venue details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!venue) return <p className="text-center mt-10">Venue not found.</p>;

  return (
    <section className="p-4 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-5xl font-bold text-[#0E1E34] mb-4 md:mb-8">
        {venue.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
        <img
          onClick={() => setIsLightboxOpen(true)}
          src={venue.media?.[0]?.url || "https://via.placeholder.com/600x400"}
          alt={venue.name}
          className="w-full h-60 md:h-80 object-cover rounded-2xl shadow-lg cursor-pointer col-span-2"
        />
        <div className="flex md:flex-col gap-4">
          {venue.media?.slice(1, 3).map((img, i) => (
            <img
              key={i}
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
            <FaImages className="mr-2" /> See all Images
          </button>
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={venue.media.map((img) => ({ src: img.url }))}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2 text-[#0E1E34]">
            <p className="font-semibold">
              {venue.location?.city}, {venue.location?.country}
            </p>
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
            <p className="text-gray-700 text-sm leading-relaxed">
              {venue.description}
            </p>
          </div>

          <div className="flex gap-4 flex-wrap">
            {venue.meta?.wifi && <FeatureIcon icon={<FaWifi />} label="Wifi" />}
            {venue.meta?.parking && <FeatureIcon icon={<FaParking />} label="Parking" />}
            {venue.meta?.breakfast && <FeatureIcon icon={<FaCoffee />} label="Breakfast" />}
            {venue.meta?.pets && <FeatureIcon icon={<FaDog />} label="Pet Friendly" />}
          </div>
        </div>

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
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                min={1}
                max={venue.maxGuests}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-[#0E1E34] focus:border-[#0E1E34]"
              />
              <small className="text-gray-500">Max allowed: {venue.maxGuests}</small>
            </div>

            <button
              onClick={handleBooking}
              className="bg-[#0E1E34] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1d2d50] transition"
            >
              Book Now
            </button>
            <button
              className="text-[#0E1E34] text-xl hover:scale-110 transition"
              onClick={handleToggleFavorite}
            >
              {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureIcon = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-[#0E1E34] p-3 rounded-full text-white">{icon}</div>
    <p className="text-xs mt-1 text-[#0E1E34]">{label}</p>
  </div>
);

export default VenueDetails;
