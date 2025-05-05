import { useEffect, useState } from "react";
import { fetchUserBookings, fetchUserListings } from "../api/profile";
import EditProfile from "../components/profile/EditProfile";
import CreateVenueForm from "../components/Venue/CreateVenueForm";

const Profile = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const loadListings = async () => {
    try {
      const listingsData = await fetchUserListings(user.name);
      setListings(listingsData.data);
    } catch (err) {
      console.error("Failed to refresh listings:", err);
    }
  };

  useEffect(() => {
    if (user?.name) {
      const loadData = async () => {
        try {
          const [bookingsData, listingsData] = await Promise.all([
            fetchUserBookings(user.name),
            fetchUserListings(user.name),
          ]);

          setBookings(bookingsData.data);
          setListings(listingsData.data);
        } catch (err) {
          console.error("Failed to fetch profile data:", err);
          setError("Failed to load profile data.");
        }
      };

      loadData();
    }
  }, [user?.name]);

  const handleProfileUpdate = (updatedUser: any) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowEditor(false);
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative mb-6">
        <img
          src={user.banner?.url || "https://placehold.co/600x200"}
          alt={user.banner?.alt || "Banner"}
          className="w-full h-40 object-cover rounded"
        />
        <img
          src={user.avatar?.url || "https://placehold.co/80"}
          alt={user.avatar?.alt || user.name}
          className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10 left-4 bg-white"
        />
      </div>

      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">Unknown location</p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setShowCreateForm((prev) => !prev)}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {showCreateForm ? "Cancel" : "Create listing"}
        </button>
        <button
          onClick={() => setShowEditor((prev) => !prev)}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {showEditor ? "Close Editor" : "Edit Profile"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {showEditor && (
        <div className="mb-6">
          <EditProfile onSuccess={handleProfileUpdate} />
        </div>
      )}

      {showCreateForm && (
        <div className="mb-6">
          <CreateVenueForm
            onSuccess={() => {
              setShowCreateForm(false);
              loadListings();
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-semibold mb-2">
            Bookings (last 30 days): {bookings.length}
          </h3>
          {bookings.length === 0 ? (
            <p className="text-sm text-gray-500">No recent bookings.</p>
          ) : (
            <ul className="space-y-2">
              {bookings.map((booking) => (
                <li key={booking.id} className="text-sm text-gray-700">
                  • {booking.venue?.name} (from{" "}
                  {new Date(booking.dateFrom).toLocaleDateString()})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-semibold mb-2">
            Listings: {listings.length}
          </h3>
          {listings.length === 0 ? (
            <p className="text-sm text-gray-500">You have no listings yet.</p>
          ) : (
            <ul className="space-y-2">
              {listings.map((venue) => (
                <li key={venue.id} className="flex items-center gap-3">
                  <img
                    src={venue.media?.[0]?.url || "https://placehold.co/60"}
                    alt={venue.media?.[0]?.alt || venue.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{venue.name}</p>
                    <p className="text-sm text-gray-500">
                      {venue.price} NOK / night
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
