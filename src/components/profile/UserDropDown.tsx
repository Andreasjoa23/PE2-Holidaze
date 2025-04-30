import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

const UserDropdown = ({ onClose }: { onClose: () => void }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 right-0 z-50 w-72 bg-white rounded-xl shadow-lg p-4"
    >
      <div className="flex flex-col items-center text-center mb-4">
        <img
          src={user.avatar?.url || "https://placehold.co/80"}
          alt={user.avatar?.alt || user.name}
          className="w-16 h-16 rounded-full mb-2"
        />
        <h3 className="font-semibold text-gray-800">Hello {user.name}!</h3>
        <Link
          to="/profile"
          className="text-sm text-white bg-blue-900 px-3 py-1 rounded mt-2 hover:bg-blue-800 transition"
        >
          Edit Profile
        </Link>
      </div>

      <div className="flex flex-col gap-2 text-left text-sm text-gray-700">
        <Link to="/profile" className="hover:text-blue-800">👤 Profile</Link>
        <Link to="/bookings" className="hover:text-blue-800">📅 My bookings</Link>
        <Link to="/listings" className="hover:text-blue-800">🏠 My listings</Link>
        <Link to="/venues/new" className="hover:text-blue-800">➕ List a property</Link>
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
    </div>
  );
};

export default UserDropdown;
