import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { VENDOR } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const VendorViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(VENDOR.PRODUCT_BY_ID(id));
        setProduct(data);
      } catch (err) {
        toast.error('Failed to load product');
        navigate('/vendor/your-items');
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/vendor/your-items')}>
        <FiArrowLeft /> Back to Items
      </button>
      <div className="product-detail">
        {product.image && (
          <div className="product-detail-image">
            <img src={`/uploads/${product.image}`} alt={product.name} />
          </div>
        )}
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-price-lg">₹{product.price}</p>
          <span className={`badge ${product.status === 'Available' ? 'badge-green' : 'badge-red'}`}>
            {product.status}
          </span>
          <p className="product-date">Added: {new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default VendorViewProduct;
