import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/OurSauces.css';

const OurSauces = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="our-sauces-loading">Loading...</div>;
  if (error) return <div className="our-sauces-error">{error}</div>;

  return (
    <div className="our-sauces-container">
      <h1 className="our-sauces-title">Our Sauces</h1>
      <div className="our-sauces-grid">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="sauce-card-link">
            <div className="sauce-card">
              <div className="sauce-image-wrapper">
                <img src={product.image_url} alt={product.title} className="sauce-image" />
              </div>
              <h2 className="sauce-title">{product.title}</h2>
              <div className="sauce-price">${product.price}</div>
              <p className="sauce-description">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OurSauces; 