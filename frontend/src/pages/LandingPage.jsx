import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Scissors,
  Star,
  ChevronRight
} from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/product/ProductCard';
import { INITIAL_TESTIMONIALS } from '../utils/mockData';

export const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('featured'); // 'featured', 'new', 'popular'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [cats, prodsData] = await Promise.all([
          productService.getCategories(),
          productService.getProducts({ limit: 12 })
        ]);
        setCategories(cats);
        setFeaturedProducts(prodsData.products || []);
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const getFilteredProducts = () => {
    if (activeTab === 'new') {
      return featuredProducts.filter((p) => p.isNewArrival);
    }
    if (activeTab === 'popular') {
      return featuredProducts.filter((p) => p.isPopular);
    }
    return featuredProducts.filter((p) => p.isFeatured || p.isNewArrival);
  };

  return (
    <div className="landing-page">
      {/* 1. Hero / Banner Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '84vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#1E1B1C',
          color: '#FAF7F5',
          overflow: 'hidden'
        }}
      >
        {/* Background Image with Cinematic Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85)',
            backgroundPosition: 'center 25%',
            backgroundSize: 'cover',
            filter: 'brightness(0.38)'
          }}
        />

        {/* Hero Content Container */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 2,
            paddingTop: '3rem',
            paddingBottom: '3rem',
            maxWidth: '900px'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.4rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F4D06F',
              marginBottom: '1.4rem'
            }}
          >
            <Sparkles size={14} />
            <span>Summer Haute Couture Runway 2026</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1.4rem',
              fontWeight: 600,
              letterSpacing: '-0.01em'
            }}
          >
            Heirloom Silks & <br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent-rose-hover)' }}>
              Bespoke Modern Couture
            </span>
          </h1>

          <p
            style={{
              color: '#E0D8D6',
              fontSize: 'clamp(1rem, 2vw, 1.22rem)',
              lineHeight: 1.7,
              marginBottom: '2.4rem',
              maxWidth: '680px'
            }}
          >
            From masterwoven Kanchipuram bridal drapes to sculpted cocktail silhouettes,
            discover artisanal luxury crafted for life’s most unforgettable milestones.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link to="/shop" className="btn btn-primary btn-lg" id="hero-shop-now-btn">
              Explore Collection <ArrowRight size={18} />
            </Link>
            <Link
              to="/shop?category=sarees"
              className="btn btn-secondary btn-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FAF7F5',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(6px)'
              }}
            >
              Pure Silk Sarees
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Boutique Values / Service Highlights */}
      <section
        style={{
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '2rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.8rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-rose-light)',
                  color: 'var(--accent-rose)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Scissors size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', margin: 0 }}>Bespoke Tailoring</h4>
                <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-muted)' }}>
                  Complimentary custom blouse & fitting
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold-light)',
                  color: 'var(--accent-gold-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', margin: 0 }}>Silk Mark Certified</h4>
                <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-muted)' }}>
                  100% pure mulberry & zari weave
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-info-bg)',
                  color: 'var(--color-info)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Truck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', margin: 0 }}>Express Insured Transit</h4>
                <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-muted)' }}>
                  Free shipping across India on ₹2,999+
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <RotateCcw size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.96rem', margin: 0 }}>Effortless Returns</h4>
                <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-muted)' }}>
                  7-day concierge return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Showcase */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated Departments</span>
            <h2 className="section-title">Explore by Haute Category</h2>
            <p className="section-desc">
              Immerse in handcrafted perfection across our specialized bridal, festive, and contemporary edits.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.slug}`}
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  color: '#FFFFFF',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
                className="category-card-hover"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="cat-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(20, 16, 17, 0.88) 0%, rgba(20, 16, 17, 0.3) 55%, transparent 100%)'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)'
                    }}
                  >
                    {cat.itemCount || 18}+ Pieces
                  </span>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', margin: '4px 0 6px' }}>
                    {cat.name}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#FAF7F5'
                    }}
                  >
                    <span>View Edit</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curated Tabs: Featured, New Arrivals, Popular */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Exquisite Handpicks</span>
            <h2 className="section-title">The Atelier Showcase</h2>
            <p className="section-desc">
              Discover our most sought-after designs crafted for royal occasions and modern celebrations.
            </p>

            {/* Filter Tabs */}
            <div
              style={{
                display: 'inline-flex',
                gap: '8px',
                padding: '5px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-full)',
                marginTop: '1.5rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <button
                onClick={() => setActiveTab('featured')}
                className={`btn btn-sm ${activeTab === 'featured' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.4rem' }}
              >
                Featured Edit
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`btn btn-sm ${activeTab === 'new' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.4rem' }}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('popular')}
                className={`btn btn-sm ${activeTab === 'popular' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ borderRadius: 'var(--radius-full)', padding: '0.5rem 1.4rem' }}
              >
                Most Popular
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid-4">
            {getFilteredProducts().map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/shop" className="btn btn-secondary btn-lg">
              Explore All Boutique Creations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Promotional Luxe Banner */}
      <section
        style={{
          position: 'relative',
          padding: ' clamp(4rem, 8vw, 7rem) 0',
          backgroundColor: '#282123',
          color: '#FAF7F5',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=80)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            filter: 'brightness(0.32)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                fontWeight: 700
              }}
            >
              Bridal & Reception Special
            </span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#FFFFFF',
                margin: '0.8rem 0 1.2rem',
                fontFamily: 'var(--font-serif)'
              }}
            >
              The Royal Heritage Silk Collection
            </h2>
            <p style={{ color: '#E5DEDD', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Handcrafted Kanchipuram and Banarasi drapes with genuine zari cords,
              accompanied by custom designer blouse embellishments and archival velvet keepsake trunks.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/shop?category=sarees" className="btn btn-primary btn-lg">
                View Bridal Silks
              </Link>
              <Link
                to="/shop?category=jewellery"
                className="btn btn-secondary btn-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Matching Temple Jewellery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. About Boutique Section */}
      <section className="section-padding" id="about">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="section-subtitle">The Atelier Heritage</span>
              <h2 style={{ marginBottom: '1.2rem' }}>
                Where Pure Heritage Meets Contemporary Elegance
              </h2>
              <p style={{ marginBottom: '1.2rem', lineHeight: 1.8 }}>
                Founded with a devotion to preserving the master handloom traditions of India,
                Sri Lakshmi Boutique collaborates with over 150 generational weaving families across
                Kanchipuram, Varanasi, Lucknow, and Chanderi.
              </p>
              <p style={{ marginBottom: '1.8rem', lineHeight: 1.8 }}>
                Each garment requires up to 180 hours of hand-embroidery and zari weaving,
                ensuring every drape possesses timeless poise, auspicious grace, and luxury.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Certified Silk Mark</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                    150+
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Master Artisans</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-rose)' }}>
                    12k+
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Delighted Patrons</div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  aspectRatio: '4/5',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80"
                  alt="Sri Lakshmi Boutique Atelier"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Testimonial card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  left: '-25px',
                  backgroundColor: 'var(--bg-card)',
                  padding: '1.2rem 1.6rem',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-hover)',
                  border: '1px solid var(--border-subtle)',
                  maxWidth: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold-light)',
                    color: 'var(--accent-gold-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Bespoke Fitting</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Available in Bengaluru Atelier
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Client Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Privé Testimonials</span>
            <h2 className="section-title">Words from Our Patrons</h2>
            <p className="section-desc">
              Real experiences from brides, connoisseurs, and fashion tastemakers across the globe.
            </p>
          </div>

          <div className="grid-3">
            {INITIAL_TESTIMONIALS.map((t) => (
              <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '3px', color: '#C5A880' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '0.94rem', color: 'var(--text-primary)', flex: 1, lineHeight: 1.7 }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.94rem', margin: 0 }}>{t.name}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {t.role} • {t.city}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .category-card-hover:hover .cat-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

