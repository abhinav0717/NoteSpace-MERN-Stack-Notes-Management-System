
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">▤</span>
        <span>
          Note<span className="brand-highlight">Space</span>
        </span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/about">About</NavLink>

        {user ? (
          <>
            <Link to="/dashboard" className="navbar-login">
              Dashboard
            </Link>
            <button
              className="navbar-register"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-login">
              Login
            </Link>
            <Link to="/register" className="navbar-register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
