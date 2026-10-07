import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="section-padding container" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-rose-light)',
            color: 'var(--accent-rose)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}
        >
          <Heart size={36} />
        </div>
        <h2 style={{ marginBottom: '0.6rem' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Save your favorite sarees, suits, gowns, and jewellery to your private wishlist and revisit them whenever inspiration strikes.
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg">
          Discover Collections <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Private Curation</span>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}>
            My Wishlist ({wishlistItems.length})
          </h1>
          <p style={{ margin: 0 }}>Treasured designs saved for your upcoming festivities and celebrations.</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid-4">
          {wishlistItems.map((prod) => (
            <div
              key={prod.id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <Link to={`/products/${prod.id}`}>
                  <img
                    src={(prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'}
                    alt={prod.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(prod.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-danger)',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  title="Remove from wishlist"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="product-category-tag" style={{ fontSize: '0.74rem' }}>{prod.category}</span>
                <Link to={`/products/${prod.id}`}>
                  <h4 style={{ fontSize: '0.96rem', margin: '2px 0 8px', color: 'var(--text-primary)' }}>
                    {prod.name}
                  </h4>
                </Link>
                <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>
                    {formatPrice(prod.price)}
                  </div>
                  <button
                    onClick={() => moveToCart(prod)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <ShoppingBag size={15} /> Move to Shopping Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

