import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/home/FeaturedProducts.css';

const products = [
  {
    name: 'Flannel Inferno',
    style: 'Cayenne-Maple Blend Hot Sauce',
    heat: '8/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749680718/flannel-inferno.png',
    bgColor: '#FDF0E1',
    buttonColor: '#D97706',
  },
  {
    name: 'Mildly Inappropriate',
    style: 'Jalapeño & Lime',
    heat: '5/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749678616/mildly-inappropriate.png',
    bgColor: '#E8F5E9',
    buttonColor: '#388E3C',
  },
  {
    name: 'Reapers Kiss',
    style: 'Carolina Reaper Hot Sauce',
    heat: '10/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749679268/reapers-kiss.png',
    bgColor: '#FBE9E7',
    buttonColor: '#D32F2F',
  },
  {
    name: 'Burnout Culture',
    style: 'Garlic & Scorpion Pepper',
    heat: '9/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749748312/burnout-culture.png',
    bgColor: '#ECEFF1',
    buttonColor: '#546E7A',
  },
];

const FeaturedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const currentProduct = products[currentIndex];

  return (
    <section className="featured-products-carousel" style={{ backgroundColor: currentProduct.bgColor }}>
      <h2 className="section-title">FEATURED SAUCES</h2>
      <div className="carousel-container">
        <button onClick={goToPrevious} className="carousel-arrow prev">
          &#10094;
        </button>
        <div className="product-display">
          <div className="product-info-carousel">
            <h3>{currentProduct.name}</h3>
            <p className="product-style">{currentProduct.style}</p>
            <p className="product-heat">Heat Level: <strong>{currentProduct.heat}</strong></p>
            <Link 
              to={`/products/${currentProduct.name.toLowerCase().replace(/ /g, '-')}`} 
              className="btn-learn-more"
              style={{ backgroundColor: currentProduct.buttonColor }}
            >
              LEARN MORE
            </Link>
          </div>
          <div className="product-image-container-carousel">
            <img src={currentProduct.imageUrl} alt={currentProduct.name} />
          </div>
        </div>
        <button onClick={goToNext} className="carousel-arrow next">
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts; 