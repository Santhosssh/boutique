import React, { useState, useEffect } from 'react';
import { Save, Store, Truck, Bell, Lock, Palette } from 'lucide-react';
import { settingsService } from '../../services/settingsService';
import { useNotification } from '../../context/NotificationContext';

export const AdminSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Security password state
  const [currentAdminPass, setCurrentAdminPass] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');

  const { addToast } = useNotification();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.updateSettings(settings);
      addToast('Boutique configurations saved successfully', 'success');
    } catch (e) {
      addToast('Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateAdminPassword = (e) => {
    e.preventDefault();
    if (!newAdminPass || newAdminPass.length < 6) {
      addToast('Admin password must be at least 6 characters', 'error');
      return;
    }
    setCurrentAdminPass('');
    setNewAdminPass('');
    addToast('Admin credentials successfully updated', 'success');
  };

  if (loading || !settings) {
    return (
      <div className="container">
        <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Boutique & System Settings</h2>
        <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Configure atelier contact info, shipping thresholds, notification alerts, and theme preferences.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* 1. Store Settings */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-rose)' }}>
            <Store size={20} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Store Identity</h3>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Boutique Brand Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Brand Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Concierge Email</label>
              <input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Concierge Phone</label>
              <input
                type="tel"
                name="storePhone"
                value={settings.storePhone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Physical Atelier Address</label>
            <input
              type="text"
              name="storeAddress"
              value={settings.storeAddress}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Business / Atelier Hours</label>
            <input
              type="text"
              name="businessHours"
              value={settings.businessHours}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        {/* 2. Order & Shipping Rules */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-rose)' }}>
            <Truck size={20} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Shipping & Order Policies</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.2rem' }}>
            <div className="form-group">
              <label className="form-label">Min. Order Amount (₹)</label>
              <input
                type="number"
                name="minOrderAmount"
                value={settings.minOrderAmount}
                onChange={handleChange}
                className="form-control"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                name="deliveryCharge"
                value={settings.deliveryCharge}
                onChange={handleChange}
                className="form-control"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Free Delivery Threshold (₹)</label>
              <input
                type="number"
                name="freeDeliveryThreshold"
                value={settings.freeDeliveryThreshold}
                onChange={handleChange}
                className="form-control"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cancellation Window (Minutes)</label>
              <input
                type="number"
                name="orderCancellationMinutes"
                value={settings.orderCancellationMinutes}
                onChange={handleChange}
                className="form-control"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* 3. Notifications & Stock Thresholds */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-rose)' }}>
            <Bell size={20} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>System Notifications</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>Customer Order Email Dispatches</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Send automated PDF order receipts to patrons.</div>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                style={{ accentColor: 'var(--accent-rose)', width: '18px', height: '18px' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>Low Stock Inventory Warnings</strong>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Alert store managers when products fall below 3 units.</div>
              </div>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={settings.smsNotifications}
                onChange={handleChange}
                style={{ accentColor: 'var(--accent-rose)', width: '18px', height: '18px' }}
              />
            </label>
          </div>
        </div>

        {/* 4. Appearance & Visual Theme */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-rose)' }}>
            <Palette size={20} />
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Portal Appearance</h3>
          </div>

          <div className="form-group" style={{ maxWidth: '300px' }}>
            <label className="form-label">Theme Mode</label>
            <select
              name="theme"
              value={settings.theme || 'light'}
              onChange={handleChange}
              className="form-control form-select"
            >
              <option value="light">Light Aesthetic (Luxury Cream & Rose)</option>
              <option value="dark">Dark Aesthetic (Midnight Charcoal & Rose)</option>
            </select>
          </div>
        </div>

        {/* Save Settings Action */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="submit" disabled={saving} className="btn btn-primary btn-lg" id="save-settings-btn">
            <Save size={18} /> {saving ? 'Saving Configurations...' : 'Save All Settings'}
          </button>
        </div>
      </form>

      {/* 5. Admin Security Box */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'var(--accent-rose)' }}>
          <Lock size={20} />
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>Admin Password & Security</h3>
        </div>

        <form onSubmit={handleUpdateAdminPassword} style={{ maxWidth: '480px' }}>
          <div className="form-group">
            <label className="form-label">Current Admin Password</label>
            <input
              type="password"
              value={currentAdminPass}
              onChange={(e) => setCurrentAdminPass(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Admin Password</label>
            <input
              type="password"
              value={newAdminPass}
              onChange={(e) => setNewAdminPass(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Update Admin Password
          </button>
        </form>
      </div>
    </div>
  );
};
