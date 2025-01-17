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

  const handleEdit = (id) => {
    navigate(`/review/edit/${id}`);
  };

  return (
    <div className="container mt-5">
      <h1>Reviews</h1>
      <div className="card-deck">
        {reviews.map((review) => (
          <div key={review._id} className="card bg-light mb-3">
            <div className="card-header">{review.recipeId.namaResep}</div>
            <div className="card-body">
              <h5 className="card-title">Review</h5>
              <p className="card-text">
              Rating: {review.rating} <tr/>
              {review.comment}
              </p>
              <button className="btn btn-warning me-2 mr-3">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </div>
            
          </div>
        ))}

        
      </div>

    
    </div>
  );
}

export default Review;
