import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";

const VenueDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (isLoading) return <p className="text-center">Loading venue details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!venue) return <p className="text-center">Venue not found.</p>;

  return (
    <section className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-[#0E1E34] mb-6">{venue.name}</h1>

      {/* Main Image */}
      {venue.media?.[0]?.url && (
        <img
          src={venue.media[0].url}
          alt={venue.media[0].alt || venue.name}
          className="w-full h-80 object-cover rounded-2xl shadow-lg mb-6"
        />
      )}

      {/* Location */}
      <p className="text-gray-600 mb-2">
        📍 {venue.location?.city}, {venue.location?.country}
      </p>

      {/* Price and Guests */}
      <p className="text-lg font-semibold text-gray-800 mb-2">
        {venue.price} NOK / night | Max guests: {venue.maxGuests}
      </p>

      {/* Rating */}
      <p className="text-yellow-500 mb-6">⭐ {venue.rating || "No rating yet"}</p>

      {/* Description */}
      <div className="text-gray-700 leading-relaxed">
        <p>{venue.description}</p>
      </div>
    </section>
  );
};

export default VenueDetails;