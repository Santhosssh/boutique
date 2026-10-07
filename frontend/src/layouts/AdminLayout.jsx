import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout, switchRole, isAdmin } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      addToast('Dark theme enabled', 'info');
    } else {
      document.documentElement.removeAttribute('data-theme');
      addToast('Light theme enabled', 'info');
    }
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '0.8rem 1.2rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.92rem',
    fontWeight: isActive ? 600 : 500,
    color: isActive ? 'var(--accent-rose)' : 'var(--text-secondary)',
    backgroundColor: isActive ? 'var(--accent-rose-light)' : 'transparent',
    transition: 'all var(--transition-fast)',
    textDecoration: 'none'
  });

  const getBreadcrumbTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard Overview';
    if (path.includes('/admin/products/add')) return 'Add New Product';
    if (path.includes('/admin/products') && path.includes('/edit')) return 'Edit Product';
    if (path.includes('/admin/products')) return 'Product Inventory Management';
    if (path.includes('/admin/categories')) return 'Category Management';
    if (path.includes('/admin/orders/')) return 'Order Details';
    if (path.includes('/admin/orders')) return 'Order Management';
    if (path.includes('/admin/customers')) return 'Customer Directory';
    if (path.includes('/admin/reports')) return 'Sales & Performance Reports';
    if (path.includes('/admin/settings')) return 'Store & Admin Settings';
    return 'Admin Portal';
  };

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 95
          }}
        />
      )}

      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Brand Header */}
        <div
          style={{
            padding: '1.6rem 1.4rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '0.06em'
              }}
            >
              SRI LAKSHMI
            </span>
            <span
              className="badge badge-rose"
              style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}
            >
              PORTAL
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            className="mobile-close-sidebar"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav
          style={{
            padding: '1.2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            flex: 1,
            overflowY: 'auto'
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              padding: '0.4rem 0.8rem'
            }}
          >
            Core Operations
          </div>

          <NavLink to="/admin" end style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/products" style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <Package size={18} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/admin/categories" style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <Layers size={18} />
            <span>Categories</span>
          </NavLink>

          <NavLink to="/admin/orders" style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <ShoppingBag size={18} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/admin/customers" style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <Users size={18} />
            <span>Customers</span>
          </NavLink>

          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              padding: '0.8rem 0.8rem 0.4rem'
            }}
          >
            Analytics & System
          </div>

          <NavLink to="/admin/reports" style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <BarChart3 size={18} />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/admin/settings" style={navItemStyle} onClick={() => setSidebarOpen(false)}>
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* Sidebar Footer */}
        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.65rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExternalLink size={15} /> Storefront
            </span>
            <ChevronRight size={14} />
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.65rem 0.9rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              color: 'var(--color-danger)',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.8rem',
            position: 'sticky',
            top: 0,
            zIndex: 80
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="admin-hamburger"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)'
              }}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <h4 style={{ margin: 0, fontSize: '1.15rem' }}>{getBreadcrumbTitle()}</h4>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Boutique Management Suite
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Quick Role status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.35rem 0.75rem',
                backgroundColor: 'var(--accent-rose-light)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--accent-rose)'
              }}
            >
              <ShieldCheck size={14} />
              <span>Admin Privileges Active</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="btn-icon"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{ width: '38px', height: '38px' }}
            >
              {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Admin Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80'
                }
                alt="Admin"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-rose)'
                }}
              />
              <div style={{ display: 'none' }} className="admin-user-info">
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  {user?.name || 'Administrator'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <div style={{ padding: 'clamp(1.2rem, 3vw, 2.2rem)', flex: 1 }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-hamburger { display: block !important; }
          .mobile-close-sidebar { display: block !important; }
        }
        @media (min-width: 768px) {
          .admin-user-info { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </div>
  );
};
