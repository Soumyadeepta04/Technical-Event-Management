import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { ADMIN } from '../../services/endpoints.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalVendors: 0, totalUsers: 0, totalOrders: 0, activeVendors: 0, expiredVendors: 0 });
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get(ADMIN.DASHBOARD);
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
    navigate('/admin/login');
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="role-dashboard-page admin-dashboard-page">
      <div className="role-welcome-banner">
        <h2>Welcome</h2>
        <p>{user?.name || 'Admin'}</p>
      </div>

      <div className="role-stats-row">
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.totalVendors}</span>
          <span className="role-stat-label">Vendors</span>
        </div>
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.totalUsers}</span>
          <span className="role-stat-label">Users</span>
        </div>
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.activeVendors}</span>
          <span className="role-stat-label">Active</span>
        </div>
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.expiredVendors}</span>
          <span className="role-stat-label">Expired</span>
        </div>
        <div className="role-stat-chip">
          <span className="role-stat-value">{stats.totalOrders}</span>
          <span className="role-stat-label">Orders</span>
        </div>
      </div>

      <div className="role-action-buttons">
        <button className="role-action-btn" onClick={() => navigate('/admin/vendors')}>Maintain Vendor</button>
        <button className="role-action-btn" onClick={() => navigate('/admin/users')}>Maintain User</button>
        <button className="role-action-btn" onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
