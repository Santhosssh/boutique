import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Truck,
  CheckCircle,
  Clock,
  User,
  MapPin,
  CreditCard,
  Save,
  AlertTriangle
} from 'lucide-react';
import { orderService, ORDER_STATUSES } from '../../services/orderService';
import { useNotification } from '../../context/NotificationContext';

export const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [saving, setSaving] = useState(false);

  const { addToast } = useNotification();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data);
        setSelectedStatus(data.orderStatus);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await orderService.updateOrderStatus(order.id, selectedStatus, adminNote);
      setOrder(updated);
      setAdminNote('');
      addToast(`Order #${order.id} status updated to ${selectedStatus}`, 'success');
    } catch (err) {
      addToast('Failed to update order', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h3>Order Not Found</h3>
        <Link to="/admin/orders" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      <Link
        to="/admin/orders"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.88rem',
          color: 'var(--text-muted)'
        }}
      >
        <ChevronLeft size={16} /> Back to Orders
      </Link>

      {/* Header */}
      <div
        className="card"
        style={{
          padding: '1.8rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <span className="section-subtitle">Admin Order Inspection</span>
          <h2 style={{ margin: '0 0 4px', fontSize: '1.6rem' }}>Order #{order.id}</h2>
          <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Placed on {new Date(order.placedAt).toLocaleString()} • Tracking:{' '}
            <strong style={{ color: 'var(--accent-rose)' }}>{order.trackingNumber}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-rose" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
            {order.orderStatus}
          </span>
        </div>
      </div>

      {/* 2-Column Split: Management Controls & Order Contents */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.8rem'
        }}
      >
        {/* Left Column: Status Management & Customer Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {/* Status Update Card */}
          <div className="card" style={{ padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 1.2rem', fontSize: '1.2rem' }}>Update Pipeline Status</h3>
            <form onSubmit={handleUpdateStatus}>
              <div className="form-group">
                <label className="form-label">Order Fulfillment Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-control form-select"
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Internal Status Note / Courier Update</label>
                <input
                  type="text"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="e.g. Dispatched with BlueDart Air AWB #889"
                  className="form-control"
                />
              </div>

              <button type="submit" disabled={saving} className="btn btn-primary" style={{ width: '100%' }}>
                <Save size={16} /> {saving ? 'Saving...' : 'Update Status'}
              </button>
            </form>
          </div>

          {/* Customer & Destination Card */}
          <div className="card" style={{ padding: '1.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--accent-rose)' }}>
              <User size={18} />
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Customer Profile</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
              <div><strong>Name:</strong> {order.customer?.name}</div>
              <div><strong>Email:</strong> {order.customer?.email}</div>
              <div><strong>Phone:</strong> {order.customer?.phone}</div>
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <MapPin size={14} /> Shipping Destination:
                </div>
                <div>{order.customer?.address}</div>
                <div>{order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ordered Items & Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {/* Items Card */}
          <div className="card" style={{ padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 1.2rem', fontSize: '1.2rem' }}>Ordered Creations ({order.items?.length})</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '50px', height: '64px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Size: {item.size} {item.color ? `| Color: ${item.color}` : ''} | Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-rose)' }}>
                  <span>Discount:</span>
                  <span>- {formatPrice(order.discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery:</span>
                <span>{order.deliveryCharge === 0 ? 'FREE' : formatPrice(order.deliveryCharge)}</span>
              </div>
              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700 }}>
                <span>Total:</span>
                <span style={{ color: 'var(--accent-rose)' }}>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Timeline Tracking */}
          <div className="card" style={{ padding: '1.8rem' }}>
            <h3 style={{ margin: '0 0 1.2rem', fontSize: '1.2rem' }}>Timeline Events</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {order.timeline?.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: step.done ? 'var(--accent-rose)' : 'var(--bg-secondary)',
                      color: step.done ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    {step.done ? <CheckCircle size={14} /> : <Clock size={12} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                      <strong>{step.status}</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{step.time}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{step.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
