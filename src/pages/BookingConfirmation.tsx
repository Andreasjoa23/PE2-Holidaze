import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const BookingConfirmation = () => {
  const location = useLocation();
  const { venueImage, venueName, guests, dateFrom, dateTo } =
    location.state || {};

  const formattedStart = new Date(dateFrom).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedEnd = new Date(dateTo).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiOpacity, setConfettiOpacity] = useState(1);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const visibleTimer = setTimeout(() => {
      const fadeDuration = 2000;
      const steps = 20;
      const interval = fadeDuration / steps;
      let step = 0;

      const fade = setInterval(() => {
        step++;
        setConfettiOpacity(1 - step / steps);
        if (step >= steps) {
          clearInterval(fade);
          setShowConfetti(false);
        }
      }, interval);
    }, 3000);

    return () => clearTimeout(visibleTimer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {showConfetti && (
        <div
          style={{ opacity: confettiOpacity, transition: "opacity 0.3s ease" }}
        >
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={400}
            recycle={false}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12"
      >
        {/* Left: Illustration + Heading */}
        <div className="flex-1 text-center md:text-left">
          <motion.img
            src="/src/assets/BookingConfirmed.png"
            alt="Booking confirmed"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-md mx-auto md:mx-0 mb-6"
          />

          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-[#0E1E34] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Booking Confirmed
          </motion.h1>

          <p className="text-gray-600 text-lg md:text-xl">
            Your trip has been successfully booked! ✅
          </p>
        </div>

        {/* Right: Booking Info */}
        <div className="flex-1 max-w-md w-full">
          <img
            src={venueImage}
            alt="Venue"
            className="rounded-2xl w-full h-60 object-cover mb-4 shadow-lg"
          />
          <h2 className="text-2xl font-semibold text-[#0E1E34] mb-1">
            {venueName}
          </h2>
          <p className="text-md text-gray-700 mb-1">
            {formattedStart} – {formattedEnd}
          </p>
          <p className="text-md text-gray-700 mb-6">{guests} guest(s)</p>

          <Link to="/profile?open=bookings">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0E1E34] text-white px-8 py-3 rounded-full text-md font-semibold hover:bg-[#1d2d50] transition"
            >
              Go to my bookings
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;
