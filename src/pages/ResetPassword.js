import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock } from 'react-icons/fa';

export default function ResetPassword() {
  const { token } = useParams();
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fsd-password-reset-api.onrender.com/api/auth/reset-password/${token}`)
      .then(() => setValid(true))
      .catch(() => setMsg('Token expired or invalid!'));
  }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`https://fsd-password-reset-api.onrender.com/api/auth/reset-password/${token}`, { password });
      setMsg(res.data.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4">
            <h3 className="mb-3 text-center">Reset Password</h3>
            {valid ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
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
                <button className="btn btn-primary w-100" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
              </form>
            ) : (
              <div className="alert alert-danger">{msg}</div>
            )}
            {msg && valid && <div className="alert alert-info mt-3">{msg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
