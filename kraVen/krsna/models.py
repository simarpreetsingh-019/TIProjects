from django.db import models

class Warranty(models.Model):
    user_address = models.CharField(max_length=42) 
    product_name = models.CharField(max_length=100)
    warranty_start_date = models.DateField() 
    warranty_end_date = models.DateField() 
    imei_number = models.CharField(max_length=25, null=True)  

    def __str__(self):
        return self.product_name
