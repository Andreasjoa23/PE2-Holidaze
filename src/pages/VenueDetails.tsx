import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateRange, Range } from "react-date-range";
import {
  FaWifi, FaParking, FaCoffee, FaDog,
  FaUsers, FaBed, FaHeart, FaRegHeart
} from "react-icons/fa";
import apiClient from "../api/apiClient";
import { createBooking } from "../api/bookings";
import Lightbox from "yet-another-react-lightbox";
import {
  isFavorite,
  toggleFavoriteVenue
} from "../components/Venue/favoritesHelpers";
import toast, { Toaster } from "react-hot-toast";
import { Venue, BookingSummary } from "../types/api";
import { isLoggedIn } from "../utils/isLoggedIn";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "yet-another-react-lightbox/styles.css";
import Loader from "../components/ui/Loader";
import { calculateBeds } from "../components/ui/Beds";
import { getPlaceholderImage } from "../utils/missingImage";

/**
 * Renders detailed view of a single venue.
 * Allows users to:
 * - View photos, details, and amenities
 * - Check availability via date picker
 * - Book the venue
 * - Add/remove from favorites
 */
const VenueDetails: React.FC = () => {
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

  /** Fetch venue details and initialize favorite state */
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await apiClient.get<{ data: Venue }>(
          `/holidaze/venues/${id}?_bookings=true&_owner=true`
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

  /** Book venue and navigate to confirmation */
  const handleBooking = async () => {
    const { startDate, endDate } = dateRange[0];
    try {
      await createBooking({
        dateFrom: startDate!.toISOString(),
        dateTo: endDate!.toISOString(),
        guests,
        venueId: id!,
      });

      navigate("/bookingConfirmation", {
        state: {
          venueImage: venue?.media?.[0]?.url,
          venueName: venue?.name,
          guests,
          dateFrom: startDate?.toISOString(),
          dateTo: endDate?.toISOString(),
        },
      });
    } catch {
      toast.error("Failed to book. Try again.");
    }
  };

  /** Toggle favorite status */
  const handleToggleFavorite = () => {
    if (!isLoggedIn()) {
      toast("Please log in to save favorites.", { icon: "🔒" });
      return;
    }
    const updated = toggleFavoriteVenue(id!);
    setIsFav(updated.includes(id!));
  };

  /** Generate an array of dates already booked */
  const getDisabledDates = () => {
    if (!venue?.bookings) return [];
    const disabled: Date[] = [];
    venue.bookings.forEach((booking: BookingSummary) => {
      const start = new Date(booking.dateFrom);
      const end = new Date(booking.dateTo);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        disabled.push(new Date(d));
      }
    });
    return disabled;
  };

  // UI STATES
  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!venue) return <p className="text-center mt-10">Venue not found.</p>;

  return (
    <section className="p-4 md:p-12 max-w-7xl mx-auto">
      <Toaster />

      {/* Header */}
      <h1 className="text-2xl md:text-5xl font-bold text-[#0E1E34] mb-4 md:mb-8">
        {venue.name}
      </h1>

      {/* Main image + thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
        <img
          onClick={() => setIsLightboxOpen(true)}
          src={getPlaceholderImage(venue.media?.[0]?.url, 600, 400)}
          alt={venue.name}
          className="w-full h-60 md:h-80 object-cover rounded-2xl shadow-lg cursor-pointer col-span-2"
        />
        <div className="flex gap-4 md:flex-col">
          {venue.media?.slice(1, 3).map((img, i) => (
            <img
              key={i}
              onClick={() => setIsLightboxOpen(true)}
              src={getPlaceholderImage(img.url, 300, 200)}
              alt={venue.name}
              className="w-1/2 md:w-full h-24 md:h-36 object-cover rounded-2xl shadow-md cursor-pointer"
            />
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={venue.media.map((img) => ({
            src: getPlaceholderImage(img.url),
          }))}
        />
      )}

      {/* Details and Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Details */}
        <div className="space-y-6">
          <p className="font-semibold text-[#0E1E34]">
            {venue.location?.city}, {venue.location?.country}
          </p>
          <div className="flex items-center gap-2 text-[#0E1E34]"><FaUsers /> {venue.maxGuests} Guests</div>
          <div className="flex items-center gap-2 text-[#0E1E34]"><FaBed /> {calculateBeds(venue.maxGuests)} Beds</div>

          {/* Host info */}
          <div className="bg-gray-100 p-4 rounded-xl shadow">
            {venue.owner ? (
              <div className="flex items-center gap-4">
                <img
                  src={getPlaceholderImage(venue.owner.avatar?.url, 80, 80)}
                  alt={venue.owner.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
                <div>
                  <p className="font-semibold text-[#0E1E34]">{venue.owner.name}</p>
                  <p className="text-sm text-gray-500">{venue.owner.email}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Host info not available</p>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-[#0E1E34] mb-2">Description</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{venue.description}</p>
          </div>

          {/* Features */}
          <div className="flex gap-4 flex-wrap">
            {venue.meta?.wifi && <FeatureIcon icon={<FaWifi />} label="Wifi" />}
            {venue.meta?.parking && <FeatureIcon icon={<FaParking />} label="Parking" />}
            {venue.meta?.breakfast && <FeatureIcon icon={<FaCoffee />} label="Breakfast" />}
            {venue.meta?.pets && <FeatureIcon icon={<FaDog />} label="Pet Friendly" />}
          </div>
        </div>

        {/* Booking */}
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

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
            <input
              type="number"
              min={1}
              max={venue.maxGuests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border px-4 py-2 rounded-md shadow-sm focus:ring-[#0E1E34] focus:border-[#0E1E34]"
            />
            <small className="text-gray-500">Max: {venue.maxGuests}</small>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={handleBooking}
              className="bg-[#0E1E34] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1d2d50] transition w-full"
            >
              Book Now
            </button>

            <button
              onClick={handleToggleFavorite}
              className="flex items-center justify-center gap-2 border border-[#0E1E34] text-[#0E1E34] px-8 py-3 rounded-full font-semibold hover:bg-[#0E1E34] hover:text-white transition w-full"
            >
              {isFav ? <FaHeart /> : <FaRegHeart />}
              {isFav ? "Favorited" : "Add to favorites"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Displays icon with label for venue amenities.
 */
const FeatureIcon = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="bg-[#0E1E34] p-3 rounded-full text-white">{icon}</div>
    <p className="text-xs mt-1 text-[#0E1E34]">{label}</p>
  </div>
);

export default VenueDetails;
