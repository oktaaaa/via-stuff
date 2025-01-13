import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    namaResep: "",
    bahan: "",
    instruksi: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e, name) => {
    const value = e.target.value;
    setRecipe({ ...recipe, [name]: value });
  };

  React.useEffect(() => {
    Axios.get("https://bukuresep-api.vercel.app/category")
      .then((res) => {
        const { data } = res;
        setCategories(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", recipe); // Debugging payload
    try {
      Axios.post("https://bukuresep-api.vercel.app/recipe/create", recipe).then(
        (res) => {
          console.log("Response:", res.data); // Check server response
          alert("berhasil disimpan");
          navigate("/recipe");
        }
      );
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to save the recipe.");
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form>
        <input
          name="namaResep"
          placeholder="Recipe Name"
          value={recipe.namaResep}
          onChange={(e) => handleChange(e, "namaResep")}
          required
        />
        <textarea
          name="bahan"
          placeholder="bahan"
          value={recipe.bahan}
          onChange={(e) => handleChange(e, "bahan")}
          required
        />
        <textarea
          name="instruksi"
          placeholder="instruksi"
          value={recipe.instruksi}
          onChange={(e) => handleChange(e, "instruksi")}
          required
        />
        <select
          name="categoryId"
          value={recipe.categoryId}
          onChange={(e) => handleChange(e, "categoryId")}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
