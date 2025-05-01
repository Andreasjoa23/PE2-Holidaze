// src/components/Footer.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoHolidaze from "../assets/logoHolidazeBlue.png"; // Assuming you have a logo image
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

interface FooterProps {
  isLoggedIn: boolean;
}

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Footer: React.FC<FooterProps> = ({ isLoggedIn }) => {
  // om vi skal vise footer-skjema, og hvilken tab
  const [active, setActive] = useState<"none" | "login" | "register">("none");

  // reset til “none” hvis bruker logger inn
  const handleClose = () => setActive("none");

  if (isLoggedIn) {
    // … du kan beholde din eksisterende logged-in footer …
    return (
      <footer className="bg-[#0E1E34] text-white py-10">
        {/* … ditt logged-in oppsett … */}
      </footer>
    );
  }

  return (
    <footer className="bg-[#0E1E34] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-8 relative">
        {/* Logo */}
        <img src={logoHolidaze} alt="Holidaze" className="w-32 h-auto" />

        {/* Hvis ingen skjema aktivt: vis CTA-knapper */}
        <AnimatePresence>
          {active === "none" && (
            <motion.div
              key="cta"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <button
                onClick={() => setActive("login")}
                className="px-6 py-3 border border-white rounded-md hover:bg-white hover:text-[#0E1E34] transition text-white"
              >
                Log in
              </button>
              <button
                onClick={() => setActive("register")}
                className="px-6 py-3 bg-white text-[#0E1E34] rounded-md hover:bg-gray-100 transition"
              >
                Sign up
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login- eller Register‐skjema */}
        <AnimatePresence>
          {active !== "none" && (
            <motion.div
              key={active}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="w-full sm:w-80 bg-white p-6 rounded-lg shadow-lg text-gray-900"
            >
              {/* Lukk‐X */}
              <button
                onClick={handleClose}
                className="float-right text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {active === "login" && <LoginForm />}
              {active === "register" && <RegisterForm />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copyright */}
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
