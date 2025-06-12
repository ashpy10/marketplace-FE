import React from 'react';
import Hero from '../components/home/Hero';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      {/* We'll add other sections here later:
        - Featured Products
        - Reviews */}
    </div>
  );
};

export default Home; 