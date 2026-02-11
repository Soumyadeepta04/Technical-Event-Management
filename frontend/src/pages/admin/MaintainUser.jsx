import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { ADMIN } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.jsx';
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from 'react-icons/fi';

const MaintainUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, user: null });
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(ADMIN.USERS);
      setUsers(data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async () => {
    try {
      await API.delete(ADMIN.USER_BY_ID(deleteModal.user._id));
      toast.success('User deleted');
      setDeleteModal({ open: false, user: null });
      fetchUsers();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/admin/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <div className="page-header">
        <h2>👤 Maintain Users</h2>
        <Link to="/admin/users/add" className="btn btn-primary"><FiPlus /> Add User</Link>
      </div>

      {loading ? <div className="loading">Loading users...</div> : (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || '-'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn btn-sm btn-edit" onClick={() => navigate(`/admin/users/update/${u._id}`)}><FiEdit /></button>
                  <button className="btn btn-sm btn-delete" onClick={() => setDeleteModal({ open: true, user: u })}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="empty-msg">No users found.</p>}
      </div>
      )}

      <Modal isOpen={deleteModal.open} onClose={() => setDeleteModal({ open: false, user: null })} title="Delete User">
        <p>Are you sure you want to delete <strong>{deleteModal.user?.name}</strong>?</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={() => setDeleteModal({ open: false, user: null })}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default MaintainUser;
