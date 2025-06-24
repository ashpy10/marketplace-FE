import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/home/FeaturedProducts.css';

const products = [
  {
    id: 6,
    name: 'Flannel Inferno',
    style: 'Cayenne-Maple Blend Hot Sauce',
    heat: '8/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749680718/flannel-inferno.png',
    bgColor: '#F69D1B',
    buttonColor: '#ffffff',
  },
  {
    id: 2,
    name: 'Mildly Inappropriate',
    style: 'Jalapeño & Lime',
    heat: '5/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749678616/mildly-inappropriate.png',
    bgColor: '#C6C545',
    buttonColor: '#ffffff',
  },
  {
    id: 4,
    name: 'Reapers Kiss',
    style: 'Carolina Reaper Hot Sauce',
    heat: '10/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749679268/reapers-kiss.png',
    bgColor: '#E20704',
    buttonColor: '#ffffff',
  },
  {
    id: 7,
    name: 'Burnout Culture',
    style: 'Garlic & Scorpion Pepper',
    heat: '9/10',
    imageUrl: 'https://res.cloudinary.com/daw3nco1o/image/upload/v1749748312/burnout-culture.png',
    bgColor: '#167474',
    buttonColor: '#ffffff',
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
          <div className="product-image-title-container">
            <div className="product-title-overlay">{currentProduct.name}</div>
            <div className="product-image-container-carousel">
              <img src={currentProduct.imageUrl} alt={currentProduct.name} />
              <Link 
                to={`/products/${currentProduct.id}`} 
                className="btn-learn-more"
                style={{ backgroundColor: currentProduct.buttonColor }}
              >
                LEARN MORE
              </Link>
            </div>
          </div>
          <div className="vertical-bar"></div>
          <div className="product-supporting-info">
            <div>
              <div className="product-info-label">STYLE</div>
              <div className="product-info-value">{currentProduct.style}</div>
            </div>
            <div>
              <div className="product-info-label">HEAT</div>
              <div className="product-info-value">{currentProduct.heat}</div>
            </div>
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