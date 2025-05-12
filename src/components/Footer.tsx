// src/components/Footer.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../utils/auth";
import logoHolidaze from "../assets/logoHolidazeBlue.png";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";

interface FooterProps {
  isLoggedIn: boolean;
}

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const Footer: React.FC<FooterProps> = ({ isLoggedIn }) => {
  const [active, setActive] = useState<"none" | "login" | "register">("none");

  const handleClose = () => setActive("none");

  // --- Logged in footer ---
  if (isLoggedIn) {
    return (
      <footer className="bg-[#0E1E34] text-white py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-start justify-between gap-8">
          {/* Logo */}
          <div>
            <img src={logoHolidaze} alt="Holidaze logo" className="w-32" />
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Account</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/profile" className="hover:underline">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:underline">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@holidaze.com"
                  className="hover:underline"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Actions</h4>
            <button
              onClick={logout}
              className="px-6 py-3 bg-white text-[#0E1E34] rounded-full hover:bg-gray-100 transition text-sm"
            >
              Log out
            </button>
          </div>
        </div>
        <p className="text-center text-gray-300 text-sm mt-8">
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </p>
      </footer>
    );
  }

  // --- Logged out footer ---
  return (
    <footer className="bg-[#0E1E34] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-8 relative">
        {/* Logo */}
        <img src={logoHolidaze} alt="Holidaze logo" className="w-32" />

        {/* CTA-buttons */}
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
                className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-[#0E1E34] transition text-white"
              >
                Log in
              </button>
              <button
                onClick={() => setActive("register")}
                className="px-6 py-3 bg-white text-[#0E1E34] rounded-full hover:bg-gray-100 transition text-sm"
              >
                Sign up
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login/Register form */}
        <AnimatePresence>
          {active !== "none" && (
            <motion.div
              key={active}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="w-full sm:w-80 bg-white p-6 rounded-lg shadow-lg text-gray-900 relative"
            >
              {/* Close X */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
