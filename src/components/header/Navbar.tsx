import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import holidazeLogo from "../../assets/holidazeLogo.png";
import { User } from "lucide-react";
import AuthDropdown from "../Auth/AuthDropdown";
import UserDropdown from "./UserDropDown";
import { isLoggedIn } from "../../utils/isLoggedIn";

/**
 * The site-wide top navigation bar.
 * Includes a logo, profile button, and a dynamic dropdown based on auth state.
 */
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const loggedIn = isLoggedIn();

  /**
   * Closes the dropdown if the user clicks outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * Automatically closes dropdown when a user logs in.
   */
  useEffect(() => {
    if (loggedIn) {
      setIsDropdownOpen(false);
    }
  }, [loggedIn]);

  return (
    <header className="bg-white shadow-sm w-full">
      <nav className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3 relative">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <Link to="/" className="flex items-center gap-1 hover:opacity-80 transition">
            <img src={holidazeLogo} alt="Holidaze Logo" className="h-7 w-auto" />
            <span className="text-base font-small text-[#0E1E34]">holidaze</span>
          </Link>
        </div>

        {/* Profile / Auth icon & dropdown */}
        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="bg-[#0E1E34] text-white p-2 rounded-full hover:bg-[#182944] transition"
            aria-label="User menu"
          >
            <User className="h-6 w-auto" />
          </button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute top-12 right-0 z-50">
              {loggedIn ? (
                <UserDropdown onClose={() => setIsDropdownOpen(false)} />
              ) : (
                <AuthDropdown onClose={() => setIsDropdownOpen(false)} />
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
