import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateReview() {
  const { id } = useParams();
  const [review, setReview] = useState({
    comment: "",
    rating: "",
    recipeId: "",
  });
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://bukuresep-api.vercel.app/recipe")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        alert("Failed to load recipes.");
      });

    Axios.get(`https://bukuresep-api.vercel.app/review/${id}`)
      .then((res) => {
        setReview(res.data);
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
        alert("Failed to load review.");
      });
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`https://bukuresep-api.vercel.app/review/${id}`, review)
      .then(() => {
        alert("Review updated successfully!");
        navigate("/review");
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        alert("Failed to update the review.");
      });
  };

  return (
    <div className="container mt-5">
      <h1>Update Review</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            Review Text
          </label>
          <textarea
            type="text"
            className="form-control"
            name="comment"
            placeholder="Review Text"
            value={review.comment}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">
            Rating (1-5)
          </label>
          <input
            id="rating"
            type="number"
            className="form-control"
            name="rating"
            placeholder="Rating (1-5)"
            value={review.rating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>
            Select Recipe
          </label>
          <select
            id="recipeId"
            name="recipeId"
            className="form-control"
            value={review.recipeId}
            onChange={handleChange}
            required
          >
            <option value="">Select Recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe._id} value={recipe._id}>
                {recipe.namaResep}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateReview;
