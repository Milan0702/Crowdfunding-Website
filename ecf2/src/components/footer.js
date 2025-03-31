import React from 'react';
import './footer.css'; // Import your CSS file for styling
import logo from "../assets/logo.png"

const Footer = () => {
  return (
    <footer className="footer" id="scroll4">
      <div className="footer-container">
        <div className="footer-section footer-logo-section">
          <img src={logo} alt="TeamTrees Logo" className="footer-logo" />
          <p className="footer-tagline">Plant trees, change lives.</p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fa fa-facebook-square"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fa fa-twitter-square"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <i className="fa fa-youtube-square"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section footer-links">
          <h3 className="footer-title">Quick Links</h3>
          <ul>
            <li><a href="#scrolltop">Home</a></li>
            <li><a href="#scroll1">Donate</a></li>
            <li><a href="#scroll2">Leaderboard</a></li>
            <li><a href="#scroll3">Projects</a></li>
          </ul>
        </div>
        
        <div className="footer-section footer-about">
          <h3 className="footer-title">About Us</h3>
          <p className="footer-text">Our team plants trees at various locations around the world. Each donation helps in our mission to restore forests and combat climate change.</p>
        </div>
        
        <div className="footer-section footer-contact">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-text">
            <i className="fa fa-envelope"></i> team@trees.com<br />
            <i className="fa fa-phone"></i> +91 1234567890<br />
            <i className="fa fa-map-marker"></i> Global Tree House, Green Street, Earth
          </p>
        </div>
      </div>
      
      <div className="copyright-container">
        <p className="copyright">&copy; {new Date().getFullYear()} #TEAM TREES. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
