import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, ShieldCheck, Truck, ShoppingBag, Eye } from 'lucide-react';
import { orderService } from '../services/orderService';
import { useAuth } from '../context/AuthContext';

export const MyOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await orderService.getUserOrders(user?.email);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'badge-success';
      case 'Shipped':
      case 'Out for Delivery':
        return 'badge-info';
      case 'Processing':
      case 'Packed':
        return 'badge-warning';
      case 'Cancelled':
        return 'badge-danger';
      case 'Confirmed':
      case 'Order Placed':
      default:
        return 'badge-rose';
    }
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter((o) => o.orderStatus.toLowerCase() === statusFilter.toLowerCase());

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Account Portal</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
                My Orders & Deliveries
              </h1>
              <p style={{ margin: 0 }}>Review the progress of your bespoke boutique orders and shipments.</p>
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-control form-select"
                style={{ width: 'auto', minWidth: '160px', padding: '0.5rem 2rem 0.5rem 0.8rem' }}
              >
                <option value="all">All Statuses</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton" style={{ height: '140px', borderRadius: 'var(--radius-md)' }} />
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty Orders State */
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-rose-light)',
                color: 'var(--accent-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.2rem'
              }}
            >
              <Package size={32} />
            </div>
            <h3 style={{ marginBottom: '0.4rem' }}>No Orders Found</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {statusFilter !== 'all'
                ? `You have no orders matching the status "${statusFilter}".`
                : 'You haven’t placed any orders with Sri Lakshmi Boutique yet.'}
            </p>
            <Link to="/shop" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem'
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.02rem', letterSpacing: '0.02em' }}>
                      {ord.id}
                    </span>
                    <span className={`badge ${getStatusBadgeClass(ord.orderStatus)}`}>
                      {ord.orderStatus}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>
                      Date: {new Date(ord.placedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>
                      Payment: <strong style={{ color: 'var(--text-primary)' }}>{ord.paymentStatus}</strong>
                    </span>
                  </div>
                </div>

                {/* Items Preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {ord.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '48px', height: '62px', borderRadius: '4px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Qty: {item.quantity} | Size: {item.size} {item.color ? `| Color: ${item.color}` : ''}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Action */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: '0.92rem' }}>
                    Total Amount:{' '}
                    <strong style={{ fontSize: '1.2rem', color: 'var(--accent-rose)' }}>
                      {formatPrice(ord.total)}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      to={`/orders/${ord.id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <Eye size={15} /> View Order Details & Tracking
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

