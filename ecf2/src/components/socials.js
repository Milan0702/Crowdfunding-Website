// TeamTreesSocial.js
import React from 'react';
import './socials.css'; // Import CSS file for styling
import instagram from "../assets/instagram.png"
import facebook from "../assets/facebook.png"
import linkedin from "../assets/linkedin.png"
import twitter from "../assets/twitter.png"
const TeamTreesSocial = () => {
  return (
    <div className="team-trees-social" id='scroll4'>
      <div className="content">
        <h1>#TEAMTREES SOCIAL</h1>
        <div className="social-section">
      <a href="https://instagram.com" target='_blank'>
        <img src={instagram} alt="Instagram" width="20%" height="20%" />
      </a>
      <a href="https://facebook.com" target='_blank'>
        <img src={facebook} alt="Facebook" width="20%" height="20%"/>
      </a>
      <a href="https://twitter.com" target='_blank'>
        <img src={twitter} alt="Twitter" width="20%" height="20%" />
      </a>
      <a href="https://linkedin.com" >
        <img src={linkedin} alt="LinkedIn" width="20%" height="20%"/>
      </a>
      {/* Add more social media links and icons as needed */}
    </div>
        {/* Add your social content here */}
      </div>
    </div>
  );
};

export default TeamTreesSocial;
