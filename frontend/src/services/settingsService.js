import { getFromStorage, saveToStorage, STORAGE_KEYS, mockDelay } from './api';
import { INITIAL_STORE_SETTINGS } from '../utils/mockData';

export const settingsService = {
  async getSettings() {
    await mockDelay(60);
    return getFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_STORE_SETTINGS);
  },

  async updateSettings(newSettings) {
    await mockDelay(150);
    const current = getFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_STORE_SETTINGS);
    const updated = { ...current, ...newSettings };
    saveToStorage(STORAGE_KEYS.SETTINGS, updated);

    // If theme changed, apply immediately to document body
    if (updated.theme) {
      if (updated.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }

    return updated;
  }
};
