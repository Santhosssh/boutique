from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.user_login, name='user-login'),
    path('users/register/', views.user_register, name='user-register'),
    path('users/customers/', views.customer_list, name='customer-list'),
]
