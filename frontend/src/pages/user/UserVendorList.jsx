import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { USER } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi';

const UserVendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const params = filter !== 'All' ? { category: filter } : {};
        const { data } = await API.get(USER.VENDORS, { params });
        setVendors(data);
      } catch (err) {
        toast.error('Failed to load vendors');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, [filter]);

  const categories = ['All', 'Caterer', 'Decorator', 'Photographer', 'DJ', 'Venue', 'Florist', 'Planner', 'Other'];

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <h2>🏪 Vendors</h2>
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-filter ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? <div className="loading">Loading vendors...</div> : (
        <div className="vendor-grid">
          {vendors.map((v) => (
            <div key={v._id} className="vendor-card" onClick={() => navigate(`/user/shop/${v._id}`)}>
              <div className="vendor-card-icon"><FiShoppingBag /></div>
              <h3>{v.name}</h3>
              <p className="vendor-category">{v.vendorCategory}</p>
              <p className="vendor-email">{v.email}</p>
              <button className="btn btn-primary btn-sm">Shop Now</button>
            </div>
          ))}
          {vendors.length === 0 && <p className="empty-msg">No vendors found for this category.</p>}
        </div>
      )}
    </div>
  );
};

export default UserVendorList;
