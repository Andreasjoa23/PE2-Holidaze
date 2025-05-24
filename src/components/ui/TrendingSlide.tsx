import React from "react";
import { motion } from "framer-motion";
import { TrendingSlideProps } from "../../types/props";
import { getPlaceholderImage } from "../../utils/missingImage";

// Animation variants for overlay and text reveal
const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};

const infoVariants = {
  rest: { y: 20, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.15 } },
};

/**
 * Renders a single trending venue slide with image and overlay details.
 *
 * @component
 * @param venue - A venue object containing media, name, and ID.
 * @returns A motion-enabled slide for trending venues.
 */
const TrendingSlide: React.FC<TrendingSlideProps> = ({ venue }) => {
  const imageUrl = getPlaceholderImage(venue.media?.[0]?.url, 400, 300);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-lg"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <img
        src={imageUrl}
        alt={venue.name || "Venue preview"}
        className="w-full h-64 object-cover"
      />

      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
        aria-hidden="true"
      />

      <motion.div
        variants={infoVariants}
        className="absolute bottom-4 left-4 right-4 flex flex-col items-start"
      >
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-1">
          {venue.name}
        </h3>
        <button
          onClick={() => {
            window.location.href = `/venue/${venue.id}`;
          }}
          className="bg-[#0E1E34] hover:bg-[#1d2d50] text-white px-4 py-2 rounded-full text-sm font-medium transition"
          aria-label={`View details for ${venue.name}`}
        >
          View Details
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TrendingSlide;
