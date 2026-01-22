from rest_framework import viewsets
from django.db.models import Case, When, Value, IntegerField
from .models import DispatchBoard
from .serializers import DispatchBoardSerializer
from .permissions import DispatchRolePermission

class DispatchBoardViewSet(viewsets.ModelViewSet):
    queryset = DispatchBoard.objects.all()
    serializer_class = DispatchBoardSerializer
    permission_classes = [DispatchRolePermission]
    
    def get_queryset(self):
        # Custom sorting priority:
        # Ready(1) -> Covered(2) -> Dispatched(3) -> Enroute(4) -> 
        # Reserved(5) -> Rest(6) -> Stop(7) -> Home(8)
        
        return DispatchBoard.objects.annotate(
            status_priority=Case(
                When(status='ready', then=Value(1)),
                When(status='covered', then=Value(2)),
                When(status='dispatched', then=Value(3)),
                When(status='enroute', then=Value(4)),
                When(status='reserved', then=Value(5)),
                When(status='rest', then=Value(6)),
                When(status='stop', then=Value(7)),
                When(status='home', then=Value(8)),
                default=Value(9),
                output_field=IntegerField(),
            )
        ).order_by('status_priority', 'truck__unit_number')

    def perform_create(self, serializer):
        serializer.save()
