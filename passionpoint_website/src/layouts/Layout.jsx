// src/layouts/Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";


const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden text-black">
      {/* Aurora background */}
      <div className="aurora-bg"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">{children}</main>

    </div>
  );
};

export default Layout;

