// src/pages/Home.tsx
import React from "react";
import { motion } from "framer-motion";

import ScrollProgress from "../components/ScrollProgress";
import HeroBanner from "../components/homepage/HeroBanner";
import MembershipBanner from "../components/homepage/MembershipBanner";
import SearchBanner from "../components/homepage/SearchBanner";
import Trending from "../components/homepage/Trending";
import Recommendations from "../components/homepage/Recommendations";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => {
  // Sjekk om brukeren er logget inn
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  return (
    <>
      <ScrollProgress />

      {/* Kun vis Hero-banner om ikke logget inn */}
      {!isLoggedIn && (
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

      {/* Kun vis medlemskapet-banner om ikke logget inn */}
      {!isLoggedIn && (
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <MembershipBanner />
        </motion.div>
      )}

      {/* SearchBanner vises alltid */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: isLoggedIn ? 0 : 0.2 }}
      >
        <SearchBanner />
      </motion.div>

      {/* Trending */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: isLoggedIn ? 0.1 : 0.3 }}
      >
        <Trending />
      </motion.div>

      {/* Recommendations */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: isLoggedIn ? 0.2 : 0.4 }}
      >
        <Recommendations />
      </motion.div>
    </>
  );
};

export default Home;
