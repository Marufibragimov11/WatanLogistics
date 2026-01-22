from rest_framework import serializers
from .models import LoadHistory
from drivers.serializers import DriverSerializer

class LoadHistorySerializer(serializers.ModelSerializer):
    driver_details = DriverSerializer(source='driver', read_only=True)
    dispatcher_name = serializers.SerializerMethodField()
    unit_number = serializers.CharField(source="truck.unit_number", read_only=True)

    def get_dispatcher_name(self, obj):
        if obj.dispatcher:
            return f"{obj.dispatcher.first_name} {obj.dispatcher.last_name}"
        return None

    class Meta:
        model = LoadHistory
        fields = '__all__'
        read_only_fields = ('rpm', 'created_at', 'updated_at')
