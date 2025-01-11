import React, { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:3000/category");
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.category_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Category;
