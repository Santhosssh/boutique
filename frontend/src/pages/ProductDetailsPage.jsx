import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Ruler,
  Check,
  ChevronRight,
  Share2
} from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useNotification();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Selected Variations
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'details', 'care', 'shipping'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        setActiveImageIndex(0);

        const related = await productService.getRelatedProducts(data.categorySlug, data.id);
        setRelatedProducts(related);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div className="skeleton" style={{ height: '520px', borderRadius: 'var(--radius-md)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="skeleton" style={{ height: '32px', width: '70%' }} />
            <div className="skeleton" style={{ height: '24px', width: '40%' }} />
            <div className="skeleton" style={{ height: '100px', width: '100%' }} />
            <div className="skeleton" style={{ height: '50px', width: '50%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ margin: '1rem 0 2rem' }}>The requested boutique piece may have been archived or sold out.</p>
        <Link to="/shop" className="btn btn-primary">
          Return to Shop
        </Link>
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

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor?.name);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedColor?.name);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const inWishlist = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="product-details-page section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.categorySlug}`} style={{ color: 'var(--text-secondary)' }}>
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product Showcase Split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start'
          }}
        >
          {/* Left: Gallery (Thumbnails & Main Image) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Main Stage View */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                aspectRatio: '3/4',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Wishlist Button Overlay */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`product-wishlist-btn ${inWishlist ? 'active' : ''}`}
                style={{ top: '16px', right: '16px', width: '42px', height: '42px' }}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>

              {/* Discount / Badge */}
              {product.badge && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span className="badge badge-rose" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '74px',
                      height: '92px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0,
                      opacity: activeImageIndex === idx ? 1 : 0.7,
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="product-category-tag" style={{ fontSize: '0.84rem' }}>{product.category}</span>
                <button
                  onClick={handleShare}
                  className="btn btn-ghost btn-sm"
                  style={{ gap: '6px', fontSize: '0.82rem' }}
                >
                  <Share2 size={15} /> Share
                </button>
              </div>

              <h1 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', lineHeight: 1.25, marginBottom: '0.6rem' }}>
                {product.name}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B58D3D', fontWeight: 600 }}>
                  <Star size={16} fill="currentColor" stroke="none" />
                  <span>{product.rating}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount} verified reviews)</span>
                </div>
                <span style={{ color: 'var(--border-medium)' }}>•</span>
                <span style={{ color: 'var(--text-muted)' }}>SKU: <strong>{product.sku}</strong></span>
              </div>
            </div>

            {/* Pricing Section */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                padding: '1rem 1.4rem',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: '1.15rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="badge badge-rose" style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}>
                  Save {product.discount}%
                </span>
              )}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Inclusive of all taxes
              </span>
            </div>

            {/* Description Excerpt */}
            <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {product.description}
            </p>

            {/* Colors Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Select Color: <strong>{selectedColor?.name}</strong></span>
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      title={c.name}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor?.name === c.name ? '3px solid var(--accent-rose)' : '2px solid #FFFFFF',
                        boxShadow: 'var(--shadow-xs)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF'
                      }}
                    >
                      {selectedColor?.name === c.name && <Check size={16} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Select Size: <strong>{selectedSize}</strong>
                  </label>
                  <button
                    onClick={() => addToast('Size Chart: Standard Indian & International Measurements apply', 'info')}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', gap: '4px' }}
                  >
                    <Ruler size={14} /> Size Guide
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '0.6rem 1.1rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        backgroundColor: selectedSize === s ? 'var(--accent-rose)' : 'var(--bg-card)',
                        color: selectedSize === s ? '#FFFFFF' : 'var(--text-primary)',
                        border: selectedSize === s ? '1px solid var(--accent-rose)' : '1px solid var(--border-medium)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Alert & Quantity Counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <label className="form-label">Quantity</label>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-card)'
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '1.1rem' }}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span style={{ padding: '0 0.8rem', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                    style={{ padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '1.1rem' }}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="form-label">Stock Status</label>
                <div style={{ paddingTop: '0.4rem' }}>
                  {product.stock > 0 ? (
                    <span className="badge badge-success">
                      ✓ Available ({product.stock} units ready to dispatch)
                    </span>
                  ) : (
                    <span className="badge badge-danger">Sold Out</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="btn btn-primary btn-lg"
                id="details-add-to-cart-btn"
              >
                <ShoppingBag size={18} /> Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="btn btn-dark btn-lg"
                id="details-buy-now-btn"
              >
                Buy Now
              </button>
            </div>

            {/* Assurance Perks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                padding: '1.2rem',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                marginTop: '1rem'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <ShieldCheck size={20} style={{ color: 'var(--accent-rose)', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>100% Genuine Silk</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Truck size={20} style={{ color: 'var(--accent-gold-hover)', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>Express Delivery</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <RotateCcw size={20} style={{ color: 'var(--color-info)', margin: '0 auto 4px' }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>7-Day Easy Return</div>
              </div>
            </div>

            {/* Detailed Accordion / Tabs */}
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
                <button
                  onClick={() => setActiveTab('description')}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderBottom: activeTab === 'description' ? '2px solid var(--accent-rose)' : 'none',
                    color: activeTab === 'description' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderBottom: activeTab === 'details' ? '2px solid var(--accent-rose)' : 'none',
                    color: activeTab === 'details' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Fabric & Craft
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  style={{
                    padding: '0.6rem 0.8rem',
                    borderBottom: activeTab === 'care' ? '2px solid var(--accent-rose)' : 'none',
                    color: activeTab === 'care' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  Care Guide
                </button>
              </div>

              <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {activeTab === 'description' && (
                  <div>{product.description}</div>
                )}
                {activeTab === 'details' && (
                  <div>
                    <p><strong>Primary Fabric:</strong> {product.fabric || 'Pure Mulberry Silk'}</p>
                    <p><strong>Weave Technique:</strong> Authentic handloom jacquard with pure zari thread warp and weft.</p>
                    <p><strong>Origin:</strong> Handcrafted in India by generational master weavers.</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div>
                    <p>{product.care || 'Dry clean only. Store wrapped in pure muslin cloth away from direct sunlight.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="section-header">
              <span className="section-subtitle">Complementary Ensembles</span>
              <h2 className="section-title">You May Also Admire</h2>
            </div>
            <div className="grid-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

