// src/components/ScrollProgress.tsx
import React from "react";
import { useViewportScroll, motion } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 origin-left bg-[#0E1E34] z-50"
    />
  );
};

export default ScrollProgress;
