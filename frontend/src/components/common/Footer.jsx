import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Globe, MessageCircle, Share2, Heart } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { addToast } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('Thank you for subscribing to Sri Lakshmi Boutique Privé!', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer
      style={{
        backgroundColor: '#181516',
        color: '#E8E4E1',
        paddingTop: '4.5rem',
        paddingBottom: '2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="container">
        {/* Newsletter Section */}
        <div
          style={{
            backgroundColor: '#231E20',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '4.5rem',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--accent-rose)',
                fontWeight: 700
              }}
            >
              Exclusive Invitations & Previews
            </span>
            <h3
              style={{
                color: '#FAF7F5',
                marginTop: '0.4rem',
                marginBottom: '0.6rem',
                fontSize: '1.75rem'
              }}
            >
              Subscribe to the Sri Lakshmi Gazette
            </h3>
            <p style={{ color: '#A9A2A3', fontSize: '0.92rem' }}>
              Receive seasonal runway lookbooks, private salon invites, and complimentary bespoke styling guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="form-control"
              style={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#FAF7F5',
                borderRadius: 'var(--radius-sm)'
              }}
              id="newsletter-email-input"
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ whiteSpace: 'nowrap' }}
              id="newsletter-submit-btn"
            >
              Join Privé <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* 4-Column Footer Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#FAF7F5'
                }}
              >
                SRI LAKSHMI
              </span>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  color: 'var(--accent-rose)',
                  fontWeight: 700
                }}
              >
                BOUTIQUE & SILKS
              </div>
            </div>
            <p style={{ color: '#A9A2A3', fontSize: '0.88rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Celebrating timeless Indian craftsmanship through bespoke bridal silks, artisanal embroideries, and refined contemporary silhouettes.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href="#atelier"
                className="btn-icon"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#FAF7F5', borderColor: 'transparent' }}
                aria-label="Atelier Online"
              >
                <Globe size={17} />
              </a>
              <a
                href="#concierge"
                className="btn-icon"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#FAF7F5', borderColor: 'transparent' }}
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href="#share"
                className="btn-icon"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#FAF7F5', borderColor: 'transparent' }}
                aria-label="Share Collection"
              >
                <Share2 size={17} />
              </a>
            </div>
          </div>

          {/* Couture Collections */}
          <div>
            <h4 style={{ color: '#FAF7F5', fontSize: '1.05rem', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)' }}>
              Couture Collections
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/shop?category=sarees" style={{ color: '#A9A2A3' }}>
                  Kanchipuram & Banarasi Silks
                </Link>
              </li>
              <li>
                <Link to="/shop?category=chudidars" style={{ color: '#A9A2A3' }}>
                  Anarkalis & Chudidars
                </Link>
              </li>
              <li>
                <Link to="/shop?category=western" style={{ color: '#A9A2A3' }}>
                  Satin & Velvet Evening Gowns
                </Link>
              </li>
              <li>
                <Link to="/shop?category=jewellery" style={{ color: '#A9A2A3' }}>
                  Heirloom Jadau & Kundan Jewellery
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kids" style={{ color: '#A9A2A3' }}>
                  Festive Kids Pattu Pavadai
                </Link>
              </li>
              <li>
                <Link to="/shop?category=new-arrivals" style={{ color: '#A9A2A3' }}>
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div>
            <h4 style={{ color: '#FAF7F5', fontSize: '1.05rem', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)' }}>
              Concierge & Client Care
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/orders" style={{ color: '#A9A2A3' }}>
                  Track Your Shipment
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: '#A9A2A3' }}>
                  Bespoke Sizing & Fittings
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: '#A9A2A3' }}>
                  Complimentary Gift Packaging
                </Link>
              </li>
              <li>
                <Link to="/settings" style={{ color: '#A9A2A3' }}>
                  Shipping & Return Policy
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: 'var(--accent-rose)' }}>
                  Merchant / Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutique Flagship Contact */}
          <div id="contact">
            <h4 style={{ color: '#FAF7F5', fontSize: '1.05rem', marginBottom: '1.2rem', fontFamily: 'var(--font-sans)' }}>
              Flagship Atelier
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: '#A9A2A3' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--accent-rose)', flexShrink: 0, marginTop: '2px' }} />
                <span>108, Indiranagar 100ft Road, Defence Colony, Bengaluru - 560038</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />
                <span>+91 (080) 4128-9900</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />
                <span>concierge@srilakshmiboutique.com</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#807778', paddingTop: '0.3rem' }}>
                Atelier Hours: Mon - Sun, 10:00 AM – 9:00 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#8A8283'
          }}
        >
          <div>
            © {new Date().getFullYear()} SRI LAKSHMI BOUTIQUE. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Verified 256-Bit SSL Secured</span>
            <span>•</span>
            <span>Handcrafted in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
