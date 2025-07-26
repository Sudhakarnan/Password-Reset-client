import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('https://password-reset-server-polr.onrender.com/api/auth/forgot-password', { email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="form-group mb-3">
          <label>Email address</label>
          <div className="input-group">
            <span className="input-group-text"><FaEnvelope /></span>
            <input
              type="email" className="form-control"
              value={email} onChange={e => setEmail(e.target.value)}
              required />
          </div>
        </div>
        <button className="btn btn-primary">Send Reset Link</button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
      <div className="mt-3">
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
}
