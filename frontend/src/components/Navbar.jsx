import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { FiShoppingCart, FiLogOut, FiHome } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    const role = user?.role;
    logout();
    const loginPath = role === 'vendor' ? '/vendor/login'
      : role === 'user' ? '/user/login'
        : '/admin/login';
    navigate(loginPath);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    return `/${user.role}/dashboard`;
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to={getDashboardPath()}> Event Manager</Link>
      </div>

      <div className="navbar-links">
        <Link to={getDashboardPath()} className="nav-link">
          <FiHome /> Dashboard
        </Link>

        {user.role === 'admin' && (
          <>
            <Link to="/admin/vendors" className="nav-link">Vendors</Link>
            <Link to="/admin/users" className="nav-link">Users</Link>
            <Link to="/admin/transactions" className="nav-link">Transactions</Link>
          </>
        )}

        {user.role === 'vendor' && (
          <>
            <Link to="/vendor/your-items" className="nav-link">Your Items</Link>
            <Link to="/vendor/add-item" className="nav-link">Add Item</Link>
            <Link to="/vendor/transactions" className="nav-link">Transactions</Link>
            <Link to="/vendor/product-status" className="nav-link">Product Status</Link>
          </>
        )}

        {user.role === 'user' && (
          <>
            <Link to="/user/vendors" className="nav-link">Vendors</Link>
            <Link to="/user/orders" className="nav-link">My Orders</Link>
            <Link to="/user/guest-list" className="nav-link">Guest List</Link>
            <Link to="/user/cart" className="nav-link cart-link">
              <FiShoppingCart />
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </Link>
          </>
        )}
      </div>

      <div className="navbar-user">
        <span className="user-name">{user.name} ({user.role})</span>
        <button onClick={handleLogout} className="btn btn-logout">
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
