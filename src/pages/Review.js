import React, { useState } from "react";
import axios from "axios";

function Review() {
  const [recipeId, setRecipeId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/reviews",
      { recipe_id: recipeId, rating, comment },
      {
        headers: { Authorization: token },
      }
    );
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe ID"
          onChange={(e) => setRecipeId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          onChange={(e) => setRating(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Review;
