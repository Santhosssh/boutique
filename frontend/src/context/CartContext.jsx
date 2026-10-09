import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../services/api';
import { useNotification } from './NotificationContext';

const CartContext = createContext(null);

const DEFAULT_CART_ITEMS = [
  {
    cartItemId: 'prod-001-Free Size-Crimson Red & Gold',
    productId: 'prod-001',
    name: 'Royal Crimson Kanchipuram Pure Silk Saree',
    price: 18500,
    originalPrice: 22500,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    category: 'Sarees',
    size: 'Free Size',
    color: 'Crimson Red & Gold',
    quantity: 1
  },
  {
    cartItemId: 'prod-006-Standard-Deep Wine',
    productId: 'prod-006',
    name: 'Bespoke Zardozi & Velvet Embroidered Potli',
    price: 3899,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    category: 'Accessories',
    size: 'Standard',
    color: 'Deep Wine',
    quantity: 1
  }
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : DEFAULT_CART_ITEMS;
  });
  const [appliedCoupon, setAppliedCoupon] = useState({ code: 'LAKSHMI10', discountPercent: 10 });
  const { addToast } = useNotification();

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, cartItems);
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const cartItemId = `${product.id}-${size}-${color}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        addToast(`Updated quantity for "${product.name}" in bag`, 'info');
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        addToast(`Added "${product.name}" to shopping bag`, 'success');
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images && product.images[0],
            category: product.category,
            size,
            color,
            quantity
          }
        ];
      }
    });
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'LAKSHMI10' || cleaned === 'SRI10' || cleaned === 'AURA10') {
      setAppliedCoupon({ code: cleaned, discountPercent: 10 });
      addToast(`Coupon ${cleaned} applied! 10% discount added.`, 'success');
      return true;
    } else if (cleaned === 'FIRST500') {
      setAppliedCoupon({ code: 'FIRST500', flatDiscount: 500 });
      addToast('Coupon FIRST500 applied! ₹500 flat discount added.', 'success');
      return true;
    } else {
      addToast('Invalid coupon code. Try LAKSHMI10 or FIRST500', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Calculations
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      discount = Math.min(subtotal, appliedCoupon.flatDiscount);
    }
  }

  // Free shipping threshold above 2999
  const deliveryCharge = subtotal >= 2999 || subtotal === 0 ? 0 : 199;
  const finalTotal = Math.max(0, subtotal - discount + deliveryCharge);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        discount,
        deliveryCharge,
        finalTotal,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
