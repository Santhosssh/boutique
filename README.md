# SRI LAKSHMI BOUTIQUE — Haute Couture Frontend Design Suite

A luxury, high-performance **Frontend-Only Boutique E-Commerce Showcase** with an opulent fashion visual identity.

Built strictly with **React 19 + Vite** and pure local state persistence (**localStorage**). **No backend server, Python, or database required to view any page, design, or workflow.**

---

## 🌟 Key Features & Design Showcase

### 🛍️ Client & Customer Storefront (15 Screens)
- **Hero & Curated Landing Page (`/`):** High-fashion visual hero, quick category links, tabbed collections (Featured, New Arrivals, Most Popular), atelier values, promotional banners, artisan heritage showcase, and customer testimonials.
- **Product Catalog (`/shop`):**
  - Instant live search.
  - Multi-category filtering (*Sarees, Chudidars, Kurtis, Western, Kids, Jewellery, Accessories, New Arrivals*).
  - Price range slider (₹1,000 to ₹50,000+).
  - In-stock availability filter and sorting (Newest, Popular, Rating, Price Low/High).
- **Product Details (`/products/:id`):** Interactive image gallery, size selector, color swatches, stock badges, quantity counter, Add to Bag, Direct Buy, and related recommendations.
- **Shopping Bag (`/cart`):** Pre-seeded sample items for instant preview, live quantity changer, promo coupon support (`LAKSHMI10` or `FIRST500`), free shipping tracker, and price summary.
- **Checkout Workflow (`/checkout`):** Shipping address forms, payment option selector (Card / UPI / COD), and transparent order summary.
- **Order Confirmation & Tracking (`/orders/confirmed/:id`, `/orders/:id`):** Visual 7-step courier fulfillment tracker (`Order Placed` ➔ `Confirmed` ➔ `Processing` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`).
- **Wishlist (`/wishlist`):** Pre-seeded saved pieces with instant 1-click "Move to Bag".
- **User Profile & Settings (`/profile`, `/settings`):** Address management, notification toggles, password modal, profile details.
- **Authentication (`/login`, `/register`):** 1-Click demo buttons for Customer and Admin.

---

### 🛡️ Admin Back-Office Suite (10 Screens)
- **Executive Dashboard (`/admin`):** 8 Key Performance Indicators (Total Sales, Orders, Customers, Inventory), dynamic revenue charts (*Today, This Week, This Month, This Year*), order pipeline breakdown, and best sellers.
- **Product Inventory (`/admin/products`):** Interactive inventory table, search, category filter, active/disabled toggle, and delete.
- **Add / Edit Product (`/admin/products/add`, `/admin/products/:id/edit`):** Full luxury product creation and update forms.
- **Categories Manager (`/admin/categories`):** Department cards, banner preview, item counters.
- **Order Management (`/admin/orders`, `/admin/orders/:id`):** Full order list, customer search, and interactive status transition workflow.
- **Customer Directory (`/admin/customers`):** CRM directory with lifetime spend, orders count, and account status toggle.
- **Analytics & Reports (`/admin/reports`):** Revenue bar charts, category revenue share, top products.
- **Boutique Settings (`/admin/settings`):** Contact details, operating hours, delivery thresholds, and theme mode.

---

## 🧭 Design Navigator (Built-in Helper)
A floating **Design Navigator** dock is available on every screen (bottom-right):
- **1-Click Jump** to all 25 storefront & admin screens.
- **Role Switcher:** Instant toggle between Customer and Administrator mode.
- **Theme Toggle:** Instant switch between Light and Dark mode.
- **Reset Showroom Data:** Reset all mock products, orders, and cart items back to pristine defaults.

---

## 🚀 How to Run (100% Frontend Only)

You can run the development server directly from the root repository or inside `frontend/`:

### Option A: Run from Root
```bash
npm run dev
```

### Option B: Run from `frontend/` folder
```bash
cd frontend
npm run dev
```

The application will open immediately at **`http://localhost:5173/`**.

---

## 📁 Repository Structure

```text
boutique/
│
├── frontend/                     # 100% Standalone React 19 + Vite Application
│   ├── src/
│   │   ├── components/           # Navbar, Footer, ProductCard, DesignViewerBar
│   │   ├── pages/                # Storefront & Admin pages
│   │   ├── layouts/              # UserLayout, AdminLayout
│   │   ├── context/              # Auth, Cart, Wishlist, Notification providers
│   │   ├── services/             # Pure in-browser localStorage mock services (Zero backend)
│   │   ├── utils/                # Rich sample boutique mock data (INITIAL_PRODUCTS, etc.)
│   │   ├── index.css             # Vanilla CSS luxury couture design tokens
│   │   ├── App.jsx               # Routes & Design Navigator
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend_backup/               # Archived Python/Django backend (Preserved as backup)
├── package.json                  # Root runner script to launch Vite dev server
└── README.md
```

---

## 🎨 Design System & Visual Palette
- **Primary Background:** Soft alabaster / ivory cream (`#FAF7F5` / `#FDFBF9`)
- **Accents:** Muted blush / dusty rose (`#C26D74`), champagne gold (`#C5A880`)
- **Typography:** Playfair Display (Luxury serif headlines) & Plus Jakarta Sans (Body)
- **Dark Mode:** Deep charcoal obsidian (`#191716`) with champagne accents
