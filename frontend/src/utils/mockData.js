// Realistic Mock Data for Sri Lakshmi Boutique Luxury E-Commerce

export const INITIAL_CATEGORIES = [
  {
    id: 'sarees',
    name: 'Sarees',
    slug: 'sarees',
    description: 'Heirloom Kanchipuram, Banarasi silks, and organza draperies with intricate zari weaves.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
    status: 'active'
  },
  {
    id: 'chudidars',
    name: 'Chudidars & Suits',
    slug: 'chudidars',
    description: 'Elegantly tailored anarkalis, straight suits, and regal chudidar ensembles.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
    status: 'active'
  },
  {
    id: 'kurtis',
    name: 'Kurtis & Tunics',
    slug: 'kurtis',
    description: 'Chic chikankari, handloom cottons, and festive embroidered silk tunics.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    itemCount: 32,
    status: 'active'
  },
  {
    id: 'western',
    name: 'Western Wear',
    slug: 'western',
    description: 'Haute couture cocktail gowns, tailored blazers, and contemporary silhouettes.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
    status: 'active'
  },
  {
    id: 'kids',
    name: 'Kids Wear',
    slug: 'kids',
    description: 'Festive pattu pavadais, lehenga cholis, and charming formal miniature wear.',
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80',
    itemCount: 14,
    status: 'active'
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    slug: 'jewellery',
    description: 'Bespoke temple kundan, polki chokers, and handcrafted heritage gold ornaments.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    status: 'active'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Embroidered potlis, zardozi clutches, handwoven shawls, and pure silk stoles.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    itemCount: 19,
    status: 'active'
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'The newest additions from our Summer & Festive Haute Couture runway collection.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    itemCount: 28,
    status: 'active'
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    sku: 'AUR-SAR-101',
    name: 'Royal Crimson Kanchipuram Pure Silk Saree',
    category: 'Sarees',
    categorySlug: 'sarees',
    price: 18500,
    originalPrice: 22500,
    discount: 18,
    rating: 4.9,
    reviewsCount: 38,
    stock: 8,
    status: 'active',
    isFeatured: true,
    isNewArrival: true,
    isPopular: true,
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Woven with pure mulberry silk and authentic zari threads, this Crimson Kanchipuram saree showcases traditional floral vines and temple border motifs crafted by master artisans in Tamil Nadu.',
    sizes: ['Free Size (6.3m with blouse)'],
    colors: [
      { name: 'Crimson Red & Gold', hex: '#9E2A2B' },
      { name: 'Peacock Teal', hex: '#005F73' },
      { name: 'Royal Rani Pink', hex: '#C2185B' }
    ],
    fabric: 'Pure Mulberry Silk',
    care: 'Dry clean only. Store wrapped in pure muslin cloth.',
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'prod-002',
    sku: 'AUR-CHU-202',
    name: 'Blush Rose Hand-Embroidered Anarkali Suit',
    category: 'Chudidars & Suits',
    categorySlug: 'chudidars',
    price: 14200,
    originalPrice: 16800,
    discount: 15,
    rating: 4.8,
    reviewsCount: 27,
    stock: 12,
    status: 'active',
    isFeatured: true,
    isNewArrival: true,
    isPopular: false,
    badge: 'New Arrival',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ethereal floor-length Anarkali crafted from featherlight chanderi silk, embellished with delicate gotapatti and pearl thread work on the yoke and hemline.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Stitched'],
    colors: [
      { name: 'Dusty Rose', hex: '#D87F86' },
      { name: 'Ivory Cream', hex: '#F4EFEB' },
      { name: 'Soft Sage', hex: '#9CAF88' }
    ],
    fabric: 'Chanderi Silk & Organza Dupatta',
    care: 'Professional dry cleaning recommended.',
    createdAt: '2026-03-05T12:30:00Z'
  },
  {
    id: 'prod-003',
    sku: 'AUR-KUR-303',
    name: 'Handcrafted Lucknowi Chikankari Silk Kurti',
    category: 'Kurtis & Tunics',
    categorySlug: 'kurtis',
    price: 6499,
    originalPrice: 7999,
    discount: 19,
    rating: 4.7,
    reviewsCount: 54,
    stock: 20,
    status: 'active',
    isFeatured: false,
    isNewArrival: false,
    isPopular: true,
    badge: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Authentic 32-stitch Lucknowi Chikankari embroidery rendered on fine modal silk, complete with subtle mukaish metallic accents that shimmer under evening lights.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Champagne Gold', hex: '#D4B995' },
      { name: 'Lavender Mist', hex: '#C5B3D1' },
      { name: 'Powder Blue', hex: '#A8D0E6' }
    ],
    fabric: 'Modal Silk',
    care: 'Gentle hand wash with mild silk detergent.',
    createdAt: '2026-02-20T08:15:00Z'
  },
  {
    id: 'prod-004',
    sku: 'AUR-WES-404',
    name: 'Sculpted Champagne Satin Cocktail Gown',
    category: 'Western Wear',
    categorySlug: 'western',
    price: 19999,
    originalPrice: 24999,
    discount: 20,
    rating: 5.0,
    reviewsCount: 19,
    stock: 6,
    status: 'active',
    isFeatured: true,
    isNewArrival: true,
    isPopular: true,
    badge: 'Exclusive',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A striking couture evening gown designed with an asymmetric cowl neckline, tailored mermaid silhouette, and a discreet train. Crafted from heavyweight duchess satin.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Luster', hex: '#EAE0D5' },
      { name: 'Midnight Onyx', hex: '#1C1C1E' },
      { name: 'Burgundy Velvet', hex: '#581845' }
    ],
    fabric: 'Heavy Duchess Satin & Silk Lining',
    care: 'Dry clean only. Steam iron inside out.',
    createdAt: '2026-03-10T14:45:00Z'
  },
  {
    id: 'prod-005',
    sku: 'AUR-JWL-505',
    name: 'Heritage Jadau Kundan & Pearl Choker Set',
    category: 'Jewellery',
    categorySlug: 'jewellery',
    price: 24500,
    originalPrice: 28000,
    discount: 12,
    rating: 4.9,
    reviewsCount: 31,
    stock: 5,
    status: 'active',
    isFeatured: true,
    isNewArrival: false,
    isPopular: true,
    badge: 'Limited Edition',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Mastercrafted 22kt gold-plated choker ensemble featuring uncut polki stones, meenakari enamel backing, and hand-strung natural South Sea pearl drops. Includes matching earrings and maang tikka.',
    sizes: ['Standard Adjustable Dori'],
    colors: [
      { name: 'Antique Gold & Pearl', hex: '#D4AF37' },
      { name: 'Emerald Green Inset', hex: '#0B6623' },
      { name: 'Ruby Inset', hex: '#9B111E' }
    ],
    fabric: 'Brass Alloy with 22k Micron Gold Polish',
    care: 'Store in airtight velvet pouch. Keep away from perfumes and water.',
    createdAt: '2026-02-15T09:20:00Z'
  },
  {
    id: 'prod-006',
    sku: 'AUR-ACC-606',
    name: 'Bespoke Zardozi & Velvet Embroidered Potli',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 3899,
    originalPrice: 4500,
    discount: 13,
    rating: 4.6,
    reviewsCount: 42,
    stock: 15,
    status: 'active',
    isFeatured: false,
    isNewArrival: true,
    isPopular: false,
    badge: 'Handmade',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An exquisite heirloom evening pouch handcrafted in plush micro-velvet, lavished with dabka, seed beads, and golden tassel drawstrings.',
    sizes: ['Standard (9" x 8")'],
    colors: [
      { name: 'Deep Wine', hex: '#4A1525' },
      { name: 'Forest Green', hex: '#1B4D3E' },
      { name: 'Pale Rose', hex: '#D87F86' }
    ],
    fabric: 'Micro Velvet with Silk Tassels',
    care: 'Spot clean only. Store in protective dust bag.',
    createdAt: '2026-03-02T11:10:00Z'
  },
  {
    id: 'prod-007',
    sku: 'AUR-KID-707',
    name: 'Festive Banarasi Silk Pattu Pavadai Set',
    category: 'Kids Wear',
    categorySlug: 'kids',
    price: 5200,
    originalPrice: 6200,
    discount: 16,
    rating: 4.8,
    reviewsCount: 22,
    stock: 14,
    status: 'active',
    isFeatured: false,
    isNewArrival: true,
    isPopular: true,
    badge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Traditional South Indian festive silk pavadai set for young girls, woven with pure zari border and lined with ultra-soft breathable cotton for effortless comfort.',
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    colors: [
      { name: 'Mango Yellow & Mustard', hex: '#FFB703' },
      { name: 'Rani Pink & Parrot Green', hex: '#D81159' }
    ],
    fabric: 'Pure Silk Brocade with 100% Cotton Lining',
    care: 'Gentle dry clean.',
    createdAt: '2026-03-08T16:00:00Z'
  },
  {
    id: 'prod-008',
    sku: 'AUR-SAR-108',
    name: 'Pastel Lilac Organza Saree with Scalloped Zari',
    category: 'Sarees',
    categorySlug: 'sarees',
    price: 11999,
    originalPrice: 14500,
    discount: 17,
    rating: 4.9,
    reviewsCount: 65,
    stock: 10,
    status: 'active',
    isFeatured: true,
    isNewArrival: false,
    isPopular: true,
    badge: 'Top Rated',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Semi-sheer tissue organza drape in delicate pastel lavender, bordered with hand-cut floral scalloping and fine sequin highlights. Comes with a matching raw silk unstitched blouse.',
    sizes: ['Free Size (5.5m + 0.8m Blouse)'],
    colors: [
      { name: 'Lilac Mist', hex: '#D8C4E8' },
      { name: 'Blush Rose', hex: '#F2D2D6' },
      { name: 'Mint Frost', hex: '#D1E8E2' }
    ],
    fabric: 'Handwoven Tissue Organza',
    care: 'Dry clean only. Roll fold instead of creased folding.',
    createdAt: '2026-02-18T13:40:00Z'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'SLB-ORD-9201',
    customer: {
      id: 'cust-101',
      name: 'Priyanka Sharma',
      email: 'priyanka.s@gmail.com',
      phone: '+91 98450 12345',
      address: 'Villa 14, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066'
    },
    items: [
      {
        id: 'prod-001',
        name: 'Royal Crimson Kanchipuram Pure Silk Saree',
        price: 18500,
        quantity: 1,
        size: 'Free Size (6.3m with blouse)',
        color: 'Crimson Red & Gold',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'prod-006',
        name: 'Bespoke Zardozi & Velvet Embroidered Potli',
        price: 3899,
        quantity: 1,
        size: 'Standard (9" x 8")',
        color: 'Deep Wine',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 22399,
    discount: 1000,
    deliveryCharge: 0,
    total: 21399,
    paymentMethod: 'Online Payment (Prepaid Card)',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    placedAt: '2026-04-02T10:15:00Z',
    trackingNumber: 'BLR-SLB-883921',
    timeline: [
      { status: 'Order Placed', time: '2026-04-02 10:15 AM', done: true, note: 'Order received and verified' },
      { status: 'Confirmed', time: '2026-04-02 11:30 AM', done: true, note: 'Payment settled successfully' },
      { status: 'Processing', time: '2026-04-02 03:00 PM', done: true, note: 'Passed quality check inspection' },
      { status: 'Packed', time: '2026-04-03 09:30 AM', done: true, note: 'Luxury boutique gift packaging completed' },
      { status: 'Shipped', time: '2026-04-03 04:00 PM', done: true, note: 'In transit via BlueDart Air Express' },
      { status: 'Out for Delivery', time: 'Expected tomorrow', done: false, note: 'Courier will contact recipient' },
      { status: 'Delivered', time: 'Pending', done: false, note: 'Final doorstep delivery' }
    ]
  },
  {
    id: 'SLB-ORD-9202',
    customer: {
      id: 'cust-102',
      name: 'Ananya Deshmukh',
      email: 'ananya.deshmukh@yahoo.com',
      phone: '+91 97654 32109',
      address: 'Flat 402, Horizon Heights, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        id: 'prod-004',
        name: 'Sculpted Champagne Satin Cocktail Gown',
        price: 19999,
        quantity: 1,
        size: 'M',
        color: 'Champagne Luster',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 19999,
    discount: 500,
    deliveryCharge: 0,
    total: 19499,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    placedAt: '2026-04-04T14:22:00Z',
    trackingNumber: 'BOM-SLB-129481',
    timeline: [
      { status: 'Order Placed', time: '2026-04-04 02:22 PM', done: true, note: 'Order placed via COD' },
      { status: 'Confirmed', time: '2026-04-04 03:00 PM', done: true, note: 'Customer phone confirmed order' },
      { status: 'Processing', time: '2026-04-05 10:00 AM', done: true, note: 'Tailoring finishing adjustments' },
      { status: 'Packed', time: 'Pending', done: false, note: 'Boutique boxed packaging' },
      { status: 'Shipped', time: 'Pending', done: false, note: 'Courier dispatch' },
      { status: 'Out for Delivery', time: 'Pending', done: false, note: 'Local delivery hub' },
      { status: 'Delivered', time: 'Pending', done: false, note: 'Doorstep handoff' }
    ]
  },
  {
    id: 'SLB-ORD-9203',
    customer: {
      id: 'cust-103',
      name: 'Ritu Varma',
      email: 'ritu.varma@outlook.com',
      phone: '+91 98111 88442',
      address: 'B-48, Defence Colony',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024'
    },
    items: [
      {
        id: 'prod-005',
        name: 'Heritage Jadau Kundan & Pearl Choker Set',
        price: 24500,
        quantity: 1,
        size: 'Standard Adjustable Dori',
        color: 'Antique Gold & Pearl',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 24500,
    discount: 1500,
    deliveryCharge: 0,
    total: 23000,
    paymentMethod: 'Online Payment (UPI)',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    placedAt: '2026-03-28T09:10:00Z',
    trackingNumber: 'DEL-SLB-773100',
    timeline: [
      { status: 'Order Placed', time: '2026-03-28 09:10 AM', done: true, note: 'Order placed' },
      { status: 'Confirmed', time: '2026-03-28 09:15 AM', done: true, note: 'UPI verification complete' },
      { status: 'Processing', time: '2026-03-28 02:00 PM', done: true, note: 'Velvet vault case sealing' },
      { status: 'Packed', time: '2026-03-29 11:00 AM', done: true, note: 'Tamper proof vault pack' },
      { status: 'Shipped', time: '2026-03-29 06:00 PM', done: true, note: 'Dispatched via secured air express' },
      { status: 'Out for Delivery', time: '2026-03-31 09:00 AM', done: true, note: 'Delivered agent en-route' },
      { status: 'Delivered', time: '2026-03-31 02:30 PM', done: true, note: 'Delivered to customer' }
    ]
  }
];

export const INITIAL_CUSTOMERS = [
  {
    id: 'cust-101',
    name: 'Priyanka Sharma',
    email: 'priyanka.s@gmail.com',
    phone: '+91 98450 12345',
    ordersCount: 4,
    totalSpent: 64800,
    status: 'Active',
    city: 'Bengaluru',
    joinedDate: '2025-11-12'
  },
  {
    id: 'cust-102',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@yahoo.com',
    phone: '+91 97654 32109',
    ordersCount: 2,
    totalSpent: 28499,
    status: 'Active',
    city: 'Mumbai',
    joinedDate: '2026-01-20'
  },
  {
    id: 'cust-103',
    name: 'Ritu Varma',
    email: 'ritu.varma@outlook.com',
    phone: '+91 98111 88442',
    ordersCount: 5,
    totalSpent: 89300,
    status: 'Active',
    city: 'New Delhi',
    joinedDate: '2025-08-15'
  },
  {
    id: 'cust-104',
    name: 'Meera Nambiar',
    email: 'meera.nambiar@gmail.com',
    phone: '+91 94470 99881',
    ordersCount: 1,
    totalSpent: 12999,
    status: 'Active',
    city: 'Kochi',
    joinedDate: '2026-02-14'
  },
  {
    id: 'cust-105',
    name: 'Sneha Patel',
    email: 'sneha.patel@rediff.com',
    phone: '+91 98250 55443',
    ordersCount: 3,
    totalSpent: 41200,
    status: 'Inactive',
    city: 'Ahmedabad',
    joinedDate: '2025-10-05'
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Dr. Kavya Krishnan',
    role: 'Bride & Classical Vocalist',
    city: 'Chennai',
    text: 'Sri Lakshmi Boutique crafted my bridal Kanchipuram saree with such breathtaking attention to detail. The pure zari lustre and custom blouse fit exceeded all expectations. Everyone at my reception was captivated.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Simran Chadha',
    role: 'Creative Director',
    city: 'Mumbai',
    text: 'Finding bespoke Indo-Western couture that feels this luxurious without being ostentatious is rare. The Champagne Satin gown was tailored to pure perfection. Swift delivery and impeccable packaging.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Sunita Singhania',
    role: 'Jewellery Collector',
    city: 'Jaipur',
    text: 'The Jadau Kundan choker is a masterpiece. The heirloom polish, authenticity of stones, and weight feel just like vintage royal jewellery. Sri Lakshmi Boutique is now my family’s destination for festive shopping.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_STORE_SETTINGS = {
  storeName: 'SRI LAKSHMI BOUTIQUE',
  tagline: 'Luxury Silks, Couture & Designer Fashion',
  storeEmail: 'concierge@srilakshmiboutique.com',
  storePhone: '+91 (080) 4128-9900',
  storeAddress: '108, Indiranagar 100ft Road, Defence Colony, Bengaluru - 560038',
  businessHours: 'Mon - Sun: 10:00 AM - 09:00 PM IST',
  minOrderAmount: 999,
  deliveryCharge: 199,
  freeDeliveryThreshold: 2999,
  orderCancellationMinutes: 120,
  emailNotifications: true,
  smsNotifications: true,
  lowStockThreshold: 3,
  theme: 'light'
};
