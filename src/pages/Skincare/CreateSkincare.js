import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function SkincareCreate() {
  const [skincare, setSkincare] = useState({
    name: "",
    type: "",
    expiredYear: "",
    stock: "",
    amountLeft: "",
    uofmeasurement: "",
    position: "",
    review: "",
  });
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setSkincare({ ...skincare, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("https://asetvia-oktaaaas-projects.vercel.app/skincare/create", skincare)
      .then(() => {
        alert("Skincare saved successfully!");
        navigate("/skincare");
      })
      .catch((error) => alert("Failed to save recipe: " + error.message));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Add Skincare</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Skincare Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter Skincare name"
            value={skincare.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-control"
            placeholder="Enter type of Skincare "
            value={skincare.type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="expiredYear" className="form-label">
            Expired Year
          </label>
          <input
            type="month"
            id="expiredYear"
            name="expiredYear"
            className="form-control"
            placeholder="Enter Year"
            value={skincare.expiredYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            placeholder="Enter Year"
            value={skincare.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            className="form-control"
            placeholder="Enter Position"
            value={skincare.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="review" className="form-label">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            className="form-control"
            placeholder="Write review"
            rows="5"
            value={skincare.review}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary mr-2">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/skincare")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SkincareCreate;
