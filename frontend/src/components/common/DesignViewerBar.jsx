import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Compass,
  X,
  ExternalLink,
  Shield,
  ShoppingBag,
  RotateCcw,
  Sun,
  Moon,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { resetStorageToDefault } from '../../services/api';

export const DesignViewerBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('storefront'); // 'storefront' or 'admin'
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, switchRole } = useAuth();
  const { addToast } = useNotification();

  const handleResetData = () => {
    if (window.confirm('Reset all sample products, orders, and settings back to initial showroom defaults?')) {
      resetStorageToDefault();
      addToast('Showroom mock data restored to default sample values!', 'success');
      window.location.reload();
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      addToast('Light theme preview active', 'info');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      addToast('Dark theme preview active', 'info');
    }
  };

  const storefrontPages = [
    { name: 'Landing / Home', path: '/', badge: 'Hero Showcase' },
    { name: 'Catalog & Filter', path: '/shop', badge: 'Grid + Filters' },
    { name: 'Sarees Collection', path: '/shop?category=sarees', badge: 'Category Filter' },
    { name: 'Western Couture', path: '/shop?category=western', badge: 'Category Filter' },
    { name: 'Product Details', path: '/products/prod-001', badge: 'Gallery & Sizes' },
    { name: 'Shopping Bag', path: '/cart', badge: 'Pre-filled Cart' },
    { name: 'Checkout Page', path: '/checkout', badge: 'Forms & Summary' },
    { name: 'Order Confirmation', path: '/orders/confirmed/SLB-ORD-9201', badge: 'Success State' },
    { name: 'Customer Orders', path: '/orders', badge: 'Order Cards' },
    { name: 'Order & Courier Tracker', path: '/orders/SLB-ORD-9201', badge: '7-Step Timeline' },
    { name: 'Saved Wishlist', path: '/wishlist', badge: 'Saved Pieces' },
    { name: 'User Profile', path: '/profile', badge: 'Customer Info' },
    { name: 'Account Settings', path: '/settings', badge: 'Addresses & Security' },
    { name: 'Login Screen', path: '/login', badge: '1-Click Demos' },
    { name: 'Register Screen', path: '/register', badge: 'Membership' }
  ];

  const adminPages = [
    { name: 'Admin Dashboard', path: '/admin', badge: '8 KPIs & Charts' },
    { name: 'Product Inventory', path: '/admin/products', badge: 'Catalog Table' },
    { name: 'Add New Product', path: '/admin/products/add', badge: 'Creation Form' },
    { name: 'Edit Product', path: '/admin/products/prod-001/edit', badge: 'Editor Form' },
    { name: 'Categories Manager', path: '/admin/categories', badge: 'Department Cards' },
    { name: 'Orders Management', path: '/admin/orders', badge: 'Order Pipeline' },
    { name: 'Admin Order Audit', path: '/admin/orders/SLB-ORD-9201', badge: 'Status Transition' },
    { name: 'Customer Directory', path: '/admin/customers', badge: 'Client CRM' },
    { name: 'Analytics & Reports', path: '/admin/reports', badge: 'Revenue Share' },
    { name: 'Boutique Settings', path: '/admin/settings', badge: 'Rules & Hours' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        fontFamily: 'var(--font-sans)',
        fontSize: '0.85rem'
      }}
    >
      {/* Floating Toggle Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1E1B18',
            color: '#F4ECE4',
            border: '1px solid rgba(197, 168, 128, 0.4)',
            borderRadius: '9999px',
            padding: '10px 18px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: '0.04em',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = 'var(--accent-rose)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.4)';
          }}
          title="Open Design Navigator"
        >
          <Compass size={18} color="#C5A880" />
          <span>Design Navigator</span>
          <span
            style={{
              backgroundColor: isAdmin ? 'var(--accent-rose)' : 'rgba(255,255,255,0.15)',
              color: '#FFF',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}
          >
            {isAdmin ? 'Admin' : 'Store'}
          </span>
        </button>
      )}

      {/* Expanded Design Showcase Drawer / Modal */}
      {isOpen && (
        <div
          style={{
            width: 'min(420px, calc(100vw - 32px))',
            maxHeight: 'min(620px, calc(100vh - 40px))',
            backgroundColor: 'var(--bg-card, #FFFFFF)',
            color: 'var(--text-primary, #221F20)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.35)',
            border: '1px solid var(--border-medium, #E5DCD5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'fadeInUp 0.25s ease'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #1E1B18 0%, #2A2421 100%)',
              color: '#FAF7F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(197, 168, 128, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#C5A880" />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                  Design Showcase Navigator
                </h4>
                <p style={{ margin: 0, fontSize: '0.72rem', opacity: 0.75, color: '#C5A880' }}>
                  100% Frontend • Pure UI Preview
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FAF7F5',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Controls Bar */}
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'var(--bg-secondary, #F9F6F0)',
              borderBottom: '1px solid var(--border-subtle, #EDE5DE)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              flexWrap: 'wrap'
            }}
          >
            {/* Role Switcher */}
            <button
              onClick={() => switchRole(isAdmin ? 'customer' : 'admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-medium, #E5DCD5)',
                backgroundColor: 'var(--bg-card, #FFF)',
                color: 'var(--text-primary, #221F20)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Toggle current mode"
            >
              <Shield size={14} color="var(--accent-rose, #C26D74)" />
              <span>Mode: <strong>{isAdmin ? 'Admin' : 'Customer'}</strong></span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-medium, #E5DCD5)',
                backgroundColor: 'var(--bg-card, #FFF)',
                color: 'var(--text-primary, #221F20)',
                fontSize: '0.78rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              title="Toggle Light / Dark theme"
            >
              <Sun size={14} />
              <span>Theme</span>
            </button>

            {/* Reset Mock Data */}
            <button
              onClick={handleResetData}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-medium, #E5DCD5)',
                backgroundColor: 'var(--bg-card, #FFF)',
                color: 'var(--text-muted, #736B63)',
                fontSize: '0.78rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
              title="Reset sample orders and products to showroom defaults"
            >
              <RotateCcw size={13} />
              <span>Reset Data</span>
            </button>
          </div>

          {/* Section Tabs */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--border-subtle, #EDE5DE)',
              backgroundColor: 'var(--bg-card, #FFF)'
            }}
          >
            <button
              onClick={() => setActiveTab('storefront')}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === 'storefront' ? '2px solid var(--accent-rose, #C26D74)' : '2px solid transparent',
                color: activeTab === 'storefront' ? 'var(--accent-rose, #C26D74)' : 'var(--text-muted, #736B63)',
                fontWeight: activeTab === 'storefront' ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ShoppingBag size={14} />
              <span>Storefront ({storefrontPages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: 'none',
                background: 'none',
                borderBottom: activeTab === 'admin' ? '2px solid var(--accent-rose, #C26D74)' : '2px solid transparent',
                color: activeTab === 'admin' ? 'var(--accent-rose, #C26D74)' : 'var(--text-muted, #736B63)',
                fontWeight: activeTab === 'admin' ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Shield size={14} />
              <span>Admin Suite ({adminPages.length})</span>
            </button>
          </div>

          {/* Page Links List */}
          <div
            style={{
              padding: '10px',
              overflowY: 'auto',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            {(activeTab === 'storefront' ? storefrontPages : adminPages).map((p) => {
              const isCurrent = location.pathname === p.path.split('?')[0];
              return (
                <button
                  key={p.path}
                  onClick={() => {
                    navigate(p.path);
                    setIsOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isCurrent ? 'var(--accent-rose-light, #F9ECEE)' : 'transparent',
                    color: isCurrent ? 'var(--accent-rose, #C26D74)' : 'var(--text-primary, #221F20)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) e.currentTarget.style.backgroundColor = 'var(--bg-secondary, #F9F6F0)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: isCurrent ? 700 : 500, fontSize: '0.85rem' }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted, #8C827A)' }}>
                      {p.path}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      backgroundColor: isCurrent ? 'var(--accent-rose, #C26D74)' : 'var(--border-subtle, #EDE5DE)',
                      color: isCurrent ? '#FFF' : 'var(--text-secondary, #5C544E)'
                    }}
                  >
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div
            style={{
              padding: '8px 14px',
              backgroundColor: 'var(--bg-secondary, #F9F6F0)',
              borderTop: '1px solid var(--border-subtle, #EDE5DE)',
              fontSize: '0.72rem',
              color: 'var(--text-muted, #8C827A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>Sri Lakshmi Luxury Design Suite</span>
            <span>Zero Backend Required</span>
          </div>
        </div>
      )}
    </div>
  );
};
