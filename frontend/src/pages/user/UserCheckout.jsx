import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { USER } from '../../services/endpoints.js';
import { useCart } from '../../context/CartContext.jsx';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const UserCheckout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: '', city: '', pincode: '', paymentMethod: 'Cash' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Cart is empty!');
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        vendorId: item.vendorId,
        name: item.name,
        price: item.price,
        qty: item.qty,
        image: item.image || '',
      })),
      totalAmount: cartTotal,
      paymentMethod: form.paymentMethod,
      shippingAddress: {
        address: form.address,
        city: form.city,
        pincode: form.pincode,
      },
    };

    try {
      await API.post(USER.ORDERS, orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/user/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/cart')}><FiArrowLeft /> Back to Cart</button>
      <h2>📝 Checkout</h2>
      <div className="checkout-container">
        <div className="form-card">
          <h3>Shipping Address</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} required placeholder="Enter full address" rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="City" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="pincode" value={form.pincode} onChange={handleChange} required placeholder="Pincode" />
              </div>
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                <option value="Cash">Cash on Delivery</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div className="checkout-summary">
              <p><strong>Items:</strong> {cartItems.length}</p>
              <p><strong>Total:</strong> ₹{cartTotal}</p>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCheckout;
