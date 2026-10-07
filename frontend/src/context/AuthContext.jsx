import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useNotification();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password, remember = true) => {
    try {
      const loggedIn = await authService.login(email, password, remember);
      setUser(loggedIn);
      addToast(`Welcome back, ${loggedIn.name || 'Member'}!`, 'success');
      return loggedIn;
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      throw err;
    }
  };

  const register = async (name, email, phone, password) => {
    try {
      const newUser = await authService.register(name, email, phone, password);
      setUser(newUser);
      addToast('Welcome to Sri Lakshmi Boutique! Your account was created.', 'success');
      return newUser;
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      throw err;
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    addToast('You have been logged out safely.', 'info');
  };

  const updateProfile = async (updates) => {
    try {
      const updated = await authService.updateProfile(updates);
      setUser(updated);
      addToast('Profile updated successfully.', 'success');
      return updated;
    } catch (err) {
      addToast(err.message || 'Failed to update profile', 'error');
      throw err;
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await authService.changePassword(currentPassword, newPassword);
      addToast(res.message, 'success');
      return res;
    } catch (err) {
      addToast(err.message || 'Failed to change password', 'error');
      throw err;
    }
  };

  const addAddress = async (addressData) => {
    try {
      const updated = await authService.addAddress(addressData);
      setUser(updated);
      addToast('New delivery address added.', 'success');
      return updated;
    } catch (err) {
      addToast('Failed to add address', 'error');
      throw err;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const updated = await authService.deleteAddress(addressId);
      setUser(updated);
      addToast('Address removed.', 'info');
      return updated;
    } catch (err) {
      addToast('Failed to delete address', 'error');
      throw err;
    }
  };

  // Helper quick toggle between customer and admin testing mode
  const switchRole = (newRole) => {
    if (!user) return;
    const switched = { ...user, role: newRole };
    setUser(switched);
    localStorage.setItem('sri_lakshmi_current_user', JSON.stringify(switched));
    addToast(`Switched active role to: ${newRole.toUpperCase()}`, 'info');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        addAddress,
        deleteAddress,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
