import { useLocation, Link } from "react-router-dom";

const BookingConfirmation = () => {
  const location = useLocation();
  const {
    venueImage,
    venueName,
    guests,
    dateFrom,
    dateTo,
  } = location.state || {};

  const formattedStart = new Date(dateFrom).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric"
  });

  const formattedEnd = new Date(dateTo).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center bg-white shadow-lg rounded-2xl p-8 space-y-8 md:space-y-0 md:space-x-8">
        
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/src\assets\BookingConfirmed.png"
            alt="Booking confirmed illustration"
            className="w-64 mb-6"
          />
          <h1 className="text-3xl font-bold text-[#0E1E34] mb-2">Booking confirmed</h1>
          <p className="text-lg text-gray-600">Your trip has been booked ✔️</p>
        </div>

        <div className="bg-gray-50 rounded-2xl shadow-md p-6 w-full max-w-sm text-center md:text-left">
          <img
            src={venueImage}
            alt="Venue"
            className="rounded-xl w-full h-40 object-cover mb-4"
          />
          <h2 className="text-lg font-semibold text-[#0E1E34] mb-1">{venueName}</h2>
          <p className="text-sm text-gray-700 mb-1">{formattedStart} - {formattedEnd}</p>
          <p className="text-sm text-gray-700 mb-4">{guests} guests</p>
          <Link to="/profile?open=bookings">
            <button className="bg-[#0E1E34] text-white px-4 py-2 rounded-full text-sm hover:bg-[#1d2d50] transition">
              Go to my bookings
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
