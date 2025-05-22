import React from "react";
import { motion } from "framer-motion";
import ScrollProgress from "../components/ScrollProgress";
import HeroBanner from "../components/homepage/HeroBanner";
import SearchBanner from "../components/homepage/SearchBanner";
import Trending from "../components/homepage/Trending";
import Recommendations from "../components/homepage/Recommendations";
import { isLoggedIn } from "../utils/isLoggedIn";

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home: React.FC = () => {
  const loggedIn = isLoggedIn();

  return (
    <>
      <ScrollProgress />

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

      {!loggedIn && (
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        ></motion.div>
      )}

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: loggedIn ? 0 : 0.2 }}
      >
        <SearchBanner />
      </motion.div>

      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: loggedIn ? 0.1 : 0.3 }}
      >
        <Trending />
      </motion.div>

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
