import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../services/api.js';
import { ADMIN } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const UpdateVendor = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ name: '', email: '', phone: '', vendorCategory: 'Caterer' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const { data } = await API.get(ADMIN.VENDOR_BY_ID(id));
        setForm({ name: data.name, email: data.email, phone: data.phone || '', vendorCategory: data.vendorCategory || 'Caterer' });
      } catch (err) {
        toast.error('Failed to load vendor');
        navigate('/admin/vendors');
      }
    };
    fetchVendor();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(ADMIN.VENDOR_BY_ID(id), form);
      toast.success('Vendor updated');
      navigate('/admin/vendors');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const categories = ['Caterer', 'Decorator', 'Photographer', 'DJ', 'Venue', 'Florist', 'Planner', 'Other'];

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/admin/vendors')}><FiArrowLeft /> Back to Vendors</button>
      <h2>✏️ Update Vendor</h2>
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
            <label>Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="vendorCategory" value={form.vendorCategory} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/vendors')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVendor;
