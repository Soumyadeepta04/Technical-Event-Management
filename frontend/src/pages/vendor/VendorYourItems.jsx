import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { VENDOR } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.jsx';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiArrowLeft } from 'react-icons/fi';

const VendorYourItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null });
  const [editModal, setEditModal] = useState({ open: false, product: null });
  const [editForm, setEditForm] = useState({ name: '', price: '', status: 'Available' });
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(VENDOR.PRODUCTS);
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async () => {
    try {
      await API.delete(VENDOR.PRODUCT_BY_ID(deleteModal.product._id));
      toast.success('Product deleted');
      setDeleteModal({ open: false, product: null });
      fetchProducts();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const openEdit = (product) => {
    setEditForm({ name: product.name, price: product.price, status: product.status });
    setEditModal({ open: true, product });
  };

  const handleUpdate = async () => {
    try {
      await API.put(VENDOR.PRODUCT_BY_ID(editModal.product._id), editForm);
      toast.success('Product updated');
      setEditModal({ open: false, product: null });
      fetchProducts();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/vendor/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <div className="page-header">
        <h2>📦 Your Items</h2>
        <button className="btn btn-primary" onClick={() => navigate('/vendor/add-item')}><FiPlus /> Add Item</button>
      </div>

      {loading ? (
        <div className="loading">Loading your items...</div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p._id} className="product-card">
              {p.image && <img src={`/uploads/${p.image}`} alt={p.name} className="product-image" />}
              <div className="product-info">
                <h3>{p.name}</h3>
                <p className="product-price">₹{p.price}</p>
                <span className={`badge ${p.status === 'Available' ? 'badge-green' : 'badge-red'}`}>{p.status}</span>
              </div>
              <div className="product-actions">
                <button className="btn btn-sm btn-edit" onClick={() => navigate(`/vendor/view-product/${p._id}`)}><FiEye /></button>
                <button className="btn btn-sm btn-edit" onClick={() => openEdit(p)}><FiEdit /></button>
                <button className="btn btn-sm btn-delete" onClick={() => setDeleteModal({ open: true, product: p })}><FiTrash2 /></button>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="empty-msg">No products yet. Add your first item!</p>}
        </div>
      )}

      {/* Delete Modal */}
      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, product: null })} title="Delete Product">
        <p>Delete <strong>{deleteModal.product?.name}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModal({ open: false, product: null })}>Cancel</button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={editModal.open} onClose={() => setEditModal({ open: false, product: null })} title="Edit Product">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditModal({ open: false, product: null })}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default VendorYourItems;
