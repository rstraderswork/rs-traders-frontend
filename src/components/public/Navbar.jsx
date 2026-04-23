import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="navbar">
      {/* LOGO */}
      <Link to="/" className="logo">RS TRADERS</Link>

      {/* CENTER NAV */}
      <div className="nav-center">
        <Link to="/">HOME</Link>
        <Link to="/products">PRODUCTS</Link>
        <Link to="/booking">BOOKING</Link>
        <a href="#contact">CONTACT</a> {/* keep anchor if it's same page */}
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-right">
        {/* CALL BUTTON */}
        <button
          className="call-btn"
          onClick={() => (window.location.href = "tel:+919906353768")}
        >
          ☎️ CALL
        </button>

        {/* ADMIN */}
        <div className="admin-container">
          <div
            className={`admin-icon ${adminOpen ? "active" : ""}`}
            onClick={() => setAdminOpen(!adminOpen)}
          >
            🔐
          </div>

          <div className="admin-dropdown">
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/admin/dashboard">Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}