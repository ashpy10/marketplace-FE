import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/home/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Caught You Looking</h1>
          <p className="hero-subtitle">Craft Heat for Brave Palates</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">SHOP NOW</Link>
            <Link to="/join" className="btn btn-secondary">JOIN THE CLUB</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/sauce-bottle.png" alt="Chow Wow Hot Sauce Bottle" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 