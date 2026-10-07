# Mock Data Store for Products and Categories

CATEGORIES_DATA = [
    {
        "id": "sarees",
        "name": "Sarees",
        "slug": "sarees",
        "description": "Heirloom Kanchipuram, Banarasi silks, and organza draperies with intricate zari weaves.",
        "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
        "itemCount": 24,
        "status": "active"
    },
    {
        "id": "chudidars",
        "name": "Chudidars & Suits",
        "slug": "chudidars",
        "description": "Elegantly tailored anarkalis, straight suits, and regal chudidar ensembles.",
        "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
        "itemCount": 18,
        "status": "active"
    },
    {
        "id": "kurtis",
        "name": "Kurtis & Tunics",
        "slug": "kurtis",
        "description": "Chic chikankari, handloom cottons, and festive embroidered silk tunics.",
        "image": "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
        "itemCount": 32,
        "status": "active"
    },
    {
        "id": "western",
        "name": "Western Wear",
        "slug": "western",
        "description": "Haute couture cocktail gowns, tailored blazers, and contemporary silhouettes.",
        "image": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
        "itemCount": 16,
        "status": "active"
    },
    {
        "id": "kids",
        "name": "Kids Wear",
        "slug": "kids",
        "description": "Festive pattu pavadais, lehenga cholis, and charming formal miniature wear.",
        "image": "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
        "itemCount": 14,
        "status": "active"
    },
    {
        "id": "jewellery",
        "name": "Jewellery",
        "slug": "jewellery",
        "description": "Bespoke temple kundan, polki chokers, and handcrafted heritage gold ornaments.",
        "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        "itemCount": 22,
        "status": "active"
    },
    {
        "id": "accessories",
        "name": "Accessories",
        "slug": "accessories",
        "description": "Embroidered potlis, zardozi clutches, handwoven shawls, and pure silk stoles.",
        "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        "itemCount": 19,
        "status": "active"
    },
    {
        "id": "new-arrivals",
        "name": "New Arrivals",
        "slug": "new-arrivals",
        "description": "The newest additions from our Summer & Festive Haute Couture runway collection.",
        "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        "itemCount": 28,
        "status": "active"
    }
]

PRODUCTS_DATA = [
    {
        "id": "prod-001",
        "sku": "AUR-SAR-101",
        "name": "Royal Crimson Kanchipuram Pure Silk Saree",
        "category": "Sarees",
        "categorySlug": "sarees",
        "price": 18500,
        "originalPrice": 22500,
        "discount": 18,
        "rating": 4.9,
        "reviewsCount": 38,
        "stock": 8,
        "status": "active",
        "isFeatured": True,
        "isNewArrival": True,
        "isPopular": True,
        "badge": "Bestseller",
        "images": [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Woven with pure mulberry silk and authentic zari threads, this Crimson Kanchipuram saree showcases traditional floral vines and temple border motifs.",
        "sizes": ["Free Size (6.3m with blouse)"],
        "colors": [{"name": "Crimson Red & Gold", "hex": "#9E2A2B"}],
        "fabric": "Pure Mulberry Silk",
        "care": "Dry clean only. Store wrapped in pure muslin cloth.",
        "createdAt": "2026-03-01T10:00:00Z"
    },
    {
        "id": "prod-002",
        "sku": "AUR-CHU-202",
        "name": "Blush Rose Hand-Embroidered Anarkali Suit",
        "category": "Chudidars & Suits",
        "categorySlug": "chudidars",
        "price": 14200,
        "originalPrice": 16800,
        "discount": 15,
        "rating": 4.8,
        "reviewsCount": 27,
        "stock": 12,
        "status": "active",
        "isFeatured": True,
        "isNewArrival": True,
        "isPopular": False,
        "badge": "New Arrival",
        "images": [
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "An ethereal floor-length Anarkali crafted from featherlight chanderi silk, embellished with delicate gotapatti and pearl thread work.",
        "sizes": ["XS", "S", "M", "L", "XL", "Custom Stitched"],
        "colors": [{"name": "Dusty Rose", "hex": "#D87F86"}],
        "fabric": "Chanderi Silk & Organza Dupatta",
        "care": "Professional dry cleaning recommended.",
        "createdAt": "2026-03-05T12:30:00Z"
    },
    {
        "id": "prod-003",
        "sku": "AUR-KUR-303",
        "name": "Handcrafted Lucknowi Chikankari Silk Kurti",
        "category": "Kurtis & Tunics",
        "categorySlug": "kurtis",
        "price": 6499,
        "originalPrice": 7999,
        "discount": 19,
        "rating": 4.7,
        "reviewsCount": 54,
        "stock": 20,
        "status": "active",
        "isFeatured": False,
        "isNewArrival": False,
        "isPopular": True,
        "badge": "Trending",
        "images": [
            "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Authentic 32-stitch Lucknowi Chikankari embroidery rendered on fine modal silk with subtle mukaish accents.",
        "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
        "colors": [{"name": "Champagne Gold", "hex": "#D4B995"}],
        "fabric": "Modal Silk",
        "care": "Gentle hand wash with mild silk detergent.",
        "createdAt": "2026-02-20T08:15:00Z"
    },
    {
        "id": "prod-004",
        "sku": "AUR-WES-404",
        "name": "Sculpted Champagne Satin Cocktail Gown",
        "category": "Western Wear",
        "categorySlug": "western",
        "price": 19999,
        "originalPrice": 24999,
        "discount": 20,
        "rating": 5.0,
        "reviewsCount": 19,
        "stock": 6,
        "status": "active",
        "isFeatured": True,
        "isNewArrival": True,
        "isPopular": True,
        "badge": "Exclusive",
        "images": [
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "A striking couture evening gown designed with an asymmetric cowl neckline and tailored mermaid silhouette.",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "colors": [{"name": "Champagne Luster", "hex": "#EAE0D5"}],
        "fabric": "Heavy Duchess Satin",
        "care": "Dry clean only. Steam iron inside out.",
        "createdAt": "2026-03-10T14:45:00Z"
    }
]
