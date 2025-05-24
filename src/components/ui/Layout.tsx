import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../header/Header";
import Footer from "./Footer";
import { isLoggedIn } from "../../utils/isLoggedIn";

/**
 * The main layout component for the application.
 * It includes the Navbar at the top, a dynamic content area (`Outlet`),
 * and the Footer which adapts based on login status.
 *
 * @returns React functional component
 */
const Layout: React.FC = () => {
  const loggedIn = isLoggedIn();

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer isLoggedIn={loggedIn} />
    </>
  );
};

export default Layout;
