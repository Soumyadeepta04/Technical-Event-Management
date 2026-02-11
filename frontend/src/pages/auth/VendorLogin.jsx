import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const VendorLogin = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'vendor' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success('Welcome Vendor!');
      navigate('/vendor/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title-bar">Event Management System</div>
        <h2>Vendor Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Id</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="vendor@email.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Enter password" />
          </div>
          <div className="auth-btn-row">
            <button type="button" className="btn btn-secondary" onClick={() => { setForm({ email: '', password: '', role: 'vendor' }); }}>Cancel</button>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
        <div className="auth-links">
          <p>Don't have an account? <Link to="/vendor/signup">Sign Up</Link></p>
          <p>Login as <Link to="/admin/login">Admin</Link> | <Link to="/user/login">User</Link></p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
