// src/components/homepage/Trending.tsx
import React, { useEffect, useState } from "react";
import TrendingSlide from "../TrendingSlide";
import { getAllVenues } from "../../api/venues";
import { motion } from "framer-motion";

interface Venue {
  /* ... */
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const Trending: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllVenues();
        setVenues(res.data.slice(-4));
      } catch {
        console.error("fetch failed");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <p className="text-center py-20">Loading…</p>;
  }

  return (
    <motion.section
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#0E1E34] mb-12">
        Featured stays
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {venues.map((venue) => (
          <TrendingSlide key={venue.id} venue={venue} />
        ))}
      </div>
    </motion.section>
  );
};

export default Trending;
