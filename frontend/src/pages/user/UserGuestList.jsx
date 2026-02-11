import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api.js';
import { USER } from '../../services/endpoints.js';
import { toast } from 'react-toastify';
import Modal from '../../components/Modal.jsx';
import { FiPlus, FiTrash2, FiEdit, FiArrowLeft } from 'react-icons/fi';

const UserGuestList = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, editing: null });
  const [form, setForm] = useState({ name: '', email: '', phone: '', relation: '' });

  const fetchGuests = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(USER.GUEST_LIST);
      setGuests(data);
    } catch (err) {
      toast.error('Failed to load guest list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuests(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const openAdd = () => {
    setForm({ name: '', email: '', phone: '', relation: '' });
    setModal({ open: true, editing: null });
  };

  const openEdit = (guest) => {
    setForm({ name: guest.name, email: guest.email || '', phone: guest.phone || '', relation: guest.relation || '' });
    setModal({ open: true, editing: guest._id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modal.editing) {
        await API.put(USER.GUEST_BY_ID(modal.editing), form);
        toast.success('Guest updated');
      } else {
        await API.post(USER.GUEST_LIST, form);
        toast.success('Guest added');
      }
      setModal({ open: false, editing: null });
      fetchGuests();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(USER.GUEST_BY_ID(id));
      toast.success('Guest removed');
      fetchGuests();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="page">
      <button className="btn btn-secondary mb-1" onClick={() => navigate('/user/dashboard')}><FiArrowLeft /> Back to Dashboard</button>
      <div className="page-header">
        <h2>👥 Guest List</h2>
        <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add Guest</button>
      </div>

      {loading ? <div className="loading">Loading guest list...</div> : (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Relation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g, i) => (
              <tr key={g._id}>
                <td>{i + 1}</td>
                <td>{g.name}</td>
                <td>{g.email || '-'}</td>
                <td>{g.phone || '-'}</td>
                <td>{g.relation || '-'}</td>
                <td className="actions">
                  <button className="btn btn-sm btn-edit" onClick={() => openEdit(g)}><FiEdit /></button>
                  <button className="btn btn-sm btn-delete" onClick={() => handleDelete(g._id)}><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {guests.length === 0 && <p className="empty-msg">No guests added yet.</p>}
      </div>
      )}

      <Modal isOpen={modal.open} onClose={() => setModal({ open: false, editing: null })} title={modal.editing ? 'Edit Guest' : 'Add Guest'}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Relation</label>
            <input type="text" name="relation" value={form.relation} onChange={handleChange} placeholder="e.g. Friend, Family" />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">{modal.editing ? 'Update' : 'Add'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => setModal({ open: false, editing: null })}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserGuestList;
