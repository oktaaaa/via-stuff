import React, { useState, useEffect } from "react";
import axios from "axios";

function Category() {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bukuresep-api.vercel.app/category/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Handle Add New Category action (for demonstration)
  const handleAddNewCategory = () => {
    // Logic for adding a new category can be implemented here
    alert("Add New Category clicked!");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Categories</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddNewCategory}>
        Add New Category
      </button>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.categoryName}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2 mr-2"
                    onClick={() => alert(`Edit ${category.categoryName}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No categories available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Category;
