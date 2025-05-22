import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import holidazeLogo from "../../assets/holidazeLogo.png";
import { User } from "lucide-react";
import AuthDropdown from "../Auth/AuthDropdown";
import UserDropdown from "./UserDropDown";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

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

  useEffect(() => {
    if (isLoggedIn) {
      setIsDropdownOpen(false);
    }
  }, [isLoggedIn]);

  return (
    <header className="bg-white shadow-sm w-full">
      <nav className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3 relative">
        <div className="flex items-center gap-1">
          <img src={holidazeLogo} alt="Holidaze Logo" className="h-7 w-auto" />
          <Link to="/" className="text-base font-small text-[#0E1E34]">
            holidaze
          </Link>
        </div>

        <div className="flex items-center gap-3 relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="bg-[#0E1E34] text-white p-2 rounded-full hover:bg-[#182944] transition"
          >
            <User className="h-6 w-auto" />
          </button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute top-12 right-0 z-50">
              {isLoggedIn ? (
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
