import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  // Fetch recipes from the API
  const fetchRecipes = async () => {
    try {
      const response = await Axios.get(
        "https://bukuresep-api.vercel.app/recipe"
      );
      setRecipes(response.data);
    } catch (error) {
      alert("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handle delete action
  const handleDelete = async (id, name) => {
    if (
      window.confirm(`Are you sure you want to delete the recipe: ${name}?`)
    ) {
      try {
        await Axios.delete(`https://bukuresep-api.vercel.app/recipe/${id}`);
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
      } catch (error) {
        alert("Error deleting recipe:", error);
      }
    }
  };

  // Navigate to create recipe page
  const handleAddNewRecipe = () => {
    navigate("/recipe/create");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Recipe List</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddNewRecipe}>
        + Add New Recipe
      </button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Recipe Name</th>
            <th>Category</th>
            <th>Ingredients</th>
            <th>Instructions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <tr key={recipe._id}>
                <td>{index + 1}</td>
                <td>{recipe.namaResep}</td>
                <td>
                  {typeof recipe.categoryId === "object"
                    ? recipe.categoryId.categoryName // Adjust based on your API response
                    : recipe.categoryId}
                </td>
                <td>{recipe.bahan}</td>
                <td>{recipe.instruksi}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2 mr-2"
                    onClick={() => navigate(`/recipe/edit/${recipe._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(recipe._id, recipe.namaResep)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No recipes available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recipe;
