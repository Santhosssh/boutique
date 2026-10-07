from django.urls import path
from . import views

urlpatterns = [
    path('reports/dashboard/', views.reports_dashboard, name='reports-dashboard'),
    path('reports/analytics/', views.reports_analytics, name='reports-analytics'),
]
