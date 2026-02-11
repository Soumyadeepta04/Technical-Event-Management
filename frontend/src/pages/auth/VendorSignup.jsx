import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const VendorSignup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'vendor',
    vendorCategory: 'Caterer',
    membershipMonths: 1,
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success('Registration successful!');
      navigate('/vendor/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const categories = ['Caterer', 'Decorator', 'Photographer', 'DJ', 'Venue', 'Florist', 'Planner', 'Other'];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-title-bar">Event Management System</div>
        <h2>Vendor Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group form-row-labeled">
            <label className="field-label">Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Vendor" />
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Vendor" />
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={4} placeholder="Vendor" />
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number (optional)" />
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Category</label>
            <select name="vendorCategory" value={form.vendorCategory} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group form-row-labeled">
            <label className="field-label">Membership</label>
            <select name="membershipMonths" value={form.membershipMonths} onChange={handleChange}>
              <option value={1}>1 Month</option>
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </select>
          </div>
          <div className="auth-btn-row" style={{ justifyContent: 'center' }}>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </div>
        </form>
        <div className="auth-links">
          <p>Already have an account? <Link to="/vendor/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;
