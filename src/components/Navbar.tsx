import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import holidazeLogo from "../assets/holidazeLogo.png";
import { Search, User } from "lucide-react";
import AuthDropdown from "./Auth/AuthDropdown";
import { logout } from "../utils/auth";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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
        <div className="flex items-center gap-2">
          <img src={holidazeLogo} alt="Holidaze Logo" className="h-10 w-auto" />
          <Link to="/" className="text-m font-medium text-blue-900">
            holidaze
          </Link>
        </div>

        <div className="flex items-center gap-3 relative">
          <button className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition">
            <Search className="h-6 w-auto" />
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800 transition text-sm"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition"
            >
              <User className="h-6 w-auto" />
            </button>
          )}

          {!isLoggedIn && isDropdownOpen && (
            <div ref={dropdownRef} className="absolute top-12 right-0 z-50">
              <AuthDropdown />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
