// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import MemoryGame from './components/MemoryGame';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/memory-game" element={<MemoryGame />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
