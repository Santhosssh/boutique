import React, { useState } from 'react';
import {
  User,
  Lock,
  MapPin,
  Bell,
  Shield,
  Trash2,
  Plus,
  Check,
  AlertTriangle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export const UserSettingsPage = () => {
  const { user, updateProfile, changePassword, addAddress, deleteAddress, logout } = useAuth();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'security', 'addresses', 'notifications'

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notification Toggles
  const [emailNotify, setEmailNotify] = useState(user?.notifications?.email ?? true);
  const [smsNotify, setSmsNotify] = useState(user?.notifications?.sms ?? true);
  const [promotionsNotify, setPromotionsNotify] = useState(user?.notifications?.promotions ?? false);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: 'Home',
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Delete Account Confirmation Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(profileData);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match', 'error');
      return;
    }
    await changePassword(currentPassword, newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    if (!newAddr.address || !newAddr.pincode || !newAddr.city) {
      addToast('Please fill all address fields', 'error');
      return;
    }
    await addAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      title: 'Home',
      name: user?.name || '',
      phone: user?.phone || '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
  };

  const handleNotificationSave = async () => {
    await updateProfile({
      notifications: {
        email: emailNotify,
        sms: smsNotify,
        promotions: promotionsNotify
      }
    });
    addToast('Notification preferences saved', 'success');
  };

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1050px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Client Portal</span>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
            Account & Preference Settings
          </h1>
          <p style={{ margin: 0 }}>Manage your personal details, delivery addresses, and security settings.</p>
        </div>

        {/* Tab Navigation Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="settings-layout-grid"
        >
          {/* Sidebar Tabs */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'profile' ? 600 : 500,
                color: activeTab === 'profile' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'profile' ? 'var(--accent-rose-light)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <User size={18} /> Profile Info
            </button>

            <button
              onClick={() => setActiveTab('security')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'security' ? 600 : 500,
                color: activeTab === 'security' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'security' ? 'var(--accent-rose-light)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <Lock size={18} /> Password & Security
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'addresses' ? 600 : 500,
                color: activeTab === 'addresses' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'addresses' ? 'var(--accent-rose-light)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <MapPin size={18} /> Saved Addresses
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'notifications' ? 600 : 500,
                color: activeTab === 'notifications' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'notifications' ? 'var(--accent-rose-light)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <Bell size={18} /> Notifications
            </button>

            <button
              onClick={() => setActiveTab('privacy')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.8rem 1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.92rem',
                fontWeight: activeTab === 'privacy' ? 600 : 500,
                color: activeTab === 'privacy' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                backgroundColor: activeTab === 'privacy' ? 'var(--accent-rose-light)' : 'transparent',
                textAlign: 'left'
              }}
            >
              <Shield size={18} /> Privacy & Danger
            </button>
          </div>

          {/* Tab Content Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {/* 1. Profile Info Form */}
            {activeTab === 'profile' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Personal Profile Information</h3>
                <form onSubmit={handleProfileSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="form-control"
                      required
                    />
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary">
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 2. Security / Change Password */}
            {activeTab === 'security' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Update Password</h3>
                <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '480px' }}>
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="form-control"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">New Password (minimum 6 characters)</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-control"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 3. Address Management */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Saved Delivery Addresses</h3>
                  <button onClick={() => setShowAddressModal(true)} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                    <Plus size={15} /> Add New Address
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {user?.addresses && user.addresses.length > 0 ? (
                    user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        style={{
                          padding: '1.2rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-medium)',
                          backgroundColor: addr.isDefault ? 'var(--accent-rose-light)' : 'transparent',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '0.96rem' }}>{addr.title || 'Address'}</strong>
                            {addr.isDefault && (
                              <span className="badge badge-rose" style={{ fontSize: '0.7rem' }}>Default</span>
                            )}
                          </div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{addr.name}</div>
                          <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            {addr.address}, {addr.city}, {addr.state} - {addr.pincode}<br />
                            Phone: {addr.phone}
                          </div>
                        </div>

                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="btn btn-ghost"
                          style={{ color: 'var(--color-danger)', padding: '6px' }}
                          title="Delete address"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No saved addresses yet. Click above to add one.</p>
                  )}
                </div>
              </div>
            )}

            {/* 4. Notification Preferences */}
            {activeTab === 'notifications' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Notification Preferences</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Email Order Notifications</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Receive digital receipts and shipment dispatched alerts via email.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailNotify}
                      onChange={(e) => setEmailNotify(e.target.checked)}
                      style={{ accentColor: 'var(--accent-rose)', width: '20px', height: '20px' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>SMS & WhatsApp Delivery Alerts</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Real-time courier transit and out-for-delivery OTP notifications.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsNotify}
                      onChange={(e) => setSmsNotify(e.target.checked)}
                      style={{ accentColor: 'var(--accent-rose)', width: '20px', height: '20px' }}
                    />
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Haute Couture Gazette & Exclusive Invites</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Invitations to seasonal preview sales and bespoke trunk shows.
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={promotionsNotify}
                      onChange={(e) => setPromotionsNotify(e.target.checked)}
                      style={{ accentColor: 'var(--accent-rose)', width: '20px', height: '20px' }}
                    />
                  </label>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <button onClick={handleNotificationSave} className="btn btn-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* 5. Privacy & Delete Account */}
            {activeTab === 'privacy' && (
              <div>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Privacy & Data Management</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ padding: '1.2rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>Account Sign Out</h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Sign out of your active browser session on this device.
                    </p>
                    <button onClick={logout} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
                      <LogOut size={15} /> Sign Out Now
                    </button>
                  </div>

                  <div style={{ padding: '1.2rem', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-danger-bg)' }}>
                    <h4 style={{ fontSize: '1rem', color: 'var(--color-danger)', marginBottom: '6px' }}>
                      Delete Account Data
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-danger)', marginBottom: '1rem' }}>
                      Permanently wipe your customer profile, saved addresses, and active orders history. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: 'var(--color-danger)' }}
                    >
                      Delete Account Permanently
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddressModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Add New Delivery Address</h3>
            <form onSubmit={handleAddAddressSubmit}>
              <div className="form-group">
                <label className="form-label">Address Tag / Label</label>
                <input
                  type="text"
                  value={newAddr.title}
                  onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })}
                  placeholder="Home, Atelier, Studio..."
                  className="form-control"
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Recipient Name</label>
                  <input
                    type="text"
                    value={newAddr.name}
                    onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <textarea
                  rows="2"
                  value={newAddr.address}
                  onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">PIN</label>
                  <input
                    type="text"
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  checked={newAddr.isDefault}
                  onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
                  style={{ accentColor: 'var(--accent-rose)' }}
                />
                <span>Set as primary default address</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setShowAddressModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-danger)', marginBottom: '0.8rem' }}>Delete Account Warning</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
              Are you completely certain you want to remove your Sri Lakshmi Boutique profile? All saved designs, measurements, and order tracking logs will be deleted immediately.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowDeleteModal(false)} className="btn btn-secondary">
                No, Keep Account
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowDeleteModal(false);
                  addToast('Your account was deleted from mock storage.', 'info');
                }}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--color-danger)' }}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .settings-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

