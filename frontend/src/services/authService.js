import { getFromStorage, saveToStorage, STORAGE_KEYS, mockDelay } from './api';

const DEFAULT_USER = {
  id: 'usr-999',
  name: 'Meera Nambiar',
  email: 'meera.nambiar@gmail.com',
  username: 'user',
  phone: '+91 94470 99881',
  role: 'customer', // 'customer' or 'admin'
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  addresses: [
    {
      id: 'addr-1',
      title: 'Home (Primary)',
      name: 'Meera Nambiar',
      phone: '+91 94470 99881',
      address: 'Skyline Waterfront, Flat 12B, Marine Drive',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682011',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Studio / Work',
      name: 'Meera Nambiar',
      phone: '+91 94470 99881',
      address: 'Sri Lakshmi Silks Atelier, 4th Floor',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      isDefault: false
    }
  ],
  notifications: {
    email: true,
    sms: true,
    promotions: false
  }
};

const DEFAULT_ADMIN = {
  id: 'adm-001',
  name: 'Administrator (Sri Lakshmi)',
  email: 'admin@srilakshmiboutique.com',
  username: 'admin',
  phone: '+91 99000 11223',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  notifications: {
    email: true,
    sms: true,
    lowStock: true
  }
};

export const authService = {
  async getCurrentUser() {
    await mockDelay(60);
    const user = getFromStorage(STORAGE_KEYS.USER, null);
    if (!user) {
      // Default to logged-in customer for seamless testing experience
      saveToStorage(STORAGE_KEYS.USER, DEFAULT_USER);
      return DEFAULT_USER;
    }
    return user;
  },

  async login(usernameOrEmail, password, remember = true) {
    await mockDelay(200);
    if (!usernameOrEmail) throw new Error('Please enter User ID or Email');

    const identifier = usernameOrEmail.trim().toLowerCase();

    // Admin login validation (User ID: admin, Password: admin)
    if (identifier === 'admin' || identifier === 'admin@srilakshmiboutique.com') {
      if (!password || (password.trim() !== 'admin' && password.trim() !== 'admin123')) {
        throw new Error('Invalid Admin credentials. Use User ID: admin and Password: admin');
      }
      const adminUser = { ...DEFAULT_ADMIN };
      if (remember) {
        localStorage.setItem('sri_lakshmi_remember_token', 'true');
      }
      saveToStorage(STORAGE_KEYS.USER, adminUser);
      return adminUser;
    }

    // Customer login (User ID: user, Password: user)
    let user;
    if (identifier === 'user') {
      if (password && password.trim() !== 'user' && password.trim() !== 'user123') {
        throw new Error('Invalid Customer credentials. Use User ID: user and Password: user');
      }
      user = { ...DEFAULT_USER };
    } else {
      user = {
        ...DEFAULT_USER,
        email: identifier.includes('@') ? identifier : `${identifier}@gmail.com`,
        username: identifier,
        name: identifier.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      };
    }

    if (remember) {
      localStorage.setItem('sri_lakshmi_remember_token', 'true');
    }
    saveToStorage(STORAGE_KEYS.USER, user);
    return user;
  },

  async register(name, email, phone, password) {
    await mockDelay(220);
    if (!email || !name) throw new Error('Name and email are required');

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 98000 00000',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      addresses: [],
      notifications: {
        email: true,
        sms: true,
        promotions: true
      }
    };

    saveToStorage(STORAGE_KEYS.USER, newUser);
    return newUser;
  },

  async logout() {
    await mockDelay(100);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem('sri_lakshmi_remember_token');
    return true;
  },

  async updateProfile(updates) {
    await mockDelay(150);
    const currentUser = await this.getCurrentUser();
    const updated = { ...currentUser, ...updates };
    saveToStorage(STORAGE_KEYS.USER, updated);
    return updated;
  },

  async changePassword(currentPassword, newPassword) {
    await mockDelay(180);
    if (!newPassword || newPassword.length < 5) {
      throw new Error('New password must be at least 5 characters');
    }
    return { success: true, message: 'Password updated successfully' };
  },

  async addAddress(addressData) {
    await mockDelay(120);
    const user = await this.getCurrentUser();
    const newAddr = {
      id: `addr-${Date.now()}`,
      ...addressData
    };
    if (newAddr.isDefault) {
      user.addresses = user.addresses.map((a) => ({ ...a, isDefault: false }));
    }
    user.addresses = [...(user.addresses || []), newAddr];
    saveToStorage(STORAGE_KEYS.USER, user);
    return user;
  },

  async deleteAddress(addressId) {
    await mockDelay(100);
    const user = await this.getCurrentUser();
    user.addresses = (user.addresses || []).filter((a) => a.id !== addressId);
    saveToStorage(STORAGE_KEYS.USER, user);
    return user;
  }
};
