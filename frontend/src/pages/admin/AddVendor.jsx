import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { ADMIN } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const AddVendor = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'vendor',
    vendorCategory: 'Caterer',
    membershipMonths: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(ADMIN.VENDORS, form);
      toast.success('Vendor added successfully');
      navigate('/admin/vendors');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add vendor');
    }
  };

  const categories = ['Caterer', 'Decorator', 'Photographer', 'DJ', 'Venue', 'Florist', 'Planner', 'Other'];

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/admin/vendors')}><FiArrowLeft /> Back to Vendors</button>
      <h2>➕ Add Vendor</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="vendorCategory" value={form.vendorCategory} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Membership Duration</label>
            <select name="membershipMonths" value={form.membershipMonths} onChange={handleChange}>
              {[1, 3, 6, 12].map((m) => (
                <option key={m} value={m}>{m} month{m > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Add Vendor</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/vendors')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
