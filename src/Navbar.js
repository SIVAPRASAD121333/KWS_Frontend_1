import React from "react";
import { FaHome, FaLanguage, FaEnvelope, FaUsers } from "react-icons/fa"; // Example using react-icons
import "./Navbar.css"
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="container-fluid navbar">
      <ul>
        <li>
          <a href="/">
            <FaHome />
            Home
          </a>
        </li>
        <li>
          <a href="#">
            <FaLanguage />
          Input Language
          </a>
        </li>
        < li>
       <Link className="active" to="/team-members">
        <FaUsers /> Team Members
      </Link>
        </li>
        <li>
         <Link to="/contacts">
            <FaEnvelope />
            Contact us
            </Link>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navbar;
