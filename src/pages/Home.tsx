import React from "react";
import { motion } from "framer-motion";
import ScrollProgress from "../components/common/ScrollProgress";
import HeroBanner from "../components/homepage/HeroBanner";
import SearchBanner from "../components/homepage/SearchBanner";
import Trending from "../components/homepage/Trending";
import Recommendations from "../components/homepage/Recommendations";
import { isLoggedIn } from "../utils/auth/isLoggedIn";

// Animation variant for sections
const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Home Page Component
 * 
 * Displays hero and promotional content for guests,
 * as well as search and featured venues for all users.
 */
const Home: React.FC = () => {
  const loggedIn = isLoggedIn();

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Hero Banner for unauthenticated users */}
      {!loggedIn && (
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <HeroBanner />
        </motion.div>
      )}

      {/* Search Banner */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: loggedIn ? 0 : 0.2 }}
      >
        <SearchBanner />
      </motion.div>

      {/* Trending Stays */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: loggedIn ? 0.1 : 0.3 }}
      >
        <Trending />
      </motion.div>

      {/* Recommendations Section */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: loggedIn ? 0.2 : 0.4 }}
      >
        <Recommendations />
      </motion.div>
    </>
  );
};

export default Home;
