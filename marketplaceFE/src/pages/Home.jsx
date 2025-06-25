import React from 'react';
import Hero from '../components/home/Hero';
import BraggingSection from '../components/home/BraggingSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <BraggingSection />
      <FeaturedProducts />
      {/* We'll add other sections here later:
        - About Section
        - Newsletter/Join Club Section */}
    </div>
  );
};

export default Home; 