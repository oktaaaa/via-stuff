import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [form, setForm] = useState({
    name: "",
    bahan: "",
    instruksi: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://bukuresep-api.vercel.app/category"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://bukuresep-api.vercel.app/recipe/create", form);
      navigate("/recipe"); // Navigate back to the recipe list
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="namaResep"
          placeholder="Recipe Name"
          value={form.namaResep}
          onChange={handleChange}
          required
        />
        <textarea
          name="bahan"
          placeholder="bahan"
          value={form.bahan}
          onChange={handleChange}
          required
        />
        <textarea
          name="instruksi"
          placeholder="instruksi"
          value={form.instruksi}
          onChange={handleChange}
          required
        />
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
