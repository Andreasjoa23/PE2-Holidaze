// src/components/homepage/HeroBanner.tsx
import React from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import HeroBannerImg from "../../assets/HeroIllustration3d@3x.png";

const HeroBanner: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* TEKST */}
        <motion.div
          className="w-full md:w-5/12 text-center md:text-left space-y-6 pl-6 md:pl-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0E1E34]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
          >
            Welcome to Holidaze
          </motion.h1>
          <motion.p
            className="text-gray-700 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Find your place in the world – whether it’s a seaside cabin, a
            mountain escape, or a city stay. With Holidaze, every journey starts
            with a space that feels like yours.
          </motion.p>
          <motion.p
            className="text-gray-700 text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Create an account to unlock exclusive stays and start planning your
            next adventure.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              className="w-full sm:w-auto bg-[#0E1E34] text-white py-3 px-6 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Become a dazer
            </motion.button>
            <motion.button
              className="w-full sm:w-auto border border-[#0E1E34] text-[#0E1E34] py-3 px-6 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore properties
            </motion.button>
          </div>
        </motion.div>

        {/* BILDE */}
        <Parallax speed={20}>
          <motion.div
            className="w-full md:w-7/12 md:ml-8 flex justify-center
+                       -mt-8 md:-mt-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={HeroBannerImg}
              alt="3D illustration"
              className="w-full max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-xl"
            />
          </motion.div>
        </Parallax>
      </div>
    </section>
  );
};

export default HeroBanner;
