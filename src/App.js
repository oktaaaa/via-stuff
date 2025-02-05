import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import User from "./pages/User";
import Skincare from "./pages/Skincare/Skincare";


import SkincareCreate from "./pages/Skincare/CreateSkincare";
import CreateLocation from "./pages/Location/CreateLocation";
import Location from "./pages/Location/Location";
import UpdateLocation from "./pages/Location/UpdateLocation";
import UpdateRecipe from "./pages/Skincare/UpdateSkincare";
import Dashboard from "./pages/Dashboard";
import SkincareUpdate from "./pages/Skincare/UpdateSkincare";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

 
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
     
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Via Stuff
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/skincare">
                        Skincare
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/location">
                        Location
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button
                        className="btn btn-link nav-link"
                        onClick={() => {
                         
                          Cookies.remove("token");
                          setIsLoggedIn(false); 
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
               
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                
              </ul>
            </div>
          </div>
        </nav>

     
        {error && <div className="alert alert-danger">{error}</div>}

       
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard />
            }
          />
          <Route path="/login" element={<User isLogin={true} />} />
          <Route path="/register" element={<User isLogin={false} />} />
          <Route
            path="/skincare"
            element={<Skincare />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/location"
            element={<Location />}
          />
          {/* <Route
            path="/review"
            element={isLoggedIn ? <Review /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/skincare/create"
            element={<SkincareCreate />}
          />
          <Route
            path="/skincare/update/:id"
            element={<SkincareUpdate /> }
          />
          {/* <Route
            path="/review/create"
            element={isLoggedIn ? <CreateReview /> : <Navigate to="/login" />}
          /> */}
          <Route
            path="/categories/create"
            element={isLoggedIn ? <CreateLocation /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories/update/:id"
            element={isLoggedIn ? <UpdateLocation /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipe/update/:id"
            element={isLoggedIn ? <UpdateRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/review/update/:id"
            element={isLoggedIn ? <UpdateLocation /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
