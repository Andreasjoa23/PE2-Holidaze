// src/components/profile/UserDropdown.tsx
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

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

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

  const handleProfileUpdate = (updatedUser: any) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowEditProfile(false);
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-4 right-4 z-50 w-80 bg-white rounded-xl shadow-xl p-6"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Avatar + greeting */}
      <div className="flex flex-col items-center text-center mb-4">
        <img
          src={user?.avatar?.url || "https://placehold.co/80"}
          alt={user?.avatar?.alt || user?.name}
          className="w-20 h-20 rounded-full mb-3 object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Hello, {user?.name}!
        </h3>
        <button
          onClick={() => setShowEditProfile(true)}
          className="w-full bg-[#0E1E34] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#182944] transition"
        >
          Edit Profile
        </button>
      </div>

      {showEditProfile ? (
        <EditProfile onSuccess={handleProfileUpdate} />
      ) : (
        <>
          {/* Menu items */}
          <nav className="flex flex-col gap-2 text-gray-700">
            <button
              onClick={() => {
                navigate("/bookings");
                onClose();
              }}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Calendar size={18} /> My bookings
            </button>
            <button
              onClick={() => {
                navigate("/listings");
                onClose();
              }}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Home size={18} /> My listings
            </button>
            <button
              onClick={() => {
                navigate("/venues/new");
                onClose();
              }}
              className="flex items-center gap-2 text-base py-2 hover:text-[#0E1E34] transition"
            >
              <Plus size={18} /> List a property
            </button>
          </nav>

          {/* Separator */}
          <hr className="border-t border-gray-200 my-4" />

          {/* Log out */}
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
    </div>
  );
};

export default UserDropdown;
