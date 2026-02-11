import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { ADMIN } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const AddUserAdmin = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(ADMIN.USERS, form);
      toast.success('User added successfully');
      navigate('/admin/users');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add user');
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/admin/users')}><FiArrowLeft /> Back to Users</button>
      <h2>➕ Add User</h2>
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
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Add User</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/users')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserAdmin;
