import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { VENDOR } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const VendorAddItem = () => {
  const [form, setForm] = useState({ name: '', price: '', status: 'Available' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('status', form.status);
    if (image) formData.append('image', image);

    try {
      await API.post(VENDOR.PRODUCTS, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Product added successfully!');
      navigate('/vendor/your-items');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product');
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/vendor/your-items')}><FiArrowLeft /> Back to Your Items</button>
      <h2>➕ Add New Item</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter product name" />
          </div>
          <div className="form-group">
            <label>Price (₹)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} required min="1" placeholder="Enter price" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="form-group">
            <label>Product Image</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/vendor/your-items')} disabled={submitting}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorAddItem;
