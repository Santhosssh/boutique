import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { productService } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';

export const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState(null);

  const { addToast } = useNotification();
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodsRes, cats] = await Promise.all([
        productService.getProducts({
          search: searchTerm,
          category: selectedCategory,
          page: currentPage,
          limit: 10
        }),
        productService.getCategories()
      ]);
      setProducts(prodsRes.products);
      setTotalPages(prodsRes.totalPages);
      setTotalProducts(prodsRes.total);
      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, selectedCategory, currentPage]);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const handleToggleStatus = async (productId) => {
    try {
      const updated = await productService.toggleProductStatus(productId);
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, status: updated.status } : p))
      );
      addToast(`Product status updated to: ${updated.status.toUpperCase()}`, 'info');
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productService.deleteProduct(productToDelete.id);
      addToast(`Deleted "${productToDelete.name}"`, 'success');
      setProductToDelete(null);
      loadData();
    } catch (err) {
      addToast('Failed to delete product', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      {/* Top Header & Add Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Boutique Product Inventory</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Manage {totalProducts} apparel creations, bespoke stock counts, and prices.
          </p>
        </div>

        <Link to="/admin/products/add" className="btn btn-primary" id="admin-add-product-btn">
          <Plus size={16} /> Add New Creation
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '1.2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '280px', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, SKU, or fabric..."
              className="form-control"
              style={{ paddingLeft: '38px' }}
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="form-control form-select"
            style={{ width: 'auto', minWidth: '180px' }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table (Desktop) & Cards (Mobile) */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                    Loading creations...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem' }}>
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={(p.images && p.images[0]) || ''}
                          alt={p.name}
                          style={{ width: '44px', height: '56px', borderRadius: '4px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{p.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {p.sizes ? p.sizes.join(', ') : 'Free Size'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.82rem', padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                        {p.sku || 'N/A'}
                      </code>
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{formatPrice(p.price)}</div>
                      {p.originalPrice && p.originalPrice > p.price && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                          {formatPrice(p.originalPrice)}
                        </div>
                      )}
                    </td>
                    <td>
                      {p.stock > 0 ? (
                        <span style={{ fontWeight: 600, color: p.stock <= 5 ? 'var(--color-warning)' : 'inherit' }}>
                          {p.stock} units
                        </span>
                      ) : (
                        <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>Out of Stock</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(p.id)}
                        className={`badge ${p.status === 'active' ? 'badge-success' : 'badge-danger'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                        title="Click to toggle status"
                      >
                        {p.status === 'active' ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <Link
                          to={`/products/${p.id}`}
                          target="_blank"
                          className="btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          title="Preview Product"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          to={`/admin/products/${p.id}/edit`}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          title="Edit Product"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => setProductToDelete(p)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px', color: 'var(--color-danger)' }}
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              padding: '1.2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Page {currentPage} of {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="modal-overlay" onClick={() => setProductToDelete(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-danger)', marginBottom: '0.6rem' }}>Confirm Delete Product</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Are you sure you want to permanently remove <strong>"{productToDelete.name}"</strong>? This will remove it from the boutique storefront immediately.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setProductToDelete(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn btn-primary" style={{ backgroundColor: 'var(--color-danger)' }}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
