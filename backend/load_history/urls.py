from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoadHistoryViewSet

router = DefaultRouter()
router.register(r'', LoadHistoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
