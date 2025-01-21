import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateRecipe() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState({
    namaResep: "",
    bahan: "",
    instruksi: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    Axios.get("https://bukuresep-api.vercel.app/category")
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Failed to fetch categories: " + error.message));

    
    Axios.get(`https://bukuresep-api.vercel.app/recipe/${id}`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((error) => alert("Failed to fetch recipe: " + error.message));
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put(`https://bukuresep-api.vercel.app/recipe/${id}`, recipe)
      .then(() => {
        alert("Recipe updated successfully!");
        navigate("/recipe");
      })
      .catch((error) => alert("Failed to update recipe: " + error.message));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaResep" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            id="namaResep"
            name="namaResep"
            className="form-control"
            placeholder="Enter recipe name"
            value={recipe.namaResep}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Category</label>
          <select
            id="categoryId"
            name="categoryId"
            className="form-control"
            value={recipe.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="bahan" className="form-label">
            Ingredients
          </label>
          <textarea
            id="bahan"
            name="bahan"
            className="form-control"
            placeholder="Enter ingredients"
            rows="3"
            value={recipe.bahan}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="instruksi" className="form-label">
            Instructions
          </label>
          <textarea
            id="instruksi"
            name="instruksi"
            className="form-control"
            placeholder="Enter instructions"
            rows="5"
            value={recipe.instruksi}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary mr-2">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/recipe")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateRecipe;
