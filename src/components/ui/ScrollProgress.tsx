import React from "react";
import { useScroll, motion } from "framer-motion";

/**
 * ScrollProgress component
 *
 * A thin progress bar that visually indicates how far the user has scrolled
 * down the page. Uses Framer Motion's `useScroll` to animate the scaleX value.
 *
 * @returns A fixed-position animated scroll progress bar.
 */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 origin-left bg-[#0E1E34] z-50"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
