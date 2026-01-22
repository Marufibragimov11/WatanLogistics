from rest_framework import serializers
from .models import DispatchBoard
from fleet.serializers import TruckSerializer
from drivers.serializers import DriverSerializer
from accounts.models import User

class DispatchBoardSerializer(serializers.ModelSerializer):
    truck_details = TruckSerializer(source='truck', read_only=True)
    primary_driver_details = DriverSerializer(source='primary_driver', read_only=True)
    secondary_driver_details = DriverSerializer(source='secondary_driver', read_only=True)
    
    dispatcher_name = serializers.SlugRelatedField(
        read_only=True,
        slug_field='username',
        source='assigned_dispatcher'
    )

    class Meta:
        model = DispatchBoard
        fields = '__all__'
        read_only_fields = ('updated_at',)

    def validate_truck(self, value):
        if not self.instance and DispatchBoard.objects.filter(truck=value).exists():
             raise serializers.ValidationError("This truck is already on the dispatch board.")
        return value
