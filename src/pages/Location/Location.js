import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Location() {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://asetvia-oktaaaas-projects.vercel.app/location"
      );
      setLocations(response.data);
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
      setLocations(locations.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddNewCategory = () => {
    navigate("/categories/create");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Locations</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddNewCategory}>
        Add New Location
      </button>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Location Name</th>
            <th>Space Name and Code</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.length > 0 ? (
            locations.map((location, index) => (
              <tr key={location._id}>
                <td>{index + 1}</td>
                <td>{location.name}</td>
                <td>{location.spaceNameAndCode}</td>
                <td>
                  {location.image ? (
                    <img
                      src={`https://asetvia-oktaaaas-projects.vercel.app${location.image}`}
                      alt={location.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  <NavLink
                    to={`/categories/update/${location._id}`}
                    className="btn btn-warning btn-sm me-2 mr-2"
                  >
                    Ubah
                  </NavLink>{" "}
                  &nbsp;
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(location._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No location available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Location;
