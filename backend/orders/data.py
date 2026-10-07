# Mock Orders Data

ORDERS_DATA = [
    {
        "id": "SLB-ORD-9201",
        "customer": {
            "id": "cust-101",
            "name": "Priyanka Sharma",
            "email": "priyanka.s@gmail.com",
            "phone": "+91 98450 12345",
            "address": "Villa 14, Palm Meadows, Whitefield",
            "city": "Bengaluru",
            "state": "Karnataka",
            "pincode": "560066"
        },
        "items": [
            {
                "id": "prod-001",
                "name": "Royal Crimson Kanchipuram Pure Silk Saree",
                "price": 18500,
                "quantity": 1,
                "size": "Free Size (6.3m with blouse)",
                "color": "Crimson Red & Gold",
                "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80"
            }
        ],
        "subtotal": 18500,
        "discount": 1000,
        "deliveryCharge": 0,
        "total": 17500,
        "paymentMethod": "Online Payment (Card)",
        "paymentStatus": "Paid",
        "orderStatus": "Shipped",
        "placedAt": "2026-04-02T10:15:00Z",
        "trackingNumber": "BLR-SLB-883921",
        "timeline": [
            {"status": "Order Placed", "time": "2026-04-02 10:15 AM", "done": True, "note": "Order verified"},
            {"status": "Confirmed", "time": "2026-04-02 11:30 AM", "done": True, "note": "Payment settled"},
            {"status": "Processing", "time": "2026-04-02 03:00 PM", "done": True, "note": "Quality inspection complete"},
            {"status": "Packed", "time": "2026-04-03 09:30 AM", "done": True, "note": "Boutique packaging boxed"},
            {"status": "Shipped", "time": "2026-04-03 04:00 PM", "done": True, "note": "Air courier dispatch"},
            {"status": "Out for Delivery", "time": "Pending", "done": False, "note": "Local delivery agent"},
            {"status": "Delivered", "time": "Pending", "done": False, "note": "Doorstep delivery"}
        ]
    }
]
