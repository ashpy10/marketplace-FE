import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews?.length) return <p>No reviews yet.</p>;

  return (
    <div className="review-list">
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>Rating:</strong> {review.rating} <br />
            <em>{review.comment}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
