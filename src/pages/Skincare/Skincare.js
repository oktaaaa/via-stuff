import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const [skincares, setSkincares] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchSkincare = async () => {
    try {
      const response = await Axios.get(
        "https://asetvia-oktaaaas-projects.vercel.app/skincare"
      );
      setSkincares(response.data);
    } catch (error) {
      alert("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchSkincare();
  }, []);

  // Handle delete action
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete: ${name}?`)) {
      try {
        await Axios.delete(`https://asetvia-oktaaaas-projects.vercel.app/skincare/${id}`);
        setSkincares(skincares.filter((skincare) => skincare._id !== id));
      } catch (error) {
        alert("Error deleting recipe:", error);
      }
    }
  };

  const handleAddNewSkincare = () => {
    navigate("/skincare/create");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Skincare List</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddNewSkincare}>
        + Add New Skincare
      </button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Skincare Name</th>
            <th>Type</th>
            <th>Expired Year</th>
            <th>Stock</th>
            
            <th>Position</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {skincares.length > 0 ? (
            skincares.map((skincare, index) => (
              <tr key={skincare._id}>
                <td>{index + 1}</td>
                <td>{skincare.name}</td>

                <td>{skincare.type}</td>
                <td>
                  {new Date(skincare.expiredYear).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </td>
                <td>{skincare.stock}</td>
                
                <td>{skincare.position}</td>
                <td>{skincare.review}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2 mr-2"
                    onClick={() => navigate(`/skincare/update/${skincare._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(skincare._id, skincare.name)}
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
