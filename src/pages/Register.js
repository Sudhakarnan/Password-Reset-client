import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await axios.post('https://fsd-password-reset-api.onrender.com/api/auth/register', { email, password });
      setMsg('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4">
            <h3 className="mb-3 text-center">Create Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
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
              <div className="mb-3">
                <label className="form-label">Password</label>
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
              <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
            </form>
            {msg && <div className={`alert mt-3 ${msg.includes('success') ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}
            <div className="mt-2 text-center">
              <a href="/login">Already have an account? Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
