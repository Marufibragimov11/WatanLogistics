from django.db import models
from decimal import Decimal
from accounts.models import User
from drivers.models import Driver

class LoadHistory(models.Model):
    STATUS_CHOICES = (
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('removed', 'Removed'),
    )

    load_id = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    
    pickup_city = models.CharField(max_length=100)
    pickup_state = models.CharField(max_length=50)
    delivery_city = models.CharField(max_length=100)
    delivery_state = models.CharField(max_length=50)
    
    pickup_datetime = models.DateTimeField(null=True, blank=True)
    delivery_datetime = models.DateTimeField(null=True, blank=True)
    
    # Financials
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    dh_miles = models.IntegerField(default=0, help_text="Deadhead Miles")
    loaded_miles = models.IntegerField(default=0, help_text="Loaded Miles")
    rpm = models.DecimalField(max_digits=5, decimal_places=2, help_text="Rate Per Mile", editable=False, default=0)
    
    # Relations
    dispatcher = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_loads')
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    truck = models.ForeignKey('fleet.Truck', on_delete=models.SET_NULL, null=True, blank=True, related_name="loads")
    
    rate_confirmation = models.FileField(upload_to='rate_confirmations/', null=True, blank=True)
    bill_of_lading = models.FileField(upload_to='bols/', null=True, blank=True)
    
    additional_notes = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        total_miles = (self.loaded_miles or 0) + (self.dh_miles or 0)
        self.rate = self.rate or Decimal('0.00')
        
        if total_miles > 0:
            self.rpm = self.rate / Decimal(total_miles)
        else:
            self.rpm = Decimal('0.00')
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Load {self.load_id} - {self.pickup_city} to {self.delivery_city}"
