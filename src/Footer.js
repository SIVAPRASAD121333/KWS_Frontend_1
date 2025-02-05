import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="container">

      
      
      <h1 style={{ textAlign: "center",color:"#eb7434",fontSize: "20px" }}>
            
            Indian Institute of Information Technology, Sri City, Chittoor
            <br></br>
            <span style={{ color: "Black" , fontWeight: "normal",fontSize: "16px" }}>
            630, Gnan Marg, Sri City - 517 646, AP, India
            <br/>
            Visit Website: <a href="https://www.iiits.ac.in/" target="_blank" style={{ color: "blue" }}>www.iiits.ac.in/</a>
      
            <br/>
            Email: <a href="mailto:research.office@iiits.in" style={{ color: "blue" }}>research.office@iiits.in</a>
            </span>
            </h1>

      
      <small>
        <h4>
      <a href="/privacy-policy">. Privacy Policy</a>
      <a href="/terms-of-use"> . Terms of Use</a>
      </h4>
         
      </small>
    </footer>
  );
}

export default Footer;
