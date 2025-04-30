import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import EditProfile from "./EditProfile";

const UserDropdown = ({ onClose }: { onClose: () => void }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [user, setUser] = useState(() => {
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
      className="absolute top-12 right-0 z-50 w-80 bg-white rounded-xl shadow-lg p-4"
    >
      <div className="flex flex-col items-center text-center mb-4">
        <img
          src={user?.avatar?.url || "https://placehold.co/80"}
          alt={user?.avatar?.alt || user?.name}
          className="w-16 h-16 rounded-full mb-2"
        />
        <h3 className="font-semibold text-gray-800">Hello {user?.name}!</h3>

        <button
          onClick={() => setShowEditProfile((prev) => !prev)}
          className="text-sm text-white bg-blue-900 px-3 py-1 rounded mt-2 hover:bg-blue-800 transition"
        >
          {showEditProfile ? "Close Editor" : "Edit Profile"}
        </button>
      </div>

      {showEditProfile && (
        <div className="mt-4">
          <EditProfile onSuccess={handleProfileUpdate} />
        </div>
      )}

      {!showEditProfile && (
        <>
          <div className="flex flex-col gap-2 text-left text-sm text-gray-700">
            <button onClick={() => navigate("/bookings")} className="hover:text-blue-800 text-left">
              📅 My bookings
            </button>
            <button onClick={() => navigate("/listings")} className="hover:text-blue-800 text-left">
              🏠 My listings
            </button>
            <button onClick={() => navigate("/venues/new")} className="hover:text-blue-800 text-left">
              ➕ List a property
            </button>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full mt-4 bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default UserDropdown;
