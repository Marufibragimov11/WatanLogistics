from rest_framework import viewsets, filters 
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg
from django_filters.rest_framework import DjangoFilterBackend
from .models import LoadHistory
from .serializers import LoadHistorySerializer
from .permissions import LoadHistoryRolePermission

class LoadHistoryViewSet(viewsets.ModelViewSet):
    queryset = LoadHistory.objects.all().order_by('-pickup_datetime', '-created_at')
    serializer_class = LoadHistorySerializer
    permission_classes = [LoadHistoryRolePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Filter fields
    filterset_fields = {
        'driver': ['exact'],
        'dispatcher': ['exact'],
        'truck': ['exact'],
        'status': ['exact'],
    }
    search_fields = ['load_id', 'pickup_city', 'delivery_city', 'driver__first_name', 'driver__last_name']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Date Range Filtering (Custom logic for combinability)
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        
        if date_from and date_to:
            # Filter COMPLETED loads by delivery_datetime (proxy for completed_date)
            queryset = queryset.filter(
                status='completed',
                delivery_datetime__range=[date_from, date_to]
            )
            
        return queryset

    def perform_create(self, serializer):
        if self.request.user.role == 'dispatch':
            serializer.save(dispatcher=self.request.user)
        else:
            serializer.save()

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        # Apply the same filters as the list view
        queryset = self.filter_queryset(self.get_queryset())
        
        # Calculate stats for COMPLETED loads only (within the filtered set)
        # Note: If date filter is applied, queryset is already filtered by status='completed' and range.
        # If no date filter, we still generally focus analytics on completed loads for financials, 
        # or we might want to aggregate all? 
        # Requirement: "ONLY include COMPLETED loads" for backend calculations.
        
        completed_loads = queryset.filter(status='completed')
        
        aggregates = completed_loads.aggregate(
            total_gross=Sum('rate'),
            total_miles=Sum('loaded_miles') + Sum('dh_miles'),
            total_loads=Count('id')
        )
        
        total_gross = aggregates['total_gross'] or 0
        total_miles = aggregates['total_miles'] or 0
        total_loads = aggregates['total_loads'] or 0
        
        # Weighted Average RPM calculation: Total Gross / Total Miles
        avg_rpm = 0
        if total_miles > 0:
            avg_rpm = float(total_gross) / float(total_miles)
            
        return Response({
            "total_gross": float(total_gross),
            "total_loads": total_loads,
            "avg_rpm": round(avg_rpm, 2),
            "total_miles": total_miles
        })
