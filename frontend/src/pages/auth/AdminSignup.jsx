import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const AdminSignup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success('Admin account created!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title-bar">Event Management System</div>
        <h2>Admin Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group form-row-labeled">
            <label className="field-label">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="admin@example.com" />
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={4} placeholder="Min 4 characters" />
          </div>
          <div className="auth-btn-row" style={{ justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        <div className="auth-links">
          <p>Already have an account? <Link to="/admin/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
