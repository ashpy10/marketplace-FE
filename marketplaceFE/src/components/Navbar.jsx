import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="https://res.cloudinary.com/daw3nco1o/image/upload/v1749678614/logo-black.png" alt="Sauciety Logo" className="nav-logo" />
        </NavLink>
        
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Our Sauces</NavLink>
                    
                    {!token ? (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Login
            </NavLink>
          ) : (
            <NavLink to="/account" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              My Account
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 