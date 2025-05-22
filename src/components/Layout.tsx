import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./header/Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Layout;
