import React from "react";
import logo from "../../assets/logoHolidazeBlue.png";

/**
 * Loader component used to indicate loading state with a branded animation.
 * Displays a centered Holidaze logo with a pulse effect.
 *
 * @returns A full-screen loading overlay with animated logo.
 */
const Loader: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-[#0E1E34] flex items-center justify-center z-50"
      aria-label="Loading screen"
      role="status"
    >
      <img
        src={logo}
        alt="Holidaze is loading..."
        className="w-28 h-28 animate-pulse"
      />
    </div>
  );
};

export default Loader;
