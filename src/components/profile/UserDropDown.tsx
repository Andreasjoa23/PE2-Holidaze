import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const avatarUrl = user?.avatar?.url || "https://via.placeholder.com/40";
const name = user?.name || "User";
const isVenueManager = user?.venueManager || false;

const UserDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); // optional for refresh
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-4 w-64 z-50">
      {/* Avatar & Greeting */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-14 h-14 rounded-full object-cover mb-2"
        />
        <p className="font-semibold text-gray-800">Hello {name}!</p>
        <button
          className="text-xs bg-blue-900 text-white mt-2 px-3 py-1 rounded"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </button>
      </div>

      {/* Links */}
      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <button onClick={() => navigate("/profile")} className="w-full text-left hover:text-blue-900">
            👤 Profile
          </button>
        </li>
        <li>
          <button onClick={() => navigate("/bookings")} className="w-full text-left hover:text-blue-900">
            📅 My bookings
          </button>
        </li>
        {isVenueManager && (
          <>
            <li>
              <button onClick={() => navigate("/listings")} className="w-full text-left hover:text-blue-900">
                🏘️ My listings
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/create-venue")} className="w-full text-left hover:text-blue-900">
                🏡 List a property
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-gray-200 text-gray-800 px-3 py-2 rounded hover:bg-red-500 hover:text-white transition"
      >
        ⏏ Log out
      </button>
    </div>
  );
};

export default UserDropdown;
