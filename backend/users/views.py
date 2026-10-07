from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

CUSTOMERS_DB = [
    {
        "id": "cust-101",
        "name": "Priyanka Sharma",
        "email": "priyanka.s@gmail.com",
        "phone": "+91 98450 12345",
        "ordersCount": 4,
        "totalSpent": 64800,
        "status": "Active",
        "city": "Bengaluru",
        "joinedDate": "2025-11-12"
    },
    {
        "id": "cust-102",
        "name": "Ananya Deshmukh",
        "email": "ananya.deshmukh@yahoo.com",
        "phone": "+91 97654 32109",
        "ordersCount": 2,
        "totalSpent": 28499,
        "status": "Active",
        "city": "Mumbai",
        "joinedDate": "2026-01-20"
    },
    {
        "id": "cust-103",
        "name": "Ritu Varma",
        "email": "ritu.varma@outlook.com",
        "phone": "+91 98111 88442",
        "ordersCount": 5,
        "totalSpent": 89300,
        "status": "Active",
        "city": "New Delhi",
        "joinedDate": "2025-08-15"
    }
]

@api_view(['POST'])
def user_login(request):
    email = request.data.get('email', '')
    is_admin = 'admin' in email.lower()
    return Response({
        'id': 'usr-admin' if is_admin else 'usr-101',
        'name': 'Boutique Administrator' if is_admin else 'Meera Nambiar',
        'email': email,
        'role': 'admin' if is_admin else 'customer',
        'token': 'mock-jwt-token-srilakshmi-2026'
    })

@api_view(['POST'])
def user_register(request):
    data = request.data
    return Response({
        'id': f"usr-{len(CUSTOMERS_DB) + 1}",
        'name': data.get('name'),
        'email': data.get('email'),
        'role': 'customer',
        'token': 'mock-jwt-token-new-user'
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def customer_list(request):
    search = request.GET.get('search', '').lower()
    res = CUSTOMERS_DB
    if search:
        res = [c for c in res if search in c['name'].lower() or search in c['email'].lower()]
    return Response(res)
