import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Calendar,
  Home,
  Plus,
  User as UserIcon,
  X,
} from "lucide-react";
import apiClient from "../../api/apiClient";
import { logout } from "../../utils/auth";
import EditProfile from "../profile/EditProfile";
import VenueForm from "../Venue/VenueForm";
import HeaderBookings from "./Bookings";
import HeaderListings from "./Listings";
import { fetchUserBookings, fetchUserListings } from "../../api/profile";
import { UserProfile, Venue, Booking } from "../../types/api";

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    return parsed.data ?? parsed;
  });

  const [view, setView] = useState<
    "main" | "editProfile" | "createVenue" | "listings" | "bookings"
  >("main");

  const [listings, setListings] = useState<Venue[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editVenue, setEditVenue] = useState<Partial<Venue> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const fetchListings = useCallback(async () => {
    if (!user?.name) return;
    try {
      const listingsData = await fetchUserListings(user.name);
      setListings(listingsData);
    } catch (err) {
      console.error("Failed to fetch listings", err);
      setError("Failed to load listings.");
    }
  }, [user?.name]);

  const fetchBookings = useCallback(async () => {
    if (!user?.name) return;
    try {
      const bookingsData = await fetchUserBookings(user.name);
      setBookings(bookingsData.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
      setError("Failed to load bookings.");
    }
  }, [user?.name]);

  useEffect(() => {
    fetchListings();
    fetchBookings();
  }, [fetchListings, fetchBookings]);

  const handleProfileUpdate = (updatedUser: UserProfile) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setView("main");
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/holidaze/venues/${id}`);
      await fetchListings();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="fixed top-4 left-0 right-0 mx-auto w-[95%] sm:right-4 sm:left-auto sm:w-[420px] md:w-[620px] z-50 bg-white rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {view === "main" && user && (
        <>
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src={user.avatar?.url || "https://placehold.co/80"}
              alt={user.avatar?.alt || user.name}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Hello, {user.name}!
            </h3>
          </div>

          <nav className="flex flex-col gap-2 text-gray-700 mb-4">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <UserIcon size={18} /> Profile
            </button>
            <button
              onClick={() => setView("listings")}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Home size={18} /> My listings
            </button>
            <button
              onClick={() => setView("bookings")}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Calendar size={18} /> My bookings
            </button>
            <button
              onClick={() => {
                setEditVenue(null);
                setView("createVenue");
              }}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Plus size={18} /> List a property
            </button>
          </nav>

          <hr className="border-t border-gray-200 my-4" />

          <button
            onClick={() => {
              logout();
              navigate("/");
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#0E1E34] text-white py-3 rounded-lg font-medium hover:bg-[#182944] transition"
          >
            <LogOut size={18} /> Log out
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center mt-3">{error}</p>
          )}
        </>
      )}

      {view === "editProfile" && (
        <EditProfile
          onSuccess={handleProfileUpdate}
          onClose={() => setView("main")}
        />
      )}

      {view === "createVenue" && (
        <VenueForm
          mode={editVenue ? "edit" : "create"}
          initialData={editVenue ?? undefined}
          onClose={() => {
            setEditVenue(null);
            setView("main");
          }}
          onSuccess={() => {
            setEditVenue(null);
            fetchListings();
            setView("main");
          }}
        />
      )}

      {view === "listings" && (
        <HeaderListings
          listings={listings}
          onBack={() => setView("main")}
          onDelete={handleDelete}
          onEdit={(venue) => {
            setEditVenue(venue as Partial<Venue>);
            setView("createVenue");
          }}
          onRefresh={fetchListings}
        />
      )}

      {view === "bookings" && (
        <HeaderBookings
          bookings={bookings}
          onBack={() => setView("main")}
          onRefresh={fetchBookings}
        />
      )}
    </div>
  );
};

export default UserDropdown;
