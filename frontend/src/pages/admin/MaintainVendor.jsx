import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { ADMIN } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.jsx';
import { FiEdit, FiTrash2, FiPlus, FiRefreshCw, FiXCircle, FiArrowLeft } from 'react-icons/fi';

const MaintainVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, vendor: null });
  const [membershipModal, setMembershipModal] = useState({ open: false, vendor: null, months: 1 });
  const navigate = useNavigate();

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(ADMIN.VENDORS);
      setVendors(data);
    } catch (err) {
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVendors(); }, []);

  const handleDelete = async () => {
    try {
      await API.delete(ADMIN.VENDOR_BY_ID(deleteModal.vendor._id));
      toast.success('Vendor deleted');
      setDeleteModal({ open: false, vendor: null });
      fetchVendors();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleExtend = async () => {
    try {
      await API.put(ADMIN.EXTEND_MEMBERSHIP(membershipModal.vendor._id), { months: membershipModal.months });
      toast.success('Membership extended');
      setMembershipModal({ open: false, vendor: null, months: 1 });
      fetchVendors();
    } catch (err) {
      toast.error('Failed to extend membership');
    }
  };

  const handleCancel = async (vendor) => {
    try {
      await API.put(ADMIN.CANCEL_MEMBERSHIP(vendor._id));
      toast.success('Membership cancelled');
      fetchVendors();
    } catch (err) {
      toast.error('Failed to cancel membership');
    }
  };

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/admin/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <div className="page-header">
        <h2>🏪 Maintain Vendors</h2>
        <Link to="/admin/vendors/add" className="btn btn-primary"><FiPlus /> Add Vendor</Link>
      </div>

      {loading ? <div className="loading">Loading vendors...</div> : (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Membership Start</th>
              <th>Membership End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.phone || '-'}</td>
                <td>{v.vendorCategory || '-'}</td>
                <td>{formatDate(v.membershipStart)}</td>
                <td>{formatDate(v.membershipEnd)}</td>
                <td>
                  <span className={`badge ${v.membershipEnd && new Date(v.membershipEnd) > new Date() ? 'badge-green' : 'badge-red'}`}>
                    {v.membershipEnd && new Date(v.membershipEnd) > new Date() ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn btn-sm btn-edit" onClick={() => navigate(`/admin/vendors/update/${v._id}`)}><FiEdit /></button>
                  <button className="btn btn-sm btn-delete" onClick={() => setDeleteModal({ open: true, vendor: v })}><FiTrash2 /></button>
                  <button className="btn btn-sm btn-primary" onClick={() => setMembershipModal({ open: true, vendor: v, months: 1 })}><FiRefreshCw /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleCancel(v)}><FiXCircle /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {vendors.length === 0 && <p className="empty-msg">No vendors found.</p>}
      </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, vendor: null })} title="Delete Vendor">
        <p>Are you sure you want to delete <strong>{deleteModal.vendor?.name}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModal({ open: false, vendor: null })}>Cancel</button>
        </div>
      </Modal>

      {/* Extend Membership Modal */}
      <Modal isOpen={membershipModal.open} onClose={() => setMembershipModal({ open: false, vendor: null, months: 1 })} title="Extend Membership">
        <p>Extend membership for <strong>{membershipModal.vendor?.name}</strong></p>
        <div className="form-group">
          <label>Months</label>
          <select value={membershipModal.months} onChange={(e) => setMembershipModal({ ...membershipModal, months: Number(e.target.value) })}>
            {[1, 3, 6, 12].map((m) => (
              <option key={m} value={m}>{m} month{m > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={handleExtend}>Extend</button>
          <button className="btn btn-secondary" onClick={() => setMembershipModal({ open: false, vendor: null, months: 1 })}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default MaintainVendor;
