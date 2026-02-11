import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/user/login');
  };

  return (
    <div className="role-dashboard-page user-dashboard-page">
      <div className="role-welcome-banner">
        <h2>Welcome</h2>
        <p>{user?.name || 'User'}</p>
      </div>

      {cartItems.length > 0 && (
        <div className="role-stats-row">
          <div className="role-stat-chip">
            <span className="role-stat-value">{cartItems.length}</span>
            <span className="role-stat-label">Cart Items</span>
          </div>
        </div>
      )}

      <div className="role-action-buttons">
        <button className="role-action-btn" onClick={() => navigate('/user/vendors')}>Browse Vendors</button>
        <button className="role-action-btn" onClick={() => navigate('/user/orders')}>My Orders</button>
        <button className="role-action-btn" onClick={() => navigate('/user/guest-list')}>Guest List</button>
        <button className="role-action-btn" onClick={() => navigate('/user/cart')}>
          My Cart{cartItems.length > 0 ? ` (${cartItems.length})` : ''}
        </button>
        <button className="role-action-btn" onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default UserDashboard;
