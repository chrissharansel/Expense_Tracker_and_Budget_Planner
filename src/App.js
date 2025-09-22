import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import ExpenseReport from "./components/Reports/ExpenseReport";
import CategoryList from "./components/Category/CategoryList";
import { getCurrentUser, logout } from "./services/authService";

function App() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Expense & Budget
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/reports">Reports</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/categories">Categories</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reports" element={<ExpenseReport />} />
          <Route path="/categories" element={<CategoryList />} />
        </Routes>
      </div>

      <footer className="text-center py-3 mt-4 text-muted">
        © {new Date().getFullYear()} Expense & Budget
      </footer>
    </div>
  );
}

export default App;
