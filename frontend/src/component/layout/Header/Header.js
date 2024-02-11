import React, { useState, useEffect } from 'react';
import { GrCart } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
import { FaBars, FaRegHeart, FaShoppingCart, FaUser, FaTimes, FaSearch } from 'react-icons/fa';
import logo from '../../../images/logo.png'; // Update the path based on your project structure
import './header.css'; // Use the correct filename for your CSS file
import Ticker from './slideText';


const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 400);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const iconSize = isMobile ? 18 : 24; // Define the size based on the device type

  return (
    <div>
    <Ticker />
    <div className="navbar">
      <div className="left-section">
        <div className="hamburger-icon" onClick={toggleNav}>
          <FaBars size={iconSize} />
        </div>
        <img
          src={logo}
          alt="Logo"
          className={`logo ${isMobile ? 'mobile-logo' : ''}`}
        />
      </div>

      <div className={`drawer ${isNavOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="close-icon" onClick={() => setIsNavOpen(false)}>
            <FaTimes />
          </div>
        </div>
        {/* Drawer content goes here */}
        <div className="drawer-content">
          <div className="nav-link">Home</div>
          <div className="nav-link"><a href="/products">Products</a></div>
          <div className="nav-link"><a href="/search">Search</a></div>
          <div className="nav-link">About</div>
          {/* Add more links as needed */}
        </div>
      </div>

      {!isMobile? 
        <div className="search-bar">
          <div className="search-icon">
            <FaSearch />
          </div>
          <input type="text" placeholder="Search..." />
        </div>
        : <></>
      }
      <div className="right-section">
        {isMobile && (
          <div className="icon">
            <a href="/search"><IoSearch size={iconSize} /></a>
          </div>
        )}
        <div className="icon">
          <FaRegHeart size={iconSize} />
        </div>
        <div className="icon">
          <GrCart size={iconSize} />
        </div>

        {/* Render profile icon only for screens larger than 768px */}
        {!isMobile && (
          <div className="icon">
            <FaUser size={iconSize} />
          </div>
        )}

      </div>
    </div>
    </div>
  );
};

export default Navbar;
