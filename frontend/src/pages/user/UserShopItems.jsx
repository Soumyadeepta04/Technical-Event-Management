import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { USER } from '../../services/endpoints.js';
import { useCart } from '../../context/CartContext.jsx';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const UserShopItems = () => {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get(USER.VENDOR_PRODUCTS(vendorId));
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [vendorId]);

  const handleAdd = (product) => {
    addToCart({ ...product, vendorId });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/vendors')}>
        <FiArrowLeft /> Back to Vendors
      </button>
      <h2>🛍️ Shop Items</h2>
      {loading ? <div className="loading">Loading products...</div> : (
      <div className="product-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            {p.image && <img src={`/uploads/${p.image}`} alt={p.name} className="product-image" />}
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="product-price">₹{p.price}</p>
              <span className={`badge ${p.status === 'Available' ? 'badge-green' : 'badge-red'}`}>{p.status}</span>
            </div>
            {p.status === 'Available' && (
              <button className="btn btn-primary btn-block" onClick={() => handleAdd(p)}>
                <FiShoppingCart /> Add to Cart
              </button>
            )}
          </div>
        ))}
        {products.length === 0 && <p className="empty-msg">No products available from this vendor.</p>}
      </div>
      )}
    </div>
  );
};

export default UserShopItems;
