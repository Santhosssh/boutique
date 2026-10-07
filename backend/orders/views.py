from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .data import ORDERS_DATA

orders_db = list(ORDERS_DATA)

@api_view(['GET', 'POST'])
def order_list(request):
    global orders_db
    if request.method == 'GET':
        status_filter = request.GET.get('status', 'all')
        search = request.GET.get('search', '').lower().strip()

        results = list(orders_db)
        if status_filter and status_filter != 'all':
            results = [o for o in results if o.get('orderStatus', '').lower() == status_filter.lower()]

        if search:
            results = [o for o in results if search in o.get('id', '').lower() or search in o.get('customer', {}).get('name', '').lower()]

        return Response({
            'count': len(results),
            'results': results
        })

    elif request.method == 'POST':
        data = request.data
        now = datetime.now()
        new_order = {
            'id': f"AUR-ORD-{len(orders_db) + 9301}",
            'placedAt': now.isoformat(),
            'orderStatus': 'Order Placed',
            'paymentStatus': 'Paid' if data.get('paymentMethod') != 'Cash on Delivery' else 'Pending',
            'timeline': [
                {'status': 'Order Placed', 'time': now.strftime("%Y-%m-%d %I:%M %p"), 'done': True, 'note': 'Order received'},
                {'status': 'Confirmed', 'time': 'Pending', 'done': False, 'note': 'Awaiting confirmation'},
                {'status': 'Processing', 'time': 'Pending', 'done': False, 'note': 'Preparation in atelier'},
                {'status': 'Packed', 'time': 'Pending', 'done': False, 'note': 'Luxury boutique packaging'},
                {'status': 'Shipped', 'time': 'Pending', 'done': False, 'note': 'Courier transit'},
                {'status': 'Out for Delivery', 'time': 'Pending', 'done': False, 'note': 'Delivery partner'},
                {'status': 'Delivered', 'time': 'Pending', 'done': False, 'note': 'Doorstep handoff'}
            ],
            **data
        }
        orders_db.insert(0, new_order)
        return Response(new_order, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'PATCH'])
def order_detail(request, pk):
    global orders_db
    ord = next((o for o in orders_db if str(o.get('id')) == str(pk)), None)
    if not ord:
        return Response({'detail': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(ord)
    else:
        new_status = request.data.get('orderStatus')
        if new_status:
            ord['orderStatus'] = new_status
        ord.update(request.data)
        return Response(ord)
