// src/components/SignUp.js

import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <alert variant="danger">{error}</alert>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" ref={emailRef} required />
        <label>Password:</label>
        <input type="password" ref={passwordRef} required />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default SignUp;
