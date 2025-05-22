import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "../../utils/logout";
import logoHolidaze from "../assets/logoHolidazeBlue.png";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { LogOut } from "lucide-react";

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

  if (isLoggedIn) {
    return (
      <footer className="bg-[#0E1E34] text-white py-20 px-10">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-20">
          <div className="flex-shrink-0">
            <img
              src={logoHolidaze}
              alt="Holidaze logo"
              className="h-40 w-auto"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-20 text-3xl font-extrabold">
            <Link to="/profile" className="hover:text-gray-300 transition">
              Profile
            </Link>
            <a
              href="mailto:support@holidaze.com"
              className="hover:text-gray-300 transition"
            >
              Contact us
            </a>
            <Link to="/faq" className="hover:text-gray-300 transition">
              FAQ
            </Link>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={logout}
              className="px-8 py-4 rounded-full border-2 border-white text-white text-2xl font-bold flex items-center gap-3 hover:bg-white hover:text-[#0E1E34] hover:shadow-lg transition duration-200"
            >
              <LogOut className="w-6 h-6" />
              Log out
            </button>
          </div>
        </div>

        <p className="text-center text-xl text-white/70 font-medium mt-14">
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </p>
      </footer>
    );
  }

  return (
    <footer className="bg-[#0E1E34] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-8 relative">
        <img src={logoHolidaze} alt="Holidaze logo" className="w-32" />

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
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              {active === "login" && <LoginForm />}
              {active === "register" && <RegisterForm />}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} Holidaze. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
