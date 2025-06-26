import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/ProductDetail.css";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("authToken");
  const numericId = Number(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${numericId}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [numericId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews/products/${numericId}`);
        if (!response.ok) throw new Error("Could not fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("❌ Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [numericId]);

  if (loading) return <div className="product-detail-loading">Loading...</div>;
  if (error) return <div className="product-detail-error">{error}</div>;
  if (!product) return null;

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleOrderButton = async () => {
    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }
    const orderDate = new Date().toISOString().split('T')[0];
    const note = `Order for product: ${product.title}`;
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: orderDate,
          note,
          product_id: Number(product.id),
        }),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        navigate('/account');
      } else {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to create order");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-main">
        <div className="product-detail-image-wrapper">
          <img
            src={product.image_url}
            alt={product.title}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-price">${product.price}</div>
          <p className="product-detail-description">{product.description}</p>
          <button className="product-detail-buy-btn" onClick={handleOrderButton}>Order Now</button>
        </div>
      </div>
      <div className="product-detail-reviews-section">
        <h2>Latest Reviews</h2>
        <ReviewList reviews={reviews} />
          <ReviewForm
            productId={numericId}
            token={token}
            onReviewAdded={handleReviewAdded}
          />
      </div>
    </div>
  );
};

export default ProductDetail;
