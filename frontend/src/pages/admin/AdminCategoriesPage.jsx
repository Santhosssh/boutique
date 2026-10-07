import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers, Check, X, Eye } from 'lucide-react';
import { productService } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmCat, setDeleteConfirmCat] = useState(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    status: 'active'
  });

  const { addToast } = useNotification();

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setForm({
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name,
      description: cat.description || '',
      image: cat.image || '',
      status: cat.status || 'active'
    });
    setModalOpen(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!form.name) {
      addToast('Category name is required', 'error');
      return;
    }

    try {
      if (editingCategory) {
        await productService.updateCategory(editingCategory.id, form);
        addToast(`Category "${form.name}" updated`, 'success');
      } else {
        await productService.createCategory(form);
        addToast(`Category "${form.name}" created`, 'success');
      }
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      addToast('Failed to save category', 'error');
    }
  };

  const confirmDeleteCategory = async () => {
    if (!deleteConfirmCat) return;
    try {
      await productService.deleteCategory(deleteConfirmCat.id);
      addToast(`Category "${deleteConfirmCat.name}" deleted`, 'success');
      setDeleteConfirmCat(null);
      loadCategories();
    } catch (err) {
      addToast('Failed to delete category', 'error');
    }
  };

  const toggleCategoryStatus = async (cat) => {
    try {
      const newStatus = cat.status === 'active' ? 'disabled' : 'active';
      await productService.updateCategory(cat.id, { status: newStatus });
      addToast(`Category status set to ${newStatus.toUpperCase()}`, 'info');
      loadCategories();
    } catch (e) {
      addToast('Failed to update status', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Haute Departments & Categories</h2>
          <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Organize bridal silks, western wear, and jewellery categories.
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary" id="add-category-btn">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {loading ? (
          [1, 2, 3, 4].map((n) => <div key={n} className="skeleton" style={{ height: '240px', borderRadius: 'var(--radius-md)' }} />)
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="card"
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', height: '140px' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <button
                    onClick={() => toggleCategoryStatus(cat)}
                    className={`badge ${cat.status === 'active' ? 'badge-success' : 'badge-danger'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    {cat.status === 'active' ? 'Active' : 'Disabled'}
                  </button>
                </div>
              </div>

              <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.15rem', margin: 0 }}>{cat.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {cat.itemCount || 18} pieces
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '6px 0 16px' }}>
                  {cat.description}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    target="_blank"
                    style={{ fontSize: '0.82rem', color: 'var(--accent-rose)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Eye size={13} /> View in Shop
                  </Link>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openEditModal(cat)}
                      className="btn-icon"
                      style={{ width: '32px', height: '32px' }}
                      title="Edit Category"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmCat(cat)}
                      className="btn-icon"
                      style={{ width: '32px', height: '32px', color: 'var(--color-danger)' }}
                      title="Delete Category"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.2rem' }}>
              {editingCategory ? 'Edit Department Category' : 'Create New Department Category'}
            </h3>
            <form onSubmit={handleSaveCategory}>
              <div className="form-group">
                <label className="form-label">Category Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Bridal Lehengas"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Banner Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief summary of fabrics and styling..."
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="form-control form-select"
                >
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmCat && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmCat(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h3 style={{ color: 'var(--color-danger)', marginBottom: '0.6rem' }}>Confirm Delete Category</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Are you sure you want to remove <strong>"{deleteConfirmCat.name}"</strong>? Products in this category will remain in inventory.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setDeleteConfirmCat(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={confirmDeleteCategory} className="btn btn-primary" style={{ backgroundColor: 'var(--color-danger)' }}>
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
