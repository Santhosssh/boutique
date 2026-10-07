# SRI LAKSHMI BOUTIQUE — Haute Couture Full-Stack E-Commerce Platform

A modern, production-ready, high-performance Boutique E-Commerce full-stack web application with a luxury fashion visual identity.

Designed for high-end boutique attire (bridal silks, Kanchipuram & Banarasi sarees, anarkalis, cocktail gowns, festive children's wear, and handcrafted temple jewellery).

---

## 🌟 Key Features

### 🛍️ Client / Customer Experience
- **Hero & Curated Landing Page:** High-fashion visual hero, quick category links, tabbed collections (Featured, New Arrivals, Most Popular), atelier values, promotional banners, artisan heritage showcase, customer testimonials, and newsletter subscription.
- **Product Catalog (`/shop`):**
  - Instant live keyword search.
  - Multi-category filtering (Sarees, Chudidars, Kurtis, Western, Kids, Jewellery, Accessories, New Arrivals).
  - Price range slider (₹1,000 to ₹50,000+).
  - In-stock availability toggle.
  - Sorting: Newest, Popularity, Rating, Price (Low to High), Price (High to Low).
  - Responsive pagination & active filter chips.
- **Product Details (`/products/:id`):**
  - Interactive multi-angle image gallery with thumbnail preview.
  - Size selection chips with Size Guide helper.
  - Live color swatches with active selection indicators.
  - Live inventory stock badges with urgency indicators (e.g. *Only 3 pieces remaining*).
  - Quantity counter, Add to Bag, and Direct "Buy Now" checkout trigger.
  - Wishlist toggle.
  - Tabbed specifications: Description, Fabric & Weave, Care Guide.
  - Related boutique ensembles recommendation grid.
- **Shopping Bag (`/cart`):**
  - Real-time quantity adjustment, item removal, and bag clearing.
  - Free delivery threshold progress bar (Unlocks free delivery above ₹2,999).
  - Promo coupon support (Test with `LAKSHMI10` or `SRI10` for 10% off, or `FIRST500` for flat ₹500 off).
  - Subtotal, discount deduction, and delivery charges breakdown.
- **Checkout Workflow (`/checkout`):**
  - Shipping destination forms (Name, Mobile, Email, Street Address, City, State, PIN).
  - Payment mode toggle: Online Payment (UPI, Credit/Debit Card) or Cash on Delivery (COD).
  - Order summary sidebar with item previews and transparent pricing.
- **Order Confirmation & Tracking (`/orders/confirmed/:id` and `/orders/:id`):**
  - Instant mock order reference number generation (e.g., `SLB-ORD-9201`).
  - Visual 7-step courier fulfillment timeline:
    `Order Placed` ➔ `Confirmed` ➔ `Processing` ➔ `Packed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`.
  - Customer cancellation workflow for early-stage orders.
- **Wishlist (`/wishlist`):**
  - Persistent saved boutique creations with quick 1-click "Move to Bag".
- **User Profile & Settings (`/profile`, `/settings`):**
  - Personal information editing.
  - Password update form with validation.
  - Multiple saved delivery addresses management (Add, default flag, delete).
  - Notification preference toggles (Email order receipts, SMS/WhatsApp courier alerts, seasonal gazette).
  - Privacy and account deletion modal.
- **Authentication (`/login`, `/register`):**
  - **⚡ 1-Click Demo Login** buttons:
    - **Admin:** User ID: `admin` | Password: `admin` (navigates to `/admin`)
    - **Customer:** User ID: `user` | Password: `user` (navigates to `/`)
  - Forgot password recovery modal.

---

### 🛡️ Admin Management Suite (`/admin`)
- **Executive Dashboard Home (`/admin`):**
  - **8 Key Performance Indicators (KPIs):** Total Sales, Today's Sales, Total Orders, Pending Orders, Completed Orders, Cancelled Orders, Total Products, Total Customers.
  - Interactive Sales Revenue chart with period toggles (*Today, This Week, This Month, This Year*).
  - Order Fulfillment pipeline status chart.
  - Recent orders quick-audit table.
  - Best-selling designs inventory tracker.
- **Product Inventory Management (`/admin/products`):**
  - Tabular inventory overview on desktop and responsive cards on mobile.
  - Search, category filter, and pagination.
  - Add and Edit product workflows (`/admin/products/add`, `/admin/products/:id/edit`).
  - Active/Disabled visibility toggle.
  - Safe deletion with confirm dialog.
- **Category Management (`/admin/categories`):**
  - Create, edit, and toggle boutique department categories with item counts and preview banners.
- **Order Management (`/admin/orders`, `/admin/orders/:id`):**
  - Real-time search by customer name, phone, email, or order ID.
  - Status transition dropdown (`Order Placed`, `Confirmed`, `Processing`, `Packed`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`).
  - Confirmation modal safeguarding critical status transitions.
- **Analytics & Reports (`/admin/reports`):**
  - Revenue velocity bar charts.
  - Category revenue share breakdown with percentage bars.
  - Top revenue-generating ensembles list.
- **Customer Directory (`/admin/customers`):**
  - Client list with lifetime spend totals, orders placed count, and account status toggle.
  - Customer profile modal showing full order history.
- **Store & System Settings (`/admin/settings`):**
  - Boutique contact details, business hours, and atelier address.
  - Order rules: Minimum order value, delivery charge, free shipping threshold, and cancellation window.
  - Automated notification toggles.
  - Theme mode preference (Light / Dark mode).

---

## 🏛️ Project Architecture

```text
boutique/
│
├── frontend/                     # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # Navbar, Footer
│   │   │   └── product/          # ProductCard
│   │   ├── pages/                # Landing, Shop, Details, Cart, Checkout, Orders, Wishlist, Profile, Settings, Auth
│   │   │   └── admin/            # Dashboard, Products, Orders, Categories, Reports, Customers, Settings
│   │   ├── layouts/              # UserLayout, AdminLayout
│   │   ├── context/              # AuthContext, CartContext, WishlistContext, NotificationContext
│   │   ├── services/             # api.js, productService.js, orderService.js, customerService.js, reportService.js
│   │   ├── utils/                # mockData.js
│   │   ├── App.jsx               # Route definitions & React.lazy code-splitting
│   │   ├── index.css             # Vanilla CSS design tokens, typography, cards & responsive rules
│   │   └── main.jsx
│   └── package.json
│
├── backend/                      # Python Django + Django REST Framework Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/                   # settings.py, urls.py, wsgi.py, asgi.py
│   ├── products/                 # views.py, urls.py, data.py (Products & Categories endpoints)
│   ├── orders/                   # views.py, urls.py, data.py (Orders & Fulfillment endpoints)
│   ├── users/                    # views.py, urls.py (Auth & Customer Directory endpoints)
│   └── reports/                  # views.py, urls.py (Dashboard metrics & Analytics endpoints)
│
└── README.md
```

---

## 🚀 How to Run the Application

### 1. Run the Frontend (React.js + Vite)

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173/`.

### 2. Run the Backend (Python Django + DRF)

```bash
cd backend
python manage.py runserver
```

The Django REST API will run at `http://localhost:8000/`.

API Endpoints available:
- `http://localhost:8000/api/products/`
- `http://localhost:8000/api/categories/`
- `http://localhost:8000/api/orders/`
- `http://localhost:8000/api/users/customers/`
- `http://localhost:8000/api/reports/dashboard/`
- `http://localhost:8000/api/reports/analytics/`

---

## 🎨 Aesthetics & Design System
- **Palette:** Soft alabaster/cream backgrounds (`#FAF7F5`), soft blush/dusty rose accents (`#C26D74`), champagne gold accents (`#C5A880`), charcoal texts (`#221F20`), pure white cards (`#FFFFFF`).
- **Typography:** Google Fonts *Playfair Display* for luxury couture titles and *Plus Jakarta Sans* for modern readability.
- **Responsive Layouts:** Handcrafted for Mobile (360px, 390px, 430px), Tablets (768px, 1024px), Laptops (1280px), and Desktops (1440px+).

---

## 🔌 Connecting a Real Database Later
The frontend services layer (`frontend/src/services/api.js`, `productService.js`, `orderService.js`, etc.) strictly decouples data fetching from UI components. Replacing local mock state with live Django API requests simply involves configuring `VITE_API_URL` and switching persistent models in Django without touching UI templates.
