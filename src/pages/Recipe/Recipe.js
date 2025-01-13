import React, { useState, useEffect } from "react";
import axios from "axios";

function Recipe() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const response = await axios.get("https://bukuresep-api.vercel.app/recipe");
    setRecipes(response.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            {recipe.namaResep} - {recipe.categoryId.categoryName}
            <h3>{recipe.bahan}</h3>
            <p>{recipe.instruksi}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipe;
