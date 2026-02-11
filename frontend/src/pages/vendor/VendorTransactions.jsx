import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { VENDOR } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const VendorTransactions = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get(VENDOR.ORDERS);
        setOrders(data);
      } catch (err) {
        toast.error('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(VENDOR.ORDER_STATUS(orderId), { status: newStatus });
      toast.success('Status updated');
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const statuses = ['Ordered', 'Received', 'Ready for Shipping', 'Out For Delivery', 'Delivered'];

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/vendor/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <h2>💰 Transactions</h2>
      {loading ? <div className="loading">Loading transactions...</div> : (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="order-id">{order._id.slice(-6).toUpperCase()}</td>
                <td>{order.userId?.name || 'N/A'}</td>
                <td>{order.items?.length || 0} items</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span className={`badge badge-${order.status === 'Delivered' ? 'green' : 'blue'}`}>{order.status}</span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="status-select"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="empty-msg">No transactions yet.</p>}
      </div>
      )}
    </div>
  );
};

export default VendorTransactions;
