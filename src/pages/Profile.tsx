import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingsDropdown from "../components/profile/BookingsDropdown";
import ListingsDropdown from "../components/profile/ListingsDropdown";
import FavoritesDropdown from "../components/profile/FavoritesDropdown";
import EditProfile from "../components/profile/EditProfile";
import VenueForm from "../components/Venue/VenueForm";
import Insights from "../components/profile/Insights";
import { fetchUserBookings, fetchUserListings } from "../api/profile";
import { deleteVenue } from "../api/venues";
import { AnimatePresence } from "framer-motion";
import { BookingSummary, Venue, UserProfile } from "../types/api";
import { getPlaceholderImage } from "../utils/missingImage";

/**
 * Profile page displaying user-specific content such as:
 * - Bookings
 * - Listings
 * - Favorite venues
 * - Profile editing
 * - Venue creation (if manager)
 */
const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [bookings, setBookings] = useState<BookingSummary[]>([]);
  const [listings, setListings] = useState<Venue[]>([]);
  const [error, setError] = useState("");

  const [showEditor, setShowEditor] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    if (!user?.name) return;

    const loadUserData = async () => {
      try {
        const [bk, ls] = await Promise.all([
          fetchUserBookings(user.name),
          fetchUserListings(user.name),
        ]);
        setBookings(bk.data);
        setListings(ls);
      } catch (err) {
        console.error(err);
        setError("Failed to load your data.");
      }
    };

    loadUserData();
  }, [user?.name]);

  const handleProfileUpdate = (updated: UserProfile) => {
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setShowEditor(false);
  };

  const handleVenueDeleted = async (id: string) => {
    try {
      await deleteVenue(id);
      const refreshed = await fetchUserListings(user!.name);
      setListings(refreshed);
    } catch (err) {
      console.error("Failed to delete venue:", err);
    }
  };

  const viewsCount = listings.reduce(
    (sum, venue) => sum + (venue.bookings?.length || 0),
    0
  );

  const income = bookings.reduce((sum, booking) => {
    const price = booking.venue?.price || 0;
    const nights =
      (new Date(booking.dateTo).getTime() -
        new Date(booking.dateFrom).getTime()) /
      (1000 * 60 * 60 * 24);
    return sum + price * nights;
  }, 0);

  const futureBookings = bookings
    .filter((b) => new Date(b.dateFrom) > new Date())
    .sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());

  const nextBooking = futureBookings[0]
    ? new Date(futureBookings[0].dateFrom).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      }).replace(/\//g, ".")
    : "None";

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-320px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">

        {/* Banner */}
        <img
          src={getPlaceholderImage(user.banner?.url, 1600, 400)}
          alt={user.banner?.alt || "Banner"}
          className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-2xl"
        />

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-6">
            <img
              src={getPlaceholderImage(user.avatar?.url, 100, 100)}
              alt={user.avatar?.alt || user.name}
              className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-4 border-white object-cover shadow"
            />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0E1E34]">{user.name}</h2>
              <p className="text-sm text-gray-500">Your profile overview</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            {user.venueManager && (
              <button
                onClick={() => {
                  setShowCreateForm(true);
                  setShowEditor(false);
                }}
                className="bg-[#0E1E34] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#182944] transition"
              >
                Create listing
              </button>
            )}
            <button
              onClick={() => {
                setShowEditor(true);
                setShowCreateForm(false);
              }}
              className="bg-[#0E1E34] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#182944] transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Modals */}
        <AnimatePresence>
          {showEditor && (
            <EditProfile
              onSuccess={handleProfileUpdate}
              onClose={() => setShowEditor(false)}
            />
          )}

          {showCreateForm && (
            <VenueForm
              mode="create"
              onSuccess={(newId) => {
                setShowCreateForm(false);
                navigate(`/venue/${newId}`);
                window.location.reload();
              }}
              onClose={() => setShowCreateForm(false)}
            />
          )}
        </AnimatePresence>

        {/* Main content layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
          <div className="col-span-2 flex flex-col space-y-6">
            <BookingsDropdown
              bookings={bookings}
              onCancel={async () => {
                const refreshed = await fetchUserBookings(user.name);
                setBookings(refreshed.data);
              }}
            />
            <ListingsDropdown
              listings={listings}
              onDelete={handleVenueDeleted}
              onUpdate={async () => {
                const refreshed = await fetchUserListings(user.name);
                setListings(refreshed);
              }}
            />
            <FavoritesDropdown />
          </div>

          <Insights
            bookingsCount={bookings.length}
            viewsCount={viewsCount}
            income={income}
            nextBooking={nextBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
