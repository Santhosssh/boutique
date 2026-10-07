import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const {
    cartItems,
    itemCount,
    subtotal,
    discount,
    deliveryCharge,
    finalTotal,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-rose-light)',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <ShoppingBag size={36} />
          </div>
          <h2 style={{ marginBottom: '0.8rem' }}>Your Shopping Bag is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Explore our curated edits of pure silks, bridal chudidars, and haute jewellery to find your signature look.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg" id="empty-cart-discover-btn">
            Discover Collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Calculate free delivery progress
  const freeThreshold = 2999;
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
  const amountRemaining = Math.max(0, freeThreshold - subtotal);

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Bag Overview</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
              Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
            <button onClick={clearCart} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-danger)' }}>
              <Trash2 size={15} /> Clear Bag
            </button>
          </div>
        </div>

        {/* Free Shipping Progress bar */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.2rem 1.6rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '2rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.88rem' }}>
            <span>
              {amountRemaining > 0 ? (
                <>Add <strong>{formatPrice(amountRemaining)}</strong> more for <strong>Complimentary Express Delivery</strong></>
              ) : (
                <strong style={{ color: 'var(--color-success)' }}>✨ You have unlocked Complimentary Express Delivery!</strong>
              )}
            </span>
            <span style={{ fontWeight: 600 }}>{progressPercent}%</span>
          </div>
          <div style={{ height: '7px', backgroundColor: 'var(--bg-secondary)', borderRadius: '10px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: 'var(--accent-rose)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* 2-Column Split: Cart Items & Order Summary */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start'
          }}
        >
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                style={{
                  display: 'flex',
                  gap: '1.2rem',
                  padding: '1.2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                {/* Item Thumbnail */}
                <Link to={`/products/${item.productId}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '90px',
                      height: '115px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0
                    }}
                  />
                </Link>

                {/* Info & Quantity */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="product-category-tag" style={{ fontSize: '0.72rem' }}>{item.category}</span>
                      <Link to={`/products/${item.productId}`}>
                        <h4 style={{ fontSize: '1rem', margin: '2px 0 6px', color: 'var(--text-primary)' }}>
                          {item.name}
                        </h4>
                      </Link>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Size: <strong>{item.size}</strong> | Color: <strong>{item.color}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="btn btn-ghost"
                      style={{ padding: '4px', color: 'var(--text-muted)' }}
                      title="Remove from bag"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity & Unit Total */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px' }}>
                    {/* Quantity counter */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-xs)',
                        backgroundColor: 'var(--bg-card)'
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        style={{ padding: '4px 10px', fontSize: '1rem', cursor: 'pointer' }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ padding: '0 8px', fontSize: '0.88rem', fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        style={{ padding: '4px 10px', fontSize: '1rem', cursor: 'pointer' }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem',
                color: 'var(--accent-rose)',
                fontWeight: 600,
                marginTop: '0.5rem'
              }}
            >
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Right: Order Summary Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '1.8rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4rem'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>Order Summary</h3>

            {/* Coupon Code Input */}
            <div>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. LAKSHMI10)"
                  className="form-control"
                  style={{ textTransform: 'uppercase', fontSize: '0.88rem' }}
                />
                <button type="submit" className="btn btn-secondary btn-sm" style={{ whiteSpace: 'nowrap' }}>
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--accent-rose-light)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.8rem',
                    color: 'var(--accent-rose)',
                    fontWeight: 600
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={13} /> Code <strong>{appliedCoupon.code}</strong> Applied!
                  </span>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-rose)' }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Bag Subtotal</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-rose)' }}>
                  <span>Coupon Discount</span>
                  <span style={{ fontWeight: 600 }}>- {formatPrice(discount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Express Delivery Charge</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <strong style={{ color: 'var(--color-success)' }}>FREE</strong>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>

              <div
                style={{
                  height: '1px',
                  backgroundColor: 'var(--border-subtle)',
                  margin: '0.4rem 0'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>Total Payable</span>
                <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
              id="proceed-to-checkout-btn"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                marginTop: '0.4rem'
              }}
            >
              <ShieldCheck size={16} /> 100% Safe & Encrypted Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

