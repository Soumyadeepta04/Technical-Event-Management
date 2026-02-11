import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';

const UserCart = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
        <h2>🛒 Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty!</p>
          <button className="btn btn-primary" onClick={() => navigate('/user/vendors')}>Browse Vendors</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <h2>🛒 Your Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              {item.image && <img src={`/uploads/${item.image}`} alt={item.name} className="cart-item-image" />}
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">₹{item.price}</p>
              </div>
              <div className="cart-item-qty">
                <button className="btn btn-sm" onClick={() => updateQty(item._id, item.qty - 1)}><FiMinus /></button>
                <span>{item.qty}</span>
                <button className="btn btn-sm" onClick={() => updateQty(item._id, item.qty + 1)}><FiPlus /></button>
              </div>
              <p className="cart-item-subtotal">₹{item.price * item.qty}</p>
              <button className="btn btn-sm btn-delete" onClick={() => removeFromCart(item._id)}><FiTrash2 /></button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Items ({cartItems.length})</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="cart-summary-row total">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={() => navigate('/user/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
