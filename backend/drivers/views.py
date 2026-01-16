from rest_framework import viewsets
from .models import Driver
from .serializers import DriverSerializer
from .permissions import DriverRolePermission

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all().order_by('-created_at')
    serializer_class = DriverSerializer
    permission_classes = [DriverRolePermission]
