import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';

export default function ResetPassword() {
  const { token } = useParams();
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/reset-password/${token}`)
      .then(() => setValid(true))
      .catch(() => setMsg('Token expired or invalid!'));
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMsg(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      {valid ? (
        <form onSubmit={handleSubmit} className="w-50">
          <div className="form-group mb-3">
            <label>New Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password" className="form-control"
                value={password} onChange={e => setPassword(e.target.value)}
                required minLength={6} />
            </div>
          </div>
          <button className="btn btn-primary">Reset Password</button>
        </form>
      ) : (
        <div className="alert alert-danger">{msg}</div>
      )}
      {msg && valid && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
