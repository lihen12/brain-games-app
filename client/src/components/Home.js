// src/components/Home.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser } = useAuth();  // Retrieves the current user from the AuthContext

  return (
    <div>
      <h1>Welcome to Brain Games App!</h1>
      {currentUser ? (
        <p>Logged in as {currentUser.email}</p>  // Shows user info if logged in
      ) : (
        <p>You are not logged in.</p>  // Shows this message if not logged in
      )}
      <Link to="/memory-game">Play Memory Game</Link>
    </div>
  );
};

export default Home;
