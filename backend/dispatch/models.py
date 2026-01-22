from django.db import models
from fleet.models import Truck
from drivers.models import Driver
from accounts.models import User

class DispatchBoard(models.Model):
    STATUS_CHOICES = (
        ('ready', 'Ready'),
        ('covered', 'Covered'),
        ('dispatched', 'Dispatched'),
        ('enroute', 'Enroute'),
        ('reserved', 'Reserved'),
        ('rest', 'Rest'),
        ('stop', 'Stop'),
        ('home', 'Home'),
    )

    truck = models.OneToOneField(Truck, on_delete=models.CASCADE, related_name='dispatch_board')
    trailer_number = models.CharField(max_length=50, blank=True, null=True)
    power_only = models.BooleanField(default=False)
    
    primary_driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, related_name='primary_assignments')
    secondary_driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True, related_name='team_assignments')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ready')
    
    origin_city = models.CharField(max_length=100)
    origin_state = models.CharField(max_length=50)
    destination_city = models.CharField(max_length=100, blank=True, null=True)
    destination_state = models.CharField(max_length=50, blank=True, null=True)
    
    ETA_TYPE_CHOICES = (
        ('PU', 'Pickup'),
        ('DEL', 'Delivery'),
    )
    eta_type = models.CharField(max_length=3, choices=ETA_TYPE_CHOICES, blank=True, null=True)
    eta_datetime = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    
    assigned_dispatcher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'dispatch'}, related_name='dispatched_trucks')
    
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dispatch - Unit {self.truck.unit_number}"
