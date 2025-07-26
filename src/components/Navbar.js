import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">PasswordResetApp</Link>
        <div>
          {loggedIn ? (
            <button className="btn btn-outline-danger ms-2" onClick={logout}>Logout</button>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
