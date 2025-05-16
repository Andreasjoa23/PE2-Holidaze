import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Calendar,
  Home,
  Plus,
  User as UserIcon,
  X,
} from "lucide-react";
import { logout } from "../../utils/auth";
import EditProfile from "./EditProfile";
import VenueForm from "../Venue/VenueForm";
import ListingsView from "../profile/ListingsDropdown";
import BookingsDropdown from "../profile/BookingsDropdown";
import {
  fetchUserBookings,
  fetchUserListings,
} from "../../api/profile";

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [view, setView] = useState<"main" | "editProfile" | "createVenue" | "listings">("main");
  const [listings, setListings] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [setEditVenue] = useState<any | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  const fetchListings = async () => {
    try {
      const listingsData = await fetchUserListings(user.name);
      setListings(listingsData.data);
    } catch (err) {
      console.error("Failed to fetch listings", err);
    }
  };

  const fetchBookingsData = async () => {
    try {
      const bookingsData = await fetchUserBookings(user.name);
      setBookings(bookingsData.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    if (user?.name) {
      fetchListings();
      fetchBookingsData();
    }
  }, [user]);

  const handleProfileUpdate = (updatedUser: any) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setView("main");
  };

  const handleDelete = async (id: string) => {
    try {
      await apiClient.delete(`/holidaze/venues/${id}`);
      fetchListings();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const refetchListings = () => {
    fetchListings();
    setView("listings");
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-4 right-4 z-50 w-96 bg-white rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {view === "main" && (
        <>
          <div className="flex flex-col items-center text-center mb-4">
            <img
              src={user?.avatar?.url || "https://placehold.co/80"}
              alt={user?.avatar?.alt || user?.name}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Hello, {user?.name}!
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
              onClick={() => setView("createVenue")}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Plus size={18} /> List a property
            </button>
          </nav>

          {/* ✅ Inline Bookings Display */}
          <BookingsDropdown bookings={bookings} />

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
          mode="create"
          onClose={() => setView("main")}
          onSuccess={refetchListings}
        />
      )}

      {view === "listings" && (
        <ListingsView
          listings={listings || []}
          onBack={() => setView("main")}
          onDelete={handleDelete}
          onEdit={(venue) => {
            setEditVenue(venue);
            setView("createVenue");
          }}
          onUpdate={refetchListings}
        />
      )}
    </div>
  );
};

export default UserDropdown;
