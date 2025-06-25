import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/home/Hero.css';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Caught You Looking</h1>
          <p className="hero-subtitle">Craft Heat for Brave Palates</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">SHOP NOW</Link>
            <Link to="/login" className="btn btn-secondary">JOIN THE CLUB</Link>
          </div>
        </div>
        <div className={`hero-image ${isLoading ? 'loading' : ''}`}>
          <img 
            src="https://res.cloudinary.com/daw3nco1o/image/upload/v1749678628/hero_video.gif" 
            alt="Hot Sauce Bottle Animation" 
            onLoad={() => setIsLoading(false)}
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 