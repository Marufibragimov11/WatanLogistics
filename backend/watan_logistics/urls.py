from django.contrib import admin
from django.urls import path, include
from dashboard.views import DashboardStatsView
from accounts.views import CustomObtainAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('api/admin/', include('accounts.urls')),
]
