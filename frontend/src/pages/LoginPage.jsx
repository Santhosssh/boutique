import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, Shield, ArrowRight, UserCheck, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeQuickRole, setActiveQuickRole] = useState(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login(usernameOrEmail, password, remember);
      if (loggedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      // Toast handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  // Instant 1-Click Login
  const handleQuickLogin = async (role) => {
    setActiveQuickRole(role);
    setLoading(true);
    if (role === 'admin') {
      setUsernameOrEmail('admin');
      setPassword('admin');
      try {
        const loggedUser = await login('admin', 'admin', true);
        navigate('/admin');
      } catch (e) {
        // Handled
      } finally {
        setLoading(false);
        setActiveQuickRole(null);
      }
    } else {
      setUsernameOrEmail('user');
      setPassword('user');
      try {
        await login('user', 'user', true);
        navigate('/');
      } catch (e) {
        // Handled
      } finally {
        setLoading(false);
        setActiveQuickRole(null);
      }
    }
  };

  // Pre-fill inputs only (without auto submitting)
  const handleFillInputs = (role, e) => {
    e.stopPropagation();
    if (role === 'admin') {
      setUsernameOrEmail('admin');
      setPassword('admin');
      addToast('Filled Admin credentials (admin / admin)', 'info');
    } else {
      setUsernameOrEmail('user');
      setPassword('user');
      addToast('Filled Customer credentials (user / user)', 'info');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      addToast('Please enter your registered email address', 'error');
      return;
    }
    setShowForgotModal(false);
    addToast(`Password recovery link dispatched to ${forgotEmail}`, 'success');
    setForgotEmail('');
  };

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: 'clamp(2rem, 5vw, 2.8rem)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <span className="section-subtitle">Sri Lakshmi Boutique</span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Sign in to manage your orders, wishlist, or store dashboard.
            </p>
          </div>

          {/* ⚡ 1-Click Demo Login Box */}
          <div
            style={{
              padding: '16px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.8rem',
              border: '1px solid rgba(194, 109, 116, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-rose)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ⚡ 1-Click Demo Login
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Instant access</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {/* Admin Button */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  backgroundColor: 'var(--bg-card)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  disabled={loading}
                  className="btn btn-primary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    padding: '8px 10px',
                    backgroundColor: 'var(--accent-rose)',
                    borderColor: 'var(--accent-rose)'
                  }}
                  id="demo-admin-login-btn"
                >
                  <Shield size={14} />
                  {activeQuickRole === 'admin' ? 'Logging in...' : '1-Click Admin'}
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>admin / admin</span>
                  <button
                    type="button"
                    onClick={(e) => handleFillInputs('admin', e)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '0.7rem', fontWeight: 600 }}
                    title="Fill into form inputs without submitting"
                  >
                    Fill
                  </button>
                </div>
              </div>

              {/* Customer Button */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  backgroundColor: 'var(--bg-card)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <button
                  type="button"
                  onClick={() => handleQuickLogin('customer')}
                  disabled={loading}
                  className="btn btn-secondary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    padding: '8px 10px',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                  id="demo-customer-login-btn"
                >
                  <UserCheck size={14} />
                  {activeQuickRole === 'customer' ? 'Logging in...' : '1-Click Customer'}
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>user / user</span>
                  <button
                    type="button"
                    onClick={(e) => handleFillInputs('customer', e)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '0.7rem', fontWeight: 600 }}
                    title="Fill into form inputs without submitting"
                  >
                    Fill
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* User ID / Email Input */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>User ID or Email</label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin: <strong>admin</strong> | User: <strong>user</strong></span>
              </div>
              <div style={{ position: 'relative' }}>
                <User
                  size={18}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                />
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  placeholder="admin or user"
                  className="form-control"
                  style={{ paddingLeft: '40px' }}
                  required
                  id="login-username-input"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={18}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin or user"
                  className="form-control"
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                  required
                  id="login-password-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.86rem' }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: 'var(--accent-rose)' }}
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              id="login-submit-button"
            >
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Do not have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
              Create an Account
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '0.6rem' }}>Reset Password</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter your registered user ID or email and we will dispatch password recovery instructions.
            </p>
            <form onSubmit={handleForgotPasswordSubmit}>
              <div className="form-group">
                <label className="form-label">User ID or Email</label>
                <input
                  type="text"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin or email"
                  className="form-control"
                  required
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowForgotModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
