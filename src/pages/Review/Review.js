import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Review() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://bukuresep-api.vercel.app/review")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        alert("Failed to load reviews.");
      });
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`https://bukuresep-api.vercel.app/review/delete/${id}`)
      .then(() => {
        alert("Review deleted successfully!");
        setReviews(reviews.filter((review) => review._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete the review.");
      });
  };

  const handleAddReview = (id) => {
    navigate('/review/create');
  };

  return (
    <div className="container mt-5">
      <h1>Reviews</h1>
      <button className="btn btn-primary mb-3" onClick={handleAddReview}>
        + Add Review
      </button>
      <div className="row">
        {reviews.map((review) => (
          <div key={review._id} className="col-md-4 mb-4">
            <div className="card bg-light">
              <div className="card-header">{review.recipeId.namaResep}</div>
              <div className="card-body">
                <h5 className="card-title">Review</h5>
                <p className="card-text">
                  <strong>Rating:</strong> {review.rating}
                  <br />
                  <strong>Comment:</strong> {review.comment || "No comment"}
                </p>
                <button
                  className="btn btn-warning me-2 mr-2"
                  onClick={() => navigate(`/review/update/${review._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(review._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
