import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCategory() {
  const [categoryName, setCategoryName] = useState({
    categoryName: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategoryName({ ...categoryName, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://bukuresep-api.vercel.app/category/create", categoryName)
      .then(() => {
        alert("Category saved successfully!");
        navigate("/categories");
      })
      .catch((error) => alert("Failed to save recipe: " + error.message));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tambah Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaResep" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            className="form-control"
            placeholder="Tambah category"
            value={categoryName.categoryName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary mr-2">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/categories")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;