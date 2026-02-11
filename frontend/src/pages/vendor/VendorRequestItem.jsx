import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const VendorRequestItem = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ itemName: '', description: '', quantity: 1 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Request for "${form.itemName}" has been submitted!`);
    setForm({ itemName: '', description: '', quantity: 1 });
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/vendor/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <h2>📋 Request Item</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input type="text" name="itemName" value={form.itemName} onChange={handleChange} required placeholder="Enter item name" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the item you need" rows={4} />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} min="1" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRequestItem;
