import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { VENDOR } from '../../services/endpoints.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const VendorDashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get(VENDOR.DASHBOARD);
        setStats(data);
      } catch (err) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/vendor/login');
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="role-dashboard-page vendor-dashboard-page">
      <div className="role-welcome-banner">
        <h2>Welcome</h2>
        <p>{user?.name || 'Vendor'}</p>
      </div>

      <div className="role-stats-row">
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.totalProducts}</span>
          <span className="role-stat-label">Products</span>
        </div>
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.totalOrders}</span>
          <span className="role-stat-label">Orders</span>
        </div>
        <div className="role-stat-chip">
          <span className="role-stat-value">₹{stats.totalRevenue}</span>
          <span className="role-stat-label">Revenue</span>
        </div>
      </div>

      <div className="role-action-buttons">
        <button className="role-action-btn" onClick={() => navigate('/vendor/your-items')}>Your Item</button>
        <button className="role-action-btn" onClick={() => navigate('/vendor/add-item')}>Add New Item</button>
        <button className="role-action-btn" onClick={() => navigate('/vendor/transactions')}>Transaction</button>
        <button className="role-action-btn" onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default VendorDashboard;
