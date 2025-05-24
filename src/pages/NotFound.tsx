import React from "react";
import { Link } from "react-router-dom";

/**
 * NotFound Page
 * 
 * Displayed when no matching route is found.
 */
const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-5xl font-extrabold text-[#0E1E34] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! The page you're looking for doesn’t exist.</p>
      <Link
        to="/"
        className="bg-[#0E1E34] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#182944] transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
