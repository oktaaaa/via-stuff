import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import User from "./pages/User";
import Recipe from "./pages/Recipe";
import Category from "./pages/Category";
import Review from "./pages/Review";

function App() {
  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <div>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>{" "}
          | <Link to="/recipes">Recipes</Link> |{" "}
          <Link to="/categories">Categories</Link>
        </nav>

        <Routes>
          {/* Redirect user to recipes page if they are already logged in */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/recipes" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<User isLogin={true} />} />
          <Route path="/register" element={<User isLogin={false} />} />
          <Route
            path="/recipes"
            element={isLoggedIn ? <Recipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories"
            element={isLoggedIn ? <Category /> : <Navigate to="/login" />}
          />
          <Route
            path="/reviews"
            element={isLoggedIn ? <Review /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
