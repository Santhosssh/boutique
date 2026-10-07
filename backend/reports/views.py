from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def reports_dashboard(request):
    return Response({
        'totalProducts': 8,
        'totalOrders': 14,
        'pendingOrders': 3,
        'completedOrders': 10,
        'cancelledOrders': 1,
        'totalCustomers': 5,
        'totalSales': 248900,
        'todaySales': 21399
    })

@api_view(['GET'])
def reports_analytics(request):
    period = request.GET.get('period', 'This Month')
    return Response({
        'period': period,
        'salesChart': [
            {'label': 'Week 1', 'sales': 94000, 'orders': 9},
            {'label': 'Week 2', 'sales': 128000, 'orders': 12},
            {'label': 'Week 3', 'sales': 154000, 'orders': 15},
            {'label': 'Week 4', 'sales': 182000, 'orders': 18}
        ],
        'categorySales': [
            {'category': 'Sarees', 'share': 42, 'revenue': 168000},
            {'category': 'Jewellery', 'share': 24, 'revenue': 96000},
            {'category': 'Western Wear', 'share': 16, 'revenue': 64000},
            {'category': 'Chudidars', 'share': 12, 'revenue': 48000},
            {'category': 'Accessories', 'share': 6, 'revenue': 24000}
        ]
    })
