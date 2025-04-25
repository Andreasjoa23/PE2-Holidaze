import { Link } from "react-router-dom";
import holidazeLogo from "../assets/holidazeLogo.png";
import { Search, User } from "lucide-react";

const Navbar = () => {
  return (
<header className="bg-white shadow-sm w-full">
<nav className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3">
    <div className="flex items-center gap-2">
      <img src={holidazeLogo} alt="Holidaze Logo" className="h-10 w-auto" />
      <Link
        to="/"
        className="text-m font-medium text-blue-90"
      >
        holidaze
      </Link>
    </div>

    <div className="flex items-center gap-3">
      <button className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition">
        <Search className="h-6 w-auto" />
      </button>
      <Link
        to="/login"
        className="bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition"
      >
        <User className="h-6 w-auto" />
      </Link>
    </div>
  </nav>
</header>

  );
};

export default Navbar;
