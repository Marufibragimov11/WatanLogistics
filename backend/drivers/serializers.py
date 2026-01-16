from rest_framework import serializers
from .models import Driver
from fleet.serializers import TruckSerializer

class DriverSerializer(serializers.ModelSerializer):
    # Optional: Expand assigned_truck to show details in GET, but just ID in POST?
    # For now, let's just show the truck data or ID. 
    # To make it nice for frontend, we might want to return nested truck info.
    truck_details = TruckSerializer(source='assigned_truck', read_only=True)

    class Meta:
        model = Driver
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
