import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function User({ isLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const userData = isLogin
      ? { email: form.email, password: form.password }
      : { username: form.username, email: form.email, password: form.password };

    // Check for empty fields if it's registration and username is required
    if (!isLogin && !form.username) {
      setError("Username is required");
      return;
    }

    try {
      const response = await axios.post(
        "https://bukuresep-api.vercel.app/auth/login",
        userData
      );

      if (response.data.token) {
        navigate("/recipe");
      }
    } catch (error) {
      setError(error.response?.data.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => navigate(isLogin ? "/register" : "/login")}>
        {isLogin ? "Create an Account" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default User;
