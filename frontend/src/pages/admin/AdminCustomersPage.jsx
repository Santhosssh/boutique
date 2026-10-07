import React, { useState, useEffect } from 'react';
import { Search, User, Eye, CheckCircle, Ban, Phone, Mail, MapPin, Package } from 'lucide-react';
import { customerService } from '../../services/customerService';
import { useNotification } from '../../context/NotificationContext';

export const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const { addToast } = useNotification();

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await customerService.getCustomers({ search: searchTerm });
      setCustomers(res.customers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [searchTerm]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleToggleStatus = async (cust) => {
    try {
      const updated = await customerService.toggleCustomerStatus(cust.id);
      addToast(`Customer status changed to ${updated.status}`, 'info');
      loadCustomers();
    } catch (e) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleViewCustomer = async (cust) => {
    try {
      const full = await customerService.getCustomerById(cust.id);
      setSelectedCustomer(full);
    } catch (e) {
      addToast('Failed to load customer profile', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      {/* Header */}
      <div>
        <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Boutique Customer Directory</h2>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Registered clients, lifetime order expenditure, and account standing.
        </p>
      </div>

      {/* Search Bar */}
      <div className="card" style={{ padding: '1.2rem' }}>
        <div style={{ position: 'relative', maxWidth: '450px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name, email, or city..."
            className="form-control"
            style={{ paddingLeft: '38px' }}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>City</th>
                <th>Orders Placed</th>
                <th>Lifetime Spend</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading directory...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem' }}>
                    No clients found matching query.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.email}</div>
                    </td>
                    <td>{c.phone}</td>
                    <td>{c.city}</td>
                    <td>
                      <strong>{c.ordersCount}</strong> orders
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-rose)' }}>
                      {formatPrice(c.totalSpent)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(c)}
                        className={`badge ${c.status === 'Active' ? 'badge-success' : 'badge-danger'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle account status"
                      >
                        {c.status}
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleViewCustomer(c)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', gap: '4px' }}
                      >
                        <Eye size={14} /> Profile & Orders
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal with Order History */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '650px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{selectedCustomer.name}</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Client ID: {selectedCustomer.id}</span>
              </div>
              <span className={`badge ${selectedCustomer.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                {selectedCustomer.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Email:</span> <strong>{selectedCustomer.email}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Phone:</span> <strong>{selectedCustomer.phone}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>City:</span> <strong>{selectedCustomer.city}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Lifetime Spend:</span>{' '}
                <strong style={{ color: 'var(--accent-rose)' }}>{formatPrice(selectedCustomer.totalSpent)}</strong>
              </div>
            </div>

            {/* Order History */}
            <h4 style={{ marginBottom: '10px', fontSize: '1.05rem' }}>Purchased Order History ({selectedCustomer.orders?.length || 0})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
              {selectedCustomer.orders && selectedCustomer.orders.length > 0 ? (
                selectedCustomer.orders.map((ord) => (
                  <div
                    key={ord.id}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div>
                      <strong>{ord.id}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(ord.placedAt).toLocaleDateString()} • {ord.items?.length} items
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700 }}>{formatPrice(ord.total)}</div>
                      <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>
                        {ord.orderStatus}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No orders recorded for this customer.</p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => setSelectedCustomer(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
