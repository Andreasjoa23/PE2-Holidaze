import { Link } from "react-router-dom";
import Cute from "../assets/Cute.jpg"

const Navbar = () => {
  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
        <div>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img src={Cute} alt="Holidaze Logo" height={30} />
            <span>holidaze</span>
          </Link>
        </div>

        <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }}>
          <li>
            <Link to="/venues">Booking</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>

        <div>
          <Link to="/profile">
            <img
              src="https://img.icons8.com/ios-filled/50/user.png"
              alt="Profile"
              style={{ height: "30px", borderRadius: "50%" }}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
