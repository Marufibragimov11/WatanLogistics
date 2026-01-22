from django.urls import path
from .views import CompanySettingsView

urlpatterns = [
    path('company/', CompanySettingsView.as_view(), name='company-settings'),
]
