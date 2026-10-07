import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { orderService, ORDER_STATUSES } from '../../services/orderService';
import { useNotification } from '../../context/NotificationContext';

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  // Status Change Confirmation Modal
  const [statusChangeTarget, setStatusChangeTarget] = useState(null); // { order, newStatus }

  const { addToast } = useNotification();

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await orderService.getOrders({
        status: statusFilter,
        search: searchTerm,
        page: currentPage,
        limit: 10
      });
      setOrders(res.orders);
      setTotalPages(res.totalPages);
      setTotalOrders(res.total);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter, searchTerm, currentPage]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const confirmStatusUpdate = async () => {
    if (!statusChangeTarget) return;
    try {
      await orderService.updateOrderStatus(
        statusChangeTarget.order.id,
        statusChangeTarget.newStatus,
        `Status updated by store administrator`
      );
      addToast(`Order #${statusChangeTarget.order.id} status changed to ${statusChangeTarget.newStatus}`, 'success');
      setStatusChangeTarget(null);
      loadOrders();
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Delivered': return 'badge-success';
      case 'Shipped':
      case 'Out for Delivery': return 'badge-info';
      case 'Processing':
      case 'Packed': return 'badge-warning';
      case 'Cancelled': return 'badge-danger';
      default: return 'badge-rose';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      {/* Top Header */}
      <div>
        <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Boutique Order Management</h2>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Monitor {totalOrders} customer orders, update delivery pipeline statuses and payments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '1.2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Order ID, customer, email..."
              className="form-control"
              style={{ paddingLeft: '38px' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control form-select"
            style={{ width: 'auto', minWidth: '180px' }}
          >
            <option value="all">All Statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Date Placed</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Fulfillment Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem' }}>
                    No orders matching search.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <Link to={`/admin/orders/${ord.id}`} style={{ fontWeight: 700, color: 'var(--accent-rose)' }}>
                        {ord.id}
                      </Link>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {ord.items?.length} {ord.items?.length === 1 ? 'item' : 'items'}
                      </div>
                    </td>
                    <td>
                      {new Date(ord.placedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{ord.customer?.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {ord.customer?.phone}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700 }}>{formatPrice(ord.total)}</td>
                    <td>
                      <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>{ord.paymentStatus}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{ord.paymentMethod}</div>
                    </td>
                    <td>
                      {/* Status Selector Dropdown */}
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => setStatusChangeTarget({ order: ord, newStatus: e.target.value })}
                        className="form-control form-select"
                        style={{
                          fontSize: '0.82rem',
                          padding: '0.35rem 1.8rem 0.35rem 0.6rem',
                          width: 'auto',
                          borderRadius: 'var(--radius-xs)',
                          borderColor: 'var(--border-medium)'
                        }}
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link
                        to={`/admin/orders/${ord.id}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Eye size={14} /> View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              padding: '1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Before Status Update */}
      {statusChangeTarget && (
        <div className="modal-overlay" onClick={() => setStatusChangeTarget(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', color: 'var(--accent-rose)' }}>
              <AlertCircle size={24} />
              <h3 style={{ margin: 0 }}>Confirm Status Transition</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Are you sure you want to change the status of Order <strong>#{statusChangeTarget.order.id}</strong> from{' '}
              <span className="badge badge-rose">{statusChangeTarget.order.orderStatus}</span> to{' '}
              <span className="badge badge-info">{statusChangeTarget.newStatus}</span>?
              <br /><br />
              This will update the customer’s visual tracking timeline and dispatch automated courier notifications.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setStatusChangeTarget(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmStatusUpdate} className="btn btn-primary">
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
