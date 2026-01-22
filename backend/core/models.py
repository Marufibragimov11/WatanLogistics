from django.db import models

class CompanySettings(models.Model):
    company_name = models.CharField(max_length=255, default="Watan Logistics Inc")
    mc_number = models.CharField(max_length=50, default="1660350")
    usdot_number = models.CharField(max_length=50, default="4274064")
    address = models.CharField(max_length=255, default="81 Colonial Hills Dr, Akron, OH 44310")
    phone = models.CharField(max_length=50, default="(216) 202-5556")
    email = models.CharField(max_length=100, default="info@watanlogisticsinc.com")

    def __str__(self):
        return self.company_name
