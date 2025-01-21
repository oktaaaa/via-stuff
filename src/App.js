import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import User from "./pages/User";
import Recipe from "./pages/Recipe/Recipe";
import Category from "./pages/Category/Category";
import Review from "./pages/Review/Review";
import CreateRecipe from "./pages/Recipe/CreateRecipe";
import CreateCategory from "./pages/Category/CreateCategory";
import UpdateCategory from "./pages/Category/UpdateCategory";
import UpdateRecipe from "./pages/Recipe/UpdateRecipe";
import CreateReview from "./pages/Review/CreateReview";
import UpdateReview from "./pages/Review/UpdateReview";
function App() {
  // Check if the user is logged in by checking the token in localStorage
  const isLoggedIn = "https://bukuresep-api.vercel.app/auth/login";

  return (
    <Router>
      <div>
        {/* Bootstrap Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              RecipeApp
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
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/recipe">
                        Recipes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/review">
                        Reviews
                      </Link>
                    </li>
                  </>
                ) : (
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
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          {/* Redirect user to recipes page if they are already logged in */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/recipe" /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<User isLogin={true} />} />
          <Route path="/register" element={<User isLogin={false} />} />
          <Route
            path="/recipe"
            element={isLoggedIn ? <Recipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/categories"
            element={isLoggedIn ? <Category /> : <Navigate to="/login" />}
          />
          <Route
            path="/review"
            element={isLoggedIn ? <Review /> : <Navigate to="/login" />}
          />
          <Route path="/recipe/create" element={<CreateRecipe />} />
          <Route path="/review/create" element={<CreateReview />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/update/:id" element={<UpdateCategory />} />
          <Route path="/recipe/update/:id" element={<UpdateRecipe />} />
          <Route path="/review/update/:id" element={<UpdateReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
