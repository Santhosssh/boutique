from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .data import PRODUCTS_DATA, CATEGORIES_DATA

# In-memory working copies for runtime API calls
products_db = list(PRODUCTS_DATA)
categories_db = list(CATEGORIES_DATA)

@api_view(['GET', 'POST'])
def product_list(request):
    global products_db
    if request.method == 'GET':
        category = request.GET.get('category', 'all')
        search = request.GET.get('search', '').lower().strip()
        sort_by = request.GET.get('sort_by', 'newest')

        results = list(products_db)
        if category and category != 'all':
            results = [p for p in results if p.get('categorySlug') == category or p.get('category', '').lower() == category.lower()]

        if search:
            results = [p for p in results if search in p.get('name', '').lower() or search in p.get('description', '').lower()]

        if sort_by == 'price-low':
            results.sort(key=lambda x: x.get('price', 0))
        elif sort_by == 'price-high':
            results.sort(key=lambda x: x.get('price', 0), reverse=True)
        elif sort_by == 'rating':
            results.sort(key=lambda x: x.get('rating', 0), reverse=True)

        return Response({
            'count': len(results),
            'results': results
        })

    elif request.method == 'POST':
        data = request.data
        new_prod = {
            'id': f"prod-{len(products_db) + 101}",
            'status': 'active',
            **data
        }
        products_db.insert(0, new_prod)
        return Response(new_prod, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    global products_db
    prod = next((p for p in products_db if str(p.get('id')) == str(pk)), None)
    if not prod:
        return Response({'detail': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(prod)
    elif request.method == 'PUT':
        prod.update(request.data)
        return Response(prod)
    elif request.method == 'DELETE':
        products_db = [p for p in products_db if str(p.get('id')) != str(pk)]
        return Response({'detail': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def category_list(request):
    global categories_db
    if request.method == 'GET':
        return Response(categories_db)
    elif request.method == 'POST':
        new_cat = {
            'id': f"cat-{len(categories_db) + 1}",
            'itemCount': 0,
            'status': 'active',
            **request.data
        }
        categories_db.append(new_cat)
        return Response(new_cat, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def category_detail(request, pk):
    global categories_db
    cat = next((c for c in categories_db if str(c.get('id')) == str(pk) or c.get('slug') == str(pk)), None)
    if not cat:
        return Response({'detail': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(cat)
    elif request.method == 'PUT':
        cat.update(request.data)
        return Response(cat)
    elif request.method == 'DELETE':
        categories_db = [c for c in categories_db if str(c.get('id')) != str(pk)]
        return Response({'detail': 'Category deleted'}, status=status.HTTP_204_NO_CONTENT)
