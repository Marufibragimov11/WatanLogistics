from django.db import models
import uuid

class Truck(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    unit_number = models.CharField(max_length=50, unique=True)
    plate_number = models.CharField(max_length=50)
    vin = models.CharField(max_length=50, unique=True)
    year = models.IntegerField()
    model = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='trucks/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Placeholders for future features
    assigned_driver = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_truck')
    # current_load = models.ForeignKey('loads.Load', ...) 

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Unit {self.unit_number} ({self.model})"
