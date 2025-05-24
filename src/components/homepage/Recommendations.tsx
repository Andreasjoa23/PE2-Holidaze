import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Recommendation } from "../../types/props";

/**
 * Static list of user testimonials displayed as animated cards.
 */
const recommendations: Recommendation[] = [
  {
    id: 1,
    name: "Emily Carter",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Oslo, Norway",
    rating: 5,
    comment: "Easy booking. Highly recommended!",
  },
  {
    id: 2,
    name: "Lars Johansen",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    location: "Bergen, Norway",
    rating: 4,
    comment:
      "Holidaze made our vacation absolutely perfect! Amazing accommodations and top-notch service",
  },
  {
    id: 3,
    name: "Sofia Lind",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    location: "Trondheim, Norway",
    rating: 5,
    comment:
      "User-friendly platform, and we found exactly what we wanted. Hard not to love",
  },
];

/**
 * Framer Motion container animation settings.
 */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

/**
 * Framer Motion animation for each testimonial card.
 */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Displays animated customer recommendations/testimonials.
 */
const Recommendations: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {recommendations.map((rec) => (
            <motion.div
              key={rec.id}
              className="bg-white rounded-2xl shadow-lg flex flex-col p-6"
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
              }}
            >
              {/* User info */}
              <div className="flex items-center mb-4">
                <img
                  src={rec.avatar}
                  alt={rec.name}
                  className="w-16 h-16 rounded-full object-cover shadow-sm mr-4"
                />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {rec.name}
                  </h3>
                  <p className="text-sm text-gray-500">{rec.location}</p>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`mr-1 ${
                      i < rec.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 flex-grow">“{rec.comment}”</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Recommendations;
