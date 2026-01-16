from rest_framework import viewsets
from .models import Truck
from .serializers import TruckSerializer
from .permissions import IsAdminOrManagerOrReadOnly

class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all().order_by('-created_at')
    serializer_class = TruckSerializer
    permission_classes = [IsAdminOrManagerOrReadOnly]
