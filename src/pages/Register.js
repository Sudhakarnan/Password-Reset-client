import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('https://password-reset-server-polr.onrender.com/api/auth/register', { email, password });
      setMsg('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="form-group mb-3">
          <label>Email</label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <div className="input-group">
            <span className="input-group-text"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </div>
        <button className="btn btn-primary">Register</button>
      </form>
      {msg && <div className={`alert mt-3 ${msg.includes('successful') ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}
      <div className="mt-3">
        <a href="/login">Already have an account? Login</a>
      </div>
    </div>
  );
}
