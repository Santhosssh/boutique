import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../services/api';
import { useCart } from './CartContext';
import { useNotification } from './NotificationContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() =>
    getFromStorage(STORAGE_KEYS.WISHLIST, [])
  );
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, wishlistItems);
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  const toggleWishlist = (product) => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(product.id)));
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlistItems((prev) => [product, ...prev]);
      addToast(`Saved "${product.name}" to wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(productId)));
    addToast('Item removed from wishlist', 'info');
  };

  const moveToCart = (product, selectedSize = null, selectedColor = null) => {
    addToCart(product, 1, selectedSize, selectedColor);
    removeFromWishlist(product.id);
    addToast(`Moved "${product.name}" to bag`, 'success');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
