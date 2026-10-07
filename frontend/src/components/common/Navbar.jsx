import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Shield,
  Package,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { itemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAdmin, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--accent-rose)' : 'var(--text-primary)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.94rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    padding: '0.4rem 0',
    position: 'relative',
    transition: 'color var(--transition-fast)'
  });

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div
        style={{
          backgroundColor: '#231F20',
          color: '#FAF7F5',
          fontSize: '0.78rem',
          letterSpacing: '0.08em',
          padding: '7px 1rem',
          textAlign: 'center',
          fontWeight: 500,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <span>✨ COMPLIMENTARY EXPRESS DELIVERY ON ORDERS OVER ₹2,999 ✨</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <button
          onClick={() => switchRole(isAdmin ? 'customer' : 'admin')}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#FAF7F5',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            cursor: 'pointer'
          }}
          title="Click to toggle between Customer and Admin mode"
        >
          Active: <strong>{isAdmin ? 'ADMIN' : 'CUSTOMER'}</strong> (Switch)
        </button>
      </div>

      {/* Main Sticky Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: scrolled ? 'var(--bg-glass)' : 'var(--bg-card)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          borderBottom: '1px solid var(--border-subtle)',
          transition: 'all var(--transition-normal)'
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-only-btn"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px'
            }}
            aria-label="Toggle navigation menu"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Boutique Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textDecoration: 'none'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
                lineHeight: 1
              }}
            >
              SRI LAKSHMI
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                color: 'var(--accent-rose)',
                fontWeight: 700,
                marginTop: '3px'
              }}
            >
              BOUTIQUE & SILKS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-nav-links"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem'
            }}
          >
            <NavLink to="/" style={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/shop" style={navLinkStyle}>
              Shop
            </NavLink>
            <NavLink to="/shop?category=sarees" style={navLinkStyle}>
              Sarees
            </NavLink>
            <NavLink to="/shop?category=chudidars" style={navLinkStyle}>
              Suits
            </NavLink>
            <NavLink to="/shop?category=western" style={navLinkStyle}>
              Western
            </NavLink>
            <NavLink to="/shop?category=jewellery" style={navLinkStyle}>
              Jewellery
            </NavLink>
            <a href="/#about" style={navLinkStyle({ isActive: false })}>
              About
            </a>
            <a href="/#contact" style={navLinkStyle({ isActive: false })}>
              Contact
            </a>
          </nav>

          {/* Right Action Icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="btn-icon"
              title="Search collection"
              id="search-button-trigger"
              aria-label="Search collection"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="btn-icon"
              title="Saved items"
              style={{ position: 'relative' }}
              id="wishlist-header-link"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistItems.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: 'var(--accent-rose)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                  }}
                >
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="btn-icon"
              title="Shopping Cart"
              style={{ position: 'relative' }}
              id="cart-header-link"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    backgroundColor: 'var(--accent-rose)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1
                  }}
                >
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="btn-icon"
                title="Account"
                id="user-account-dropdown-btn"
                aria-label="User Account"
                style={{
                  borderColor: accountMenuOpen ? 'var(--accent-rose)' : 'var(--border-subtle)'
                }}
              >
                <User size={19} />
              </button>

              {accountMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 10px)',
                    width: '240px',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.6rem 0',
                    zIndex: 1000,
                    animation: 'slideUp 0.18s ease-out'
                  }}
                >
                  <div
                    style={{
                      padding: '0.7rem 1.2rem',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px'
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                      {user ? user.name : 'Welcome Guest'}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {user ? user.email : 'Sign in to access bag & orders'}
                    </span>
                  </div>

                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <User size={16} /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <Package size={16} /> My Orders
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <Settings size={16} /> Account Settings
                      </Link>

                      <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', margin: '0.4rem 0' }} />

                      <Link
                        to="/admin"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--accent-rose)',
                          fontWeight: 600
                        }}
                      >
                        <Shield size={16} /> Admin Panel
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setAccountMenuOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--color-danger)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--accent-rose)',
                          fontWeight: 600
                        }}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setAccountMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '0.65rem 1.2rem',
                          fontSize: '0.88rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-secondary)',
              padding: '1rem 0'
            }}
          >
            <div className="container">
              <form
                onSubmit={handleSearchSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  maxWidth: '700px',
                  margin: '0 auto'
                }}
              >
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)'
                    }}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Kanchipuram sarees, anarkalis, gowns, jewellery..."
                    autoFocus
                    className="form-control"
                    style={{
                      paddingLeft: '44px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--bg-card)'
                    }}
                    id="search-input-field"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-full)' }}>
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="btn btn-ghost"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: 'var(--header-height)',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'var(--bg-card)',
              zIndex: 999,
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                All Collections
              </Link>
              <Link
                to="/shop?category=sarees"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                Sarees
              </Link>
              <Link
                to="/shop?category=chudidars"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                Chudidars & Suits
              </Link>
              <Link
                to="/shop?category=western"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                Western Wear
              </Link>
              <Link
                to="/shop?category=jewellery"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                Jewellery
              </Link>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', borderBottom: '1px solid var(--border-subtle)' }}
              >
                My Orders
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1.1rem', fontWeight: 600, padding: '0.6rem 0', color: 'var(--accent-rose)' }}
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav-links { display: none !important; }
          .mobile-only-btn { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
};
