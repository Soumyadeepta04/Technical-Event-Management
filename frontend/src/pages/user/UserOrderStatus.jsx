import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { USER } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const UserOrderStatus = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get(USER.ORDERS);
        setOrders(data);
      } catch (err) {
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'badge-green';
      case 'Out For Delivery': return 'badge-blue';
      case 'Ready for Shipping': return 'badge-orange';
      default: return 'badge-grey';
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <h2>📦 My Orders</h2>
      {loading ? <div className="loading">Loading orders...</div> : (
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
              <span className={`badge ${getStatusColor(order.status)}`}>{order.status}</span>
            </div>
            <div className="order-items">
              {order.items?.map((item, i) => (
                <div key={i} className="order-item-row">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <span>Payment: {order.paymentMethod}</span>
              <span className="order-total">Total: ₹{order.totalAmount}</span>
              <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p className="empty-msg">No orders yet. Start shopping!</p>}
      </div>
      )}
    </div>
  );
};

export default UserOrderStatus;
