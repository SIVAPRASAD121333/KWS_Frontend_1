import React from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import Footer from "./Footer.js";
import "./App.css"; // Assuming you have an App.css file for global styles
import image from "./logoiiits.png";
import Contacts from "./Contacts.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Corrected BrowserRouter
import TM from "./TM.js";

function App() {
  return (
    <Router> {/* Ensure there's only one Router at the top level */}
      <div>
        <header>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              paddingLeft: "300px",
            }}
          >
            {/* Example logo image; replace 'logoSrc' with your actual logo path */}
            <img
              src={image}
              alt="IIIT Sricity Logo"
              style={{ marginRight: "10px", height: "100px" }}
            />
            <h1 style={{ textAlign: "center", color: "#eb7434" }}>
              Indian Institute of Information Technology, Sri City, Chittoor
              <br></br>
              <span
                style={{ color: "Black", fontWeight: "bold", fontSize: "25px" }}
              >
                (An Institute of National Importance under an Act of Parliament)
              </span>
            </h1>
          </div>
          <Navbar />
        </header>
        
        {/* Define Routes here */}
        <Routes>
          <Route path="/" element={<MainContent />} /> {/* Home route */}
          <Route path="/contacts" element={<Contacts />} /> {/* Contacts route */}
          <Route path="/team-members" element={<TM />} /> {/* Contacts route */}


          {/* Add other routes here */}
        </Routes>

        
        <Footer />
      </div>
    </Router>  
  );
}

export default App;