import React, { useState, useEffect } from "react";
import axios from "axios";
import {NavLink, useNavigate } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bukuresep-api.vercel.app/category/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddNewCategory = () => {
    navigate("/categories/create");
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
                 
                    <NavLink to = {`/categories/update/${category._id}`} className = "btn btn-warning btn-sm me-2 mr-2">Ubah</NavLink> &nbsp;
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
