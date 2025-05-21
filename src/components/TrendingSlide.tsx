import React from "react";
import { motion } from "framer-motion";

interface Venue {
  id: string;
  name: string;
  description: string;
  media?: { url: string }[];
  price: number;
  maxGuests: number;
}

interface TrendingSlideProps {
  venue: Venue;
}

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.3 } },
};

const infoVariants = {
  rest: { y: 20, opacity: 0 },
  hover: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.15 } },
};

const TrendingSlide: React.FC<TrendingSlideProps> = ({ venue }) => {
  const imageUrl =
    venue.media && venue.media.length > 0
      ? venue.media[0].url
      : "https://via.placeholder.com/400x300";

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-lg"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >

      <img
        src={imageUrl}
        alt={venue.name}
        className="w-full h-64 object-cover"
      />

      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
      />

      <motion.div
        variants={infoVariants}
        className="absolute bottom-4 left-4 right-4 flex flex-col items-start"
      >
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-1">
          {venue.name}
        </h3>
        <button
          className="bg-[#0E1E34] hover:bg-[#1d2d50] text-white px-4 py-2 rounded-full text-sm font-medium transition"
          onClick={() => {
            // naviger til detaljside
            window.location.href = `/venue/${venue.id}`;
          }}
        >
          View Details
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TrendingSlide;
