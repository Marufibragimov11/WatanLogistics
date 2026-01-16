from django.db import models
from fleet.models import Truck
import uuid

class Driver(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('vacation', 'Vacation'),
        ('inactive', 'Inactive'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    cdl_photo = models.ImageField(upload_to='drivers/cdl/', blank=True, null=True)
    cdl_expiration_date = models.DateField()
    
    assigned_truck = models.OneToOneField(Truck, on_delete=models.SET_NULL, null=True, blank=True, related_name='driver')
    # Use OneToOne because typically one driver per truck at a time, or ForeignKey if team driving? 
    # User said "assigned_truck (ForeignKey to Truck...)". I will stick to ForeignKey as requested, but conceptually one truck usually has one driver (or team). 
    # Actually, let's stick to ForeignKey as requested in the prompt: "ForeignKey to Truck"
    assigned_truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, null=True, blank=True, related_name='drivers')

    hire_date = models.DateField()
    home_city = models.CharField(max_length=100)
    home_state = models.CharField(max_length=50)
    experience_years = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
