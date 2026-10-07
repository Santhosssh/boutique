import { getFromStorage, saveToStorage, STORAGE_KEYS, mockDelay } from './api';

export const productService = {
  // Fetch products with rich filtering, search, sorting and pagination
  async getProducts(params = {}) {
    await mockDelay(120);
    const {
      category = 'all',
      search = '',
      minPrice = 0,
      maxPrice = 100000,
      sortBy = 'newest', // newest, price-low, price-high, popular, rating
      inStockOnly = false,
      page = 1,
      limit = 12
    } = params;

    let products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);

    // Filter by category
    if (category && category !== 'all') {
      products = products.filter(
        (p) => p.categorySlug === category || p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    // Filter by price range
    products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Filter by in stock
    if (inStockOnly) {
      products = products.filter((p) => p.stock > 0);
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
    });

    const total = products.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    return {
      products: paginatedProducts,
      total,
      page,
      totalPages
    };
  },

  async getProductById(id) {
    await mockDelay(100);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) throw new Error('Product not found');
    return product;
  },

  async getRelatedProducts(categoryId, currentProductId, limit = 4) {
    await mockDelay(80);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    return products
      .filter((p) => String(p.id) !== String(currentProductId))
      .slice(0, limit);
  },

  async createProduct(productData) {
    await mockDelay(200);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    const newProduct = {
      id: `prod-${Date.now()}`,
      sku: productData.sku || `AUR-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      rating: 5.0,
      reviewsCount: 0,
      status: 'active',
      images: productData.images && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      ...productData
    };
    products.unshift(newProduct);
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  },

  async updateProduct(id, updatedData) {
    await mockDelay(200);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) throw new Error('Product not found');

    products[index] = { ...products[index], ...updatedData };
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return products[index];
  },

  async deleteProduct(id) {
    await mockDelay(180);
    let products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    products = products.filter((p) => String(p.id) !== String(id));
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return { success: true, id };
  },

  async toggleProductStatus(id) {
    await mockDelay(150);
    const products = getFromStorage(STORAGE_KEYS.PRODUCTS, []);
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) throw new Error('Product not found');
    product.status = product.status === 'active' ? 'disabled' : 'active';
    saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    return product;
  },

  // Category methods
  async getCategories() {
    await mockDelay(80);
    return getFromStorage(STORAGE_KEYS.CATEGORIES, []);
  },

  async createCategory(catData) {
    await mockDelay(180);
    const categories = getFromStorage(STORAGE_KEYS.CATEGORIES, []);
    const newCat = {
      id: `cat-${Date.now()}`,
      slug: catData.name.toLowerCase().replace(/\s+/g, '-'),
      itemCount: 0,
      status: 'active',
      image: catData.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      ...catData
    };
    categories.push(newCat);
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return newCat;
  },

  async updateCategory(id, updatedData) {
    await mockDelay(180);
    const categories = getFromStorage(STORAGE_KEYS.CATEGORIES, []);
    const index = categories.findIndex((c) => String(c.id) === String(id));
    if (index === -1) throw new Error('Category not found');
    categories[index] = { ...categories[index], ...updatedData };
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return categories[index];
  },

  async deleteCategory(id) {
    await mockDelay(180);
    let categories = getFromStorage(STORAGE_KEYS.CATEGORIES, []);
    categories = categories.filter((c) => String(c.id) !== String(id));
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
    return { success: true, id };
  }
};
