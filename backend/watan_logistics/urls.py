from django.contrib import admin
from django.urls import path, include
from dashboard.views import DashboardStatsView
from accounts.views import CustomObtainAuthToken

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('api/admin/', include('accounts.urls')),
    path('api/fleet/', include('fleet.urls')),
    path('api/drivers/', include('drivers.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
