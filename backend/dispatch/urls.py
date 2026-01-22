from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DispatchBoardViewSet

router = DefaultRouter()
router.register(r'', DispatchBoardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
