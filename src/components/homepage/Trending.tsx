import React, { useEffect, useState } from "react";
import { getAllVenues } from "../../api/venues";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Venue {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
}

const Trending: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  (async () => {
    try {
      const res = await getAllVenues();

      const sortedByPopularity = res.data
        .filter((v) => Array.isArray(v.bookings))
        .sort((a, b) => b.bookings.length - a.bookings.length);

      setVenues(sortedByPopularity.slice(0, 8));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  })();
}, []);



  if (loading) {
    return (
      <p className="py-16 text-center text-[#0E1E34]">
        Loading trending stays…
      </p>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-4xl font-bold text-center text-[#0E1E34] mb-12">
        Trending Stays
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {venues.map((v) => (
          <motion.div
            key={v.id}
            className="relative overflow-hidden rounded-2xl shadow-lg group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 120 }}
          >

            <img
              src={v.media?.[0]?.url || "https://via.placeholder.com/400"}
              alt={v.name}
              className="w-full h-64 object-cover"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-xl font-semibold mb-1">
                {v.name}
              </h3>
              <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                {v.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">${v.price}</span>
                <Link
                  to={`/venue/${v.id}`}
                  className="bg-[#0E1E34] hover:bg-[#1d2d50] text-white text-sm px-3 py-1 rounded-full transition"
                >
                  View
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/venues"
          className="inline-block bg-gradient-to-r from-[#0E1E34] to-[#1d2d50] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition shadow-lg"
        >
          View All Stays
        </Link>
      </div>
    </section>
  );
};

export default Trending;
