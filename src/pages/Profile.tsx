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

    const load = async () => {
      try {
        const [bk, ls] = await Promise.all([
          fetchUserBookings(user.name),
          fetchUserListings(user.name),
        ]);
        setBookings(bk.data);
        setListings(ls);
      } catch (e) {
        console.error(e);
        setError("Failed to load your data.");
      }
    };

    load();
  }, [user?.name]);

  const handleProfileUpdate = (updated: UserProfile) => {
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setShowEditor(false);
  };

  const handleVenueDeleted = async (id: string) => {
    try {
      await deleteVenue(id);
      const updated = await fetchUserListings(user!.name);
      setListings(updated);
    } catch (err) {
      console.error("Failed to delete venue:", err);
    }
  };

  const viewsCount = listings.reduce(
    (sum, venue) => sum + (venue.views || 0),
    0
  );

  const income = bookings.reduce((sum, b) => {
    const price = b.venue?.price || 0;
    const nights =
      (new Date(b.dateTo).getTime() - new Date(b.dateFrom).getTime()) /
      (1000 * 60 * 60 * 24);
    return sum + price * nights;
  }, 0);

  const futureBookings = bookings
    .filter((b) => new Date(b.dateFrom) > new Date())
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
    );

  const nextBooking = futureBookings[0]
    ? new Date(futureBookings[0].dateFrom).toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "None";

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="relative mb-4">
        <img
          src={user.banner?.url || "https://placehold.co/600x200"}
          alt={user.banner?.alt || "Banner"}
          className="w-full h-48 md:h-56 object-cover rounded-2xl"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 px-2">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar?.url || "https://placehold.co/80"}
            alt={user.avatar?.alt || user.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white object-cover shadow"
          />
          <div>
            <h2 className="text-xl font-bold text-[#0E1E34]">{user.name}</h2>
            <p className="text-sm text-gray-500">
              {user.location || "Unknown location"}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-2 md:mt-0">
          <button
            onClick={() => {
              setShowCreateForm(true);
              setShowEditor(false);
            }}
            className="bg-[#0E1E34] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#182944] transition"
          >
            Create listing
          </button>
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
            onSuccess={() => {
              setShowCreateForm(false);
              navigate("/venues");
            }}
            onClose={() => setShowCreateForm(false)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col space-y-4">
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
  );
};

export default Profile;
