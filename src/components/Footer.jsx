import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling


export default function Footer() {

   


  return (

    <footer className='footer'>
      <div className="footer-section">
        <h3>DESIGN YOUR LIFE</h3>
        <h1>Get in the Know</h1>
        <p>Newspaper is dedicated to uncovering and showcasing the talents of tomorrow. We draw inspiration from a vibrant community of design enthusiasts, just like yourself!</p>
      </div>
      <div className="footer-section about">
        <h3>ABOUT NEWSPAPER</h3>
        <ul>
          <li><a>About Us</a></li>
          <li><a>Our Vision</a></li>
        </ul>
      </div>
      <div className="footer-section contact">
        <h3>CONTACT US</h3>
        <ul>
          <li><a>Advertise</a></li>
          <li><a>Editor's Column</a></li>
          <li><a>Email</a></li>
        </ul>
      </div>
    </footer>
  );
}