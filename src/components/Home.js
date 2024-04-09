// src/components/Home.js
import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>Welcome to Brain Games App!</h1>
      {currentUser && <p>Logged in as {currentUser.email}</p>}
    </div>
  );
};

export default Home;
