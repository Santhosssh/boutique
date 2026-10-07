import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, Calendar, MapPin } from 'lucide-react';
import { orderService } from '../services/orderService';

export const OrderConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);

  useEffect(() => {
    if (!order && id) {
      const fetchOrder = async () => {
        try {
          const data = await orderService.getOrderById(id);
          setOrder(data);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [id, order]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  if (loading) {
    return (
      <div className="section-padding container" style={{ textAlign: 'center' }}>
        <div className="skeleton" style={{ height: '300px', maxWidth: '600px', margin: '0 auto' }} />
      </div>
    );
  }

  const orderNum = order?.id || id || `AUR-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Celebration Header */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 20px rgba(46, 125, 50, 0.2)'
            }}
          >
            <CheckCircle2 size={44} />
          </div>

          <span className="badge badge-success" style={{ marginBottom: '0.8rem', padding: '0.35rem 0.9rem' }}>
            Order Confirmed
          </span>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '0.6rem' }}>
            Thank You For Your Order
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            Your bespoke boutique creation has entered our atelier queue. We have dispatched a confirmation receipt with tracking updates.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.8rem 1.6rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.96rem'
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Order Reference Number:</span>
            <strong style={{ color: 'var(--accent-rose)', letterSpacing: '0.04em' }}>{orderNum}</strong>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        {order && (
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '2.5rem'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <MapPin size={14} /> Shipping Destination
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.94rem' }}>{order.customer?.name}</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <Truck size={14} /> Payment & Fulfillment
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.94rem' }}>{order.paymentMethod}</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  Status: <strong style={{ color: 'var(--color-success)' }}>{order.paymentStatus || 'Verified'}</strong>
                </div>
              </div>
            </div>

            {/* Items */}
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Ensemble Items</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {order.items?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '54px', height: '68px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Qty: {item.quantity} | Size: {item.size}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.96rem' }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>
              <span>Total Paid:</span>
              <span style={{ color: 'var(--accent-rose)' }}>{formatPrice(order.total)}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/orders" className="btn btn-primary btn-lg" id="view-orders-btn">
            <Package size={18} /> View My Orders & Tracking
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-lg">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

