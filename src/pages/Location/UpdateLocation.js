import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

function UpdateLocation() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`https://bukuresep-api.vercel.app/category/${id}`)
      .then((res) => {
        const { data } = res;
        setCategoryName(data.categoryName);
      })
      .catch((error) => {
        alert("Failed to fetch category details: " + error.message);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`https://bukuresep-api.vercel.app/category/${id}`, {
      categoryName,
    })
      .then(() => {
        alert("Category updated successfully!");
        navigate("/categories"); 
      })
      .catch((error) => {
        alert("Failed to update category: " + error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Update Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate("/categories")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateLocation;
