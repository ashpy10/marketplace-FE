import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo-black.png" alt="Sauciety Logo" className="nav-logo" />
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Our Sauces</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/account" className="nav-link">My Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 