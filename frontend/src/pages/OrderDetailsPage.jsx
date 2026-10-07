import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  CheckCircle,
  Clock,
  Truck,
  MapPin,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  PackageCheck
} from 'lucide-react';
import { orderService } from '../services/orderService';
import { useNotification } from '../context/NotificationContext';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('Changed mind regarding size or fit');
  const { addToast } = useNotification();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await orderService.getOrderById(id);
        setOrder(data);
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

  const handleCancelOrder = async () => {
    try {
      const updated = await orderService.cancelOrder(order.id, cancelReason);
      setOrder(updated);
      setShowCancelModal(false);
      addToast(`Order #${order.id} cancelled successfully.`, 'info');
    } catch (err) {
      addToast('Failed to cancel order', 'error');
    }
  };

  if (loading) {
    return (
      <div className="section-padding container">
        <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center' }}>
        <h2>Order Not Found</h2>
        <p style={{ margin: '1rem 0 2rem' }}>We could not locate this order in our records.</p>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    );
  }

  const isCancellable = ['Order Placed', 'Confirmed', 'Processing'].includes(order.orderStatus);

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Navigation Breadcrumb */}
        <Link
          to="/orders"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem'
          }}
        >
          <ChevronLeft size={16} /> Back to My Orders
        </Link>

        {/* Order Header Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '1.8rem',
            boxShadow: 'var(--shadow-xs)',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-subtitle">Order Tracking & Receipt</span>
              <h1 style={{ margin: '0 0 0.4rem', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
                Order #{order.id}
              </h1>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Placed on {new Date(order.placedAt).toLocaleString()}
                {order.trackingNumber && (
                  <span> • Tracking: <strong style={{ color: 'var(--accent-rose)' }}>{order.trackingNumber}</strong></span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className={`badge ${order.orderStatus === 'Delivered' ? 'badge-success' : order.orderStatus === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
                {order.orderStatus}
              </span>

              {isCancellable && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="btn btn-outline btn-sm"
                  style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 8. Visual Order Progress Timeline */}
        {order.orderStatus !== 'Cancelled' ? (
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '2rem',
              boxShadow: 'var(--shadow-xs)',
              marginBottom: '2rem'
            }}
          >
            <h3 style={{ marginBottom: '1.8rem', fontSize: '1.25rem' }}>Fulfillment & Courier Timeline</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
              {order.timeline?.map((step, idx) => {
                const isLast = idx === order.timeline.length - 1;
                return (
                  <div key={idx} style={{ display: 'flex', gap: '1.2rem', position: 'relative' }}>
                    {/* Vertical Connector Line */}
                    {!isLast && (
                      <div
                        style={{
                          position: 'absolute',
                          left: '16px',
                          top: '32px',
                          bottom: '-24px',
                          width: '2px',
                          backgroundColor: step.done ? 'var(--accent-rose)' : 'var(--border-subtle)',
                          zIndex: 1
                        }}
                      />
                    )}

                    {/* Step Icon Badge */}
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        backgroundColor: step.done ? 'var(--accent-rose)' : 'var(--bg-secondary)',
                        color: step.done ? '#FFFFFF' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 2,
                        boxShadow: step.done ? '0 0 10px rgba(194,109,116,0.3)' : 'none'
                      }}
                    >
                      {step.done ? <CheckCircle size={18} /> : <Clock size={16} />}
                    </div>

                    {/* Step Content */}
                    <div style={{ flex: 1, paddingTop: '3px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.96rem', color: step.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                          {step.status}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {step.time}
                        </span>
                      </div>
                      <p style={{ margin: '3px 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                        {step.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <AlertTriangle size={24} />
            <div>
              <strong>This order has been cancelled.</strong>
              <div style={{ fontSize: '0.85rem' }}>Refund or return procedures (if prepaid) have been credited.</div>
            </div>
          </div>
        )}

        {/* Shipping & Payment Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem', color: 'var(--accent-rose)' }}>
              <MapPin size={18} />
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Shipping Address</h4>
            </div>
            <div style={{ fontWeight: 600 }}>{order.customer?.name}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>
              {order.customer?.address}<br />
              {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}<br />
              Phone: {order.customer?.phone}
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem', color: 'var(--accent-rose)' }}>
              <CreditCard size={18} />
              <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Payment Details</h4>
            </div>
            <div style={{ fontWeight: 600 }}>{order.paymentMethod}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.6 }}>
              Payment Status: <strong style={{ color: order.paymentStatus === 'Paid' ? 'var(--color-success)' : 'var(--color-warning)' }}>{order.paymentStatus}</strong><br />
              Billing Contact: {order.customer?.email}
            </div>
          </div>
        </div>

        {/* Line Items & Total Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '2rem',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Purchased Boutique Items</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '2rem' }}>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '64px', height: '82px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1rem', margin: '0 0 4px' }}>{item.name}</h4>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Size: <strong>{item.size}</strong> {item.color ? `| Color: ${item.color}` : ''} | Quantity: {item.quantity}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.05rem' }}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div style={{ maxWidth: '380px', marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.94rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(order.subtotal)}</span>
            </div>

            {order.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-rose)' }}>
                <span>Discount</span>
                <span style={{ fontWeight: 600 }}>- {formatPrice(order.discount)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Express Delivery</span>
              <span>{order.deliveryCharge === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : formatPrice(order.deliveryCharge)}</span>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
              <span>Total:</span>
              <span style={{ color: 'var(--accent-rose)' }}>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '0.8rem' }}>Confirm Order Cancellation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
              Are you sure you want to cancel Order <strong>#{order.id}</strong>? If this order has already begun bespoke tailoring, processing fees may apply.
            </p>

            <div className="form-group">
              <label className="form-label">Reason for cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="form-control form-select"
              >
                <option value="Changed mind regarding size or fit">Changed mind regarding size or fit</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Delivery duration too long">Delivery duration too long</option>
                <option value="Selected wrong payment method">Selected wrong payment method</option>
                <option value="Other reason">Other reason</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button onClick={() => setShowCancelModal(false)} className="btn btn-secondary">
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--color-danger)' }}
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

