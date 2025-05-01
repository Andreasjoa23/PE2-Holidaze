// src/pages/Home.tsx
import React from "react";
import { motion } from "framer-motion";

import ScrollProgress from "../components/ScrollProgress";
import HeroBanner from "../components/homepage/HeroBanner";
import MembershipBanner from "../components/homepage/MembershipBanner";
import SearchBanner from "../components/homepage/SearchBanner";
import Recommendations from "../components/homepage/Recommendations";
import Trending from "../components/homepage/Trending";
import Footer from "../components/Footer";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => (
  <>
    <ScrollProgress />

    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <HeroBanner />
    </motion.div>

    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <MembershipBanner />
    </motion.div>

    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <SearchBanner />
    </motion.div>

    {/* Flyttet Recommendations etter Trending */}
    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <Trending />
    </motion.div>

    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <Recommendations />
    </motion.div>
    <Footer />
  </>
);

export default Home;
