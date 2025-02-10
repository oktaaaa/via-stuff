import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateLocation() {
  const [location, setLocation] = useState({
    name: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", location.name);
    formData.append("image", location.image);

    Axios.post(
      "https://asetvia-oktaaaas-projects.vercel.app/location/add-location",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
      .then(() => {
        alert("Location saved successfully!");
        navigate("/location");
      })
      .catch((error) => alert("Failed to save category: " + error.message));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Tambah Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaResep" className="form-label">
            Recipe Name
          </label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            className="form-control"
            placeholder="Tambah category"
            value={location.name}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) =>
              setLocation({ ...location, image: e.target.files[0] })
            }
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary mr-2">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/location")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLocation;
