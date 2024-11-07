from django.contrib import admin
from .models import Warranty

@admin.register(Warranty)
class WarrantyAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'user_address', 'warranty_start_date', 'warranty_end_date')  # Ensure start date is included

    # Optionally, you can also specify fields to show in the form
    fields = ('product_name', 'user_address', 'warranty_start_date', 'warranty_end_date')  # Specify all fields here

