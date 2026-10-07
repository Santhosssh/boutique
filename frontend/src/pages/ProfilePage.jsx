import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, Settings, ShieldCheck, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const orders = await orderService.getUserOrders(user?.email);
        setRecentOrders(orders.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecent();
  }, [user]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Profile Hero Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '2.5rem'
          }}
        >
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80'}
            alt={user?.name || 'User'}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--accent-rose)',
              boxShadow: 'var(--shadow-sm)'
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{user?.name || 'Sri Lakshmi Connoisseur'}</h1>
              <span className="badge badge-rose">Privé Member</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> {user?.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} /> {user?.phone}
              </span>
            </div>
          </div>

          <div>
            <Link to="/settings" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
              <Settings size={15} /> Edit Account
            </Link>
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          <Link
            to="/orders"
            className="card card-hover"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '1.4rem' }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-rose-light)',
                color: 'var(--accent-rose)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Package size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem' }}>My Orders</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Track active deliveries & order history
              </p>
            </div>
          </Link>

          <Link
            to="/wishlist"
            className="card card-hover"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '1.4rem' }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold-light)',
                color: 'var(--accent-gold-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Heart size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Wishlist</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Saved bridal drapes & jewellery
              </p>
            </div>
          </Link>

          <Link
            to="/settings"
            className="card card-hover"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '1.4rem' }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-info-bg)',
                color: 'var(--color-info)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.05rem' }}>Saved Addresses</h4>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Manage home & atelier delivery destinations
              </p>
            </div>
          </Link>
        </div>

        {/* Recent Orders Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Recent Order Activity</h3>
            <Link to="/orders" style={{ fontSize: '0.88rem', color: 'var(--accent-rose)', fontWeight: 600 }}>
              View All Orders →
            </Link>
          </div>

          {recentOrders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentOrders.map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.96rem' }}>{ord.id}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {new Date(ord.placedAt).toLocaleDateString()} • {ord.items?.length} items
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="badge badge-rose">{ord.orderStatus}</span>
                    <strong style={{ fontSize: '1.05rem' }}>{formatPrice(ord.total)}</strong>
                    <Link to={`/orders/${ord.id}`} className="btn btn-ghost btn-sm">
                      Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No recent orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

