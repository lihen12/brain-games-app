// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {!currentUser && <Link to="/signup">Sign Up</Link>}
      {!currentUser && <Link to="/login">Log In</Link>}
      {currentUser && (
        <button onClick={() => logout()}>Log Out</button>
      )}
    </nav>
  );
};

export default NavBar;
