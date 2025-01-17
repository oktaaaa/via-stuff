import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const User = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, name) => {
    const value = e.target.value;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Axios.post("https://bukuresep-api.vercel.app/auth/login", login).then(
        (res) => {
          let { token } = res.data;
          Cookies.set("token", token);
         
          window.location.href = "/recipe";
        }
      );
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={login.email}
            onChange={(e) => handleChange(e, "email")}
            className="form-control"
            placeholder="Input Email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={login.password}
            onChange={(e) => handleChange(e, "password")}
            className="form-control"
            placeholder="Input Password"
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-ptimary">
          Login
        </button>
      </form>
    </>
  );
};
export default User;
