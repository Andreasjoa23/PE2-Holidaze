import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import HeroBannerImg from "../../assets/HeroImg.png";

const HeroBanner = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white overflow-hidden">
      {/* Tekst */}
      <motion.div
        className="md:w-1/2 text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-[#0E1E34]"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 60 }}
        >
          Welcome to Holidaze
        </motion.h1>
        <p className="text-gray-700">
          Find your place in the world – whether it’s a seaside cabin, a
          mountain escape, or a city stay. With Holidaze, every journey starts
          with a space that feels like yours.
        </p>
        <p className="text-gray-700">
          Create an account to unlock exclusive stays and start planning your
          next adventure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0E1E34] text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Become a dazer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[#0E1E34] text-[#0E1E34] px-6 py-3 rounded-full font-semibold transition"
          >
            Explore properties
          </motion.button>
        </div>
      </motion.div>

      {/* Parallax-illustrasjon */}
      <Parallax speed={20}>
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={HeroBannerImg}
            alt="City travelers"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </Parallax>
    </section>
  );
};

export default HeroBanner;
