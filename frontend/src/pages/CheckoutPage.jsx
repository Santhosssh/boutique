import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  CheckCircle,
  Truck,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { orderService } from '../services/orderService';

export const CheckoutPage = () => {
  const { cartItems, subtotal, discount, deliveryCharge, finalTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  // Primary saved address pre-fill or empty
  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || (user?.addresses && user?.addresses[0]) || null;

  const [formData, setFormData] = useState({
    name: user?.name || defaultAddr?.name || 'Meera Nambiar',
    phone: user?.phone || defaultAddr?.phone || '+91 94470 99881',
    email: user?.email || 'meera.nambiar@gmail.com',
    address: defaultAddr?.address || 'Skyline Waterfront, Flat 12B, Marine Drive',
    city: defaultAddr?.city || 'Kochi',
    state: defaultAddr?.state || 'Kerala',
    pincode: defaultAddr?.pincode || '682011'
  });

  const [paymentMethod, setPaymentMethod] = useState('Online Payment'); // 'Online Payment', 'Cash on Delivery'
  const [onlineType, setOnlineType] = useState('upi'); // 'upi', 'card'
  const [submitting, setSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '500px' }}>
          <h2>No Items to Checkout</h2>
          <p style={{ margin: '1rem 0 2rem', color: 'var(--text-muted)' }}>
            Your shopping bag is empty. Please add boutique creations before proceeding.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.address || !formData.pincode) {
      addToast('Please fill all required shipping address fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customer: {
          id: user?.id || `cust-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: cartItems.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image
        })),
        subtotal,
        discount,
        deliveryCharge,
        total: finalTotal,
        paymentMethod:
          paymentMethod === 'Online Payment'
            ? `Online Payment (${onlineType.toUpperCase()})`
            : 'Cash on Delivery'
      };

      const createdOrder = await orderService.createOrder(orderPayload);
      clearCart();
      addToast(`Order placed successfully! Order #${createdOrder.id}`, 'success');
      navigate(`/orders/confirmed/${createdOrder.id}`, { state: { order: createdOrder } });
    } catch (err) {
      console.error(err);
      addToast('Failed to place order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem'
            }}
          >
            <ChevronLeft size={16} /> Return to Shopping Bag
          </Link>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
            Haute Checkout
          </h1>
          <p style={{ margin: 0 }}>Review your delivery information and select your preferred payment mode.</p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            {/* Left: Shipping & Payment Information */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Shipping Address Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.8rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-rose)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    1
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Delivery Address</h3>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      id="checkout-name-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                      id="checkout-phone-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (for order receipts & tracking) *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    id="checkout-email-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address & Landmark *</label>
                  <textarea
                    name="address"
                    required
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    id="checkout-address-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Mode Selection Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1.8rem',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-rose)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    2
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Payment Method</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Option: Online Payment */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '1.2rem',
                      borderRadius: 'var(--radius-sm)',
                      border: paymentMethod === 'Online Payment' ? '2px solid var(--accent-rose)' : '1px solid var(--border-medium)',
                      backgroundColor: paymentMethod === 'Online Payment' ? 'var(--accent-rose-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Online Payment'}
                      onChange={() => setPaymentMethod('Online Payment')}
                      style={{ accentColor: 'var(--accent-rose)', marginTop: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.96rem' }}>
                          Online Payment (Instant & Secure)
                        </span>
                        <CreditCard size={18} style={{ color: 'var(--accent-rose)' }} />
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Net Banking
                      </p>

                      {paymentMethod === 'Online Payment' && (
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '12px' }}>
                          <button
                            type="button"
                            onClick={() => setOnlineType('upi')}
                            className={`btn btn-sm ${onlineType === 'upi' ? 'btn-primary' : 'btn-secondary'}`}
                          >
                            UPI / QR Scan
                          </button>
                          <button
                            type="button"
                            onClick={() => setOnlineType('card')}
                            className={`btn btn-sm ${onlineType === 'card' ? 'btn-primary' : 'btn-secondary'}`}
                          >
                            Credit / Debit Card
                          </button>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option: Cash on Delivery */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      padding: '1.2rem',
                      borderRadius: 'var(--radius-sm)',
                      border: paymentMethod === 'Cash on Delivery' ? '2px solid var(--accent-rose)' : '1px solid var(--border-medium)',
                      backgroundColor: paymentMethod === 'Cash on Delivery' ? 'var(--accent-rose-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      style={{ accentColor: 'var(--accent-rose)', marginTop: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.96rem' }}>Cash on Delivery (COD)</span>
                        <Banknote size={18} style={{ color: 'var(--accent-gold-hover)' }} />
                      </div>
                      <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                        Pay cash or UPI upon doorstep delivery. Verified by mobile OTP.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
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
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Order Items ({cartItems.length})</h3>

              {/* Items List Snapshot */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.cartItemId} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '50px', height: '64px', borderRadius: '4px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.3 }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Qty: {item.quantity} | {item.size}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.9rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-rose)' }}>
                    <span>Coupon Discount</span>
                    <span style={{ fontWeight: 600 }}>- {formatPrice(discount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Express Delivery</span>
                  <span>{deliveryCharge === 0 ? <strong style={{ color: 'var(--color-success)' }}>FREE</strong> : formatPrice(deliveryCharge)}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '0.3rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>Final Total</span>
                  <span style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '0.5rem' }}
                id="place-order-submit-btn"
              >
                {submitting ? 'Confirming Order...' : 'Place Order'} <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} /> 256-Bit Bank-Grade Encryption
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

