import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/pages/ProductDetail.css";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
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
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      console.log("🧪 token =", token);
      console.log("➡️ About to fetch reviews for product", id);

      if (!token) return;
      try {
        const response = await fetch(`/api/products/${id}/reviews`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Could not fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id, token]);

  if (loading) return <div className="product-detail-loading">Loading...</div>;
  if (error) return <div className="product-detail-error">{error}</div>;
  if (!product) return null;

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
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
          <button className="product-detail-buy-btn">Buy Now</button>
        </div>
      </div>
      <div className="product-detail-reviews-section">
        <h2>Latest Reviews</h2>
        <ReviewList reviews={reviews} />
        {token && (
          <ReviewForm
            productId={id}
            token={token}
            onReviewAdded={handleReviewAdded}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
