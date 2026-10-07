from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.order_list, name='order-list'),
    path('orders/<str:pk>/', views.order_detail, name='order-detail'),
]
