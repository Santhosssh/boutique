import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Save, Plus, Trash2, Image } from 'lucide-react';
import { productService } from '../../services/productService';
import { useNotification } from '../../context/NotificationContext';

export const AdminProductFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Sarees',
    categorySlug: 'sarees',
    price: '',
    originalPrice: '',
    discount: 0,
    stock: 10,
    status: 'active',
    badge: 'New Arrival',
    description: '',
    fabric: 'Pure Mulberry Silk',
    care: 'Dry clean only',
    sizes: 'Free Size (6.3m with blouse)',
    colors: 'Royal Crimson, Peacock Blue, Sunset Gold',
    images: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
  });

  useEffect(() => {
    const init = async () => {
      try {
        const cats = await productService.getCategories();
        setCategories(cats);

        if (isEdit) {
          const prod = await productService.getProductById(id);
          setFormData({
            name: prod.name || '',
            sku: prod.sku || '',
            category: prod.category || 'Sarees',
            categorySlug: prod.categorySlug || 'sarees',
            price: prod.price || '',
            originalPrice: prod.originalPrice || '',
            discount: prod.discount || 0,
            stock: prod.stock || 0,
            status: prod.status || 'active',
            badge: prod.badge || '',
            description: prod.description || '',
            fabric: prod.fabric || '',
            care: prod.care || '',
            sizes: prod.sizes ? prod.sizes.join(', ') : '',
            colors: prod.colors ? prod.colors.map((c) => c.name || c).join(', ') : '',
            images: prod.images ? prod.images.join('\n') : ''
          });
        }
      } catch (err) {
        console.error(err);
        addToast('Failed to load product details', 'error');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Recalculate discount if originalPrice and price change
      if (name === 'price' || name === 'originalPrice') {
        const p = Number(name === 'price' ? value : updated.price);
        const orig = Number(name === 'originalPrice' ? value : updated.originalPrice);
        if (orig > p && p > 0) {
          updated.discount = Math.round(((orig - p) / orig) * 100);
        }
      }
      return updated;
    });
  };

  const handleCategoryChange = (e) => {
    const catName = e.target.value;
    const cat = categories.find((c) => c.name === catName);
    setFormData({
      ...formData,
      category: catName,
      categorySlug: cat ? cat.slug : catName.toLowerCase().replace(/\s+/g, '-')
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      addToast('Product name and price are required', 'error');
      return;
    }

    setSaving(true);
    try {
      // Parse array fields
      const parsedSizes = formData.sizes
        ? formData.sizes.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Standard'];

      const parsedColors = formData.colors
        ? formData.colors.split(',').map((c) => ({ name: c.trim(), hex: '#C26D74' })).filter(Boolean)
        : [{ name: 'Default', hex: '#C26D74' }];

      const parsedImages = formData.images
        ? formData.images.split('\n').map((u) => u.trim()).filter(Boolean)
        : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'];

      const payload = {
        name: formData.name,
        sku: formData.sku || `AUR-${Math.floor(1000 + Math.random() * 9000)}`,
        category: formData.category,
        categorySlug: formData.categorySlug,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : Number(formData.price),
        discount: Number(formData.discount) || 0,
        stock: Number(formData.stock) || 0,
        status: formData.status,
        badge: formData.badge,
        description: formData.description,
        fabric: formData.fabric,
        care: formData.care,
        sizes: parsedSizes,
        colors: parsedColors,
        images: parsedImages
      };

      if (isEdit) {
        await productService.updateProduct(id, payload);
        addToast('Boutique creation updated successfully', 'success');
      } else {
        await productService.createProduct(payload);
        addToast('New creation cataloged successfully', 'success');
      }
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      addToast('Failed to save product', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="skeleton" style={{ height: '500px', borderRadius: 'var(--radius-md)' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Navigation */}
      <Link
        to="/admin/products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginBottom: '1.5rem'
        }}
      >
        <ChevronLeft size={16} /> Back to Products List
      </Link>

      <div className="card" style={{ padding: '2rem' }}>
        <h2 style={{ marginBottom: '0.4rem', fontSize: '1.6rem' }}>
          {isEdit ? 'Edit Boutique Creation' : 'Add New Boutique Creation'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
          Specify artisan details, sizes, colors, and inventory levels.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Section: Basic Info */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Product Title *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Royal Organza Zari Saree"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">SKU / Product Code</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="AUR-SAR-909"
                className="form-control"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                value={formData.category}
                onChange={handleCategoryChange}
                className="form-control form-select"
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Highlight Badge</label>
              <select
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="form-control form-select"
              >
                <option value="">None</option>
                <option value="New Arrival">New Arrival</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Limited Edition">Limited Edition</option>
                <option value="Handmade">Handmade</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Selling Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="14999"
                className="form-control"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Original Price (₹)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="17999"
                className="form-control"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            <div className="form-group">
              <label className="form-label">Stock Units *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="form-control"
                required
                min="0"
              />
            </div>
          </div>

          {/* Variations */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Available Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleChange}
                placeholder="XS, S, M, L, XL, Custom"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Available Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleChange}
                placeholder="Blush Rose, Royal Gold, Emerald"
                className="form-control"
              />
            </div>
          </div>

          {/* Images (Line separated) */}
          <div className="form-group">
            <label className="form-label">Product Image URLs (one per line)</label>
            <textarea
              name="images"
              rows="3"
              value={formData.images}
              onChange={handleChange}
              className="form-control"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of silk weave, motifs, and styling..."
              className="form-control"
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Fabric / Material</label>
              <input
                type="text"
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                placeholder="Pure Mulberry Silk & Zari"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Care Instructions</label>
              <input
                type="text"
                name="care"
                value={formData.care}
                onChange={handleChange}
                placeholder="Dry clean only"
                className="form-control"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Catalog Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control form-select"
              style={{ width: '220px' }}
            >
              <option value="active">Active (Visible in Store)</option>
              <option value="disabled">Disabled (Hidden)</option>
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '2rem' }}>
            <Link to="/admin/products" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" disabled={saving} className="btn btn-primary" id="save-product-submit-btn">
              <Save size={16} /> {saving ? 'Saving Creation...' : 'Save Creation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
