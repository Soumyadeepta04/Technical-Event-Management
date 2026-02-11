import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { VENDOR } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const VendorProductStatus = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get(VENDOR.PRODUCTS);
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleStatus = async (product) => {
    const newStatus = product.status === 'Available' ? 'Unavailable' : 'Available';
    try {
      await API.put(VENDOR.PRODUCT_BY_ID(product._id), { status: newStatus });
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, status: newStatus } : p))
      );
      toast.success(`Status changed to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/vendor/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <h2>🔄 Product Status</h2>
      {loading ? <div className="loading">Loading products...</div> : (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Toggle</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>
                  <span className={`badge ${p.status === 'Available' ? 'badge-green' : 'badge-red'}`}>{p.status}</span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${p.status === 'Available' ? 'btn-danger' : 'btn-primary'}`}
                    onClick={() => toggleStatus(p)}
                  >
                    Mark {p.status === 'Available' ? 'Unavailable' : 'Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="empty-msg">No products found.</p>}
      </div>
      )}
    </div>
  );
};

export default VendorProductStatus;
