from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomObtainAuthToken, ChangePasswordView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomObtainAuthToken.as_view(), name='api-login'),
    path('change-password/', ChangePasswordView.as_view(), name='api-change-password'),
]
