import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./header/Header";
import Footer from "./Footer";
import { isLoggedIn } from "../utils/isLoggedIn";

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
