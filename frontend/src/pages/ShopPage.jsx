import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Filter,
  Search,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { productService } from '../services/productService';
import { ProductCard } from '../components/product/ProductCard';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from URL query or defaults
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState('newest');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Load Categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCats();
  }, []);

  // Update category from URL if changed
  useEffect(() => {
    const urlCat = searchParams.get('category') || 'all';
    const urlSearch = searchParams.get('search') || '';
    setSelectedCategory(urlCat);
    setSearchTerm(urlSearch);
  }, [searchParams]);

  // Fetch Products whenever filters change
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.getProducts({
          category: selectedCategory,
          search: searchTerm,
          minPrice: Number(minPrice),
          maxPrice: Number(maxPrice),
          sortBy,
          inStockOnly,
          page: currentPage,
          limit: 8
        });
        if (isMounted) {
          setProducts(res.products);
          setTotalPages(res.totalPages);
          setTotalCount(res.total);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchTerm, minPrice, maxPrice, sortBy, inStockOnly, currentPage]);

  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
    setCurrentPage(1);
    setSearchParams(catSlug === 'all' ? {} : { category: catSlug });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setMinPrice(0);
    setMaxPrice(50000);
    setSortBy('newest');
    setInStockOnly(false);
    setCurrentPage(1);
    setSearchParams({});
  };

  const filterSidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search Input */}
      <div>
        <label className="form-label">Search Designs</label>
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search keywords..."
            className="form-control"
            style={{ paddingLeft: '38px' }}
          />
        </div>
      </div>

      {/* Category List */}
      <div>
        <label className="form-label">Haute Categories</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={() => handleCategorySelect('all')}
            style={{
              textAlign: 'left',
              padding: '8px 12px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.9rem',
              fontWeight: selectedCategory === 'all' ? 600 : 500,
              backgroundColor: selectedCategory === 'all' ? 'var(--accent-rose-light)' : 'transparent',
              color: selectedCategory === 'all' ? 'var(--accent-rose)' : 'var(--text-primary)',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            All Collections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              style={{
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '0.9rem',
                fontWeight: selectedCategory === cat.slug ? 600 : 500,
                backgroundColor: selectedCategory === cat.slug ? 'var(--accent-rose-light)' : 'transparent',
                color: selectedCategory === cat.slug ? 'var(--accent-rose)' : 'var(--text-primary)',
                transition: 'background-color var(--transition-fast)'
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label className="form-label" style={{ margin: 0 }}>Price Range</label>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-rose)' }}>
            ₹{minPrice.toLocaleString()} - ₹{maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="50000"
          step="1000"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setCurrentPage(1);
          }}
          style={{ width: '100%', accentColor: 'var(--accent-rose)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>₹1,000</span>
          <span>₹50,000+</span>
        </div>
      </div>

      {/* In Stock Only Checkbox */}
      <div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            userSelect: 'none'
          }}
        >
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setCurrentPage(1);
            }}
            style={{ accentColor: 'var(--accent-rose)', width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Reset Filter Action */}
      <button
        onClick={handleResetFilters}
        className="btn btn-secondary btn-sm"
        style={{ width: '100%' }}
      >
        Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Page Title & Breadcrumbs */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Sri Lakshmi Atelier Boutique</span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1rem'
            }}
          >
            <div>
              <h1 style={{ margin: '0 0 0.4rem', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
                {selectedCategory === 'all'
                  ? 'All Luxury Collections'
                  : categories.find((c) => c.slug === selectedCategory)?.name || 'Curated Edit'}
              </h1>
              <p style={{ margin: 0 }}>
                Showing <strong>{totalCount}</strong> couture designs handcrafted with distinction
              </p>
            </div>

            {/* Sorting & Mobile Filter Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="btn btn-secondary mobile-filter-btn"
                style={{ display: 'none' }}
              >
                <SlidersHorizontal size={16} /> Filters
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ArrowUpDown size={16} style={{ color: 'var(--text-muted)' }} />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-control form-select"
                  style={{ width: 'auto', minWidth: '180px', padding: '0.6rem 2.2rem 0.6rem 0.9rem' }}
                >
                  <option value="newest">Sort: Newest Arrivals</option>
                  <option value="popular">Sort: Popularity</option>
                  <option value="rating">Sort: Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '270px 1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="shop-layout-grid"
        >
          {/* Desktop Filter Sidebar */}
          <aside
            className="desktop-filter-sidebar"
            style={{
              backgroundColor: 'var(--bg-card)',
              padding: '1.8rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {filterSidebarContent}
          </aside>

          {/* Product Listing Main Area */}
          <div>
            {/* Active Filters Chips */}
            {(selectedCategory !== 'all' || searchTerm || inStockOnly || maxPrice < 50000) && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  padding: '0.8rem 1rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Active Filters:
                </span>
                {selectedCategory !== 'all' && (
                  <span className="badge badge-rose" style={{ cursor: 'pointer' }} onClick={() => handleCategorySelect('all')}>
                    Category: {selectedCategory} <X size={12} />
                  </span>
                )}
                {searchTerm && (
                  <span className="badge badge-rose" style={{ cursor: 'pointer' }} onClick={() => setSearchTerm('')}>
                    Search: "{searchTerm}" <X size={12} />
                  </span>
                )}
                {inStockOnly && (
                  <span className="badge badge-rose" style={{ cursor: 'pointer' }} onClick={() => setInStockOnly(false)}>
                    In Stock Only <X size={12} />
                  </span>
                )}
                {maxPrice < 50000 && (
                  <span className="badge badge-rose" style={{ cursor: 'pointer' }} onClick={() => setMaxPrice(50000)}>
                    Under ₹{maxPrice.toLocaleString()} <X size={12} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.8rem',
                    color: 'var(--accent-rose)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    marginLeft: 'auto'
                  }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Loading Skeletons */}
            {loading ? (
              <div className="grid-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '420px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div className="skeleton" style={{ flex: 1, borderRadius: 'var(--radius-md)' }} />
                    <div className="skeleton" style={{ height: '20px', width: '60%' }} />
                    <div className="skeleton" style={{ height: '16px', width: '40%' }} />
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                {/* Product Grid */}
                <div className="grid-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '3.5rem'
                    }}
                  >
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="btn-icon"
                      style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {[...Array(totalPages)].map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className="btn-icon"
                          style={{
                            backgroundColor: currentPage === pageNum ? 'var(--accent-rose)' : 'var(--bg-card)',
                            color: currentPage === pageNum ? '#FFFFFF' : 'var(--text-primary)',
                            borderColor: currentPage === pageNum ? 'var(--accent-rose)' : 'var(--border-subtle)',
                            fontWeight: 600,
                            fontSize: '0.88rem'
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="btn-icon"
                      style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div
                style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-rose-light)',
                    color: 'var(--accent-rose)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.2rem'
                  }}
                >
                  <Search size={28} />
                </div>
                <h3 style={{ marginBottom: '0.5rem' }}>No Boutique Designs Match Your Criteria</h3>
                <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', color: 'var(--text-muted)' }}>
                  We could not find items matching your current filters. Try adjusting your search keyword or clearing filters.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Reset Filters & View All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '420px', padding: '1.5rem' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '0.8rem'
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Filter Collections</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-ghost"
                style={{ padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>
            {filterSidebarContent}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Apply Filters & View ({totalCount})
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .shop-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};

