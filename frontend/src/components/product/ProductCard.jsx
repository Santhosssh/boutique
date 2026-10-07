import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const mainImage =
    (product.images && product.images[0]) ||
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="product-card">
      {/* Product Image Wrapper */}
      <div className="product-img-wrapper">
        <Link to={`/products/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          <img
            src={mainImage}
            alt={product.name}
            className="product-img"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="product-badge-group">
          {product.badge && (
            <span className="badge badge-rose" style={{ boxShadow: 'var(--shadow-sm)' }}>
              {product.badge}
            </span>
          )}
          {product.discount > 0 && !product.badge?.includes('%') && (
            <span className="badge badge-gold" style={{ boxShadow: 'var(--shadow-sm)' }}>
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`product-wishlist-btn ${inWishlist ? 'active' : ''}`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Card Details */}
      <div className="product-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="product-category-tag">{product.category}</span>
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem', color: '#B58D3D', fontWeight: 600 }}>
              <Star size={13} fill="currentColor" stroke="none" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>({product.reviewsCount || 0})</span>
            </div>
          )}
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        {/* Stock Alert */}
        <div style={{ margin: '4px 0 8px', fontSize: '0.75rem' }}>
          {product.stock > 0 && product.stock <= 5 ? (
            <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>
              ⚡ Only {product.stock} pieces remaining
            </span>
          ) : product.stock > 5 ? (
            <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>
              In Stock
            </span>
          ) : (
            <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>
              Temporarily Sold Out
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="product-pricing">
          <span className="product-current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-original-price">{formatPrice(product.originalPrice)}</span>
          )}
          {product.discount > 0 && (
            <span className="product-discount-tag">({product.discount}% OFF)</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="product-actions-hover">
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock <= 0}
            className="btn btn-primary btn-sm"
            style={{
              flex: 1,
              opacity: product.stock <= 0 ? 0.6 : 1,
              cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <ShoppingBag size={15} />
            {product.stock <= 0 ? 'Sold Out' : 'Add to Bag'}
          </button>
          <Link
            to={`/products/${product.id}`}
            className="btn btn-secondary btn-sm"
            title="View Details"
            style={{ padding: '0.5rem 0.75rem' }}
          >
            <Eye size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};
