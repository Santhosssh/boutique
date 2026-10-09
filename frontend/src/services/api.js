// Pure Frontend Reactive Mock Storage Provider
// Sri Lakshmi Boutique - 100% Frontend Client (Zero Backend Dependencies)

import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_STORE_SETTINGS
} from '../utils/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'sri_lakshmi_products',
  CATEGORIES: 'sri_lakshmi_categories',
  ORDERS: 'sri_lakshmi_orders',
  CUSTOMERS: 'sri_lakshmi_customers',
  SETTINGS: 'sri_lakshmi_settings',
  USER: 'sri_lakshmi_current_user',
  CART: 'sri_lakshmi_cart',
  WISHLIST: 'sri_lakshmi_wishlist'
};

// Initialize persistent local storage if empty
export const initializeLocalStorage = (forceReset = false) => {
  // Migrate legacy keys if present
  const legacyKeys = {
    [STORAGE_KEYS.PRODUCTS]: 'aura_boutique_products',
    [STORAGE_KEYS.CATEGORIES]: 'aura_boutique_categories',
    [STORAGE_KEYS.ORDERS]: 'aura_boutique_orders',
    [STORAGE_KEYS.CUSTOMERS]: 'aura_boutique_customers',
    [STORAGE_KEYS.SETTINGS]: 'aura_boutique_settings',
  };

  Object.entries(legacyKeys).forEach(([newKey, oldKey]) => {
    if (!localStorage.getItem(newKey) && localStorage.getItem(oldKey)) {
      try {
        localStorage.setItem(newKey, localStorage.getItem(oldKey));
      } catch (e) {
        // ignore
      }
    }
  });

  if (forceReset || !localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(INITIAL_CUSTOMERS));
  }
  if (forceReset || !localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_STORE_SETTINGS));
  }
};

// Reset all mock storage back to initial sample showroom state
export const resetStorageToDefault = () => {
  initializeLocalStorage(true);
};

// Ensure storage is initialized on load
initializeLocalStorage();

export const getFromStorage = (key, fallback = []) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Storage parse error:', e);
    return fallback;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage save error:', e);
  }
};

export { STORAGE_KEYS };

// Simulated UI transition delay for realistic feel
export const mockDelay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

