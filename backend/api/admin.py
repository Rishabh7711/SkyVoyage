from django.contrib import admin
from .models import Flight

@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    list_display = ('flight_number', 'departure_city', 'destination_city', 'departure_date', 'airline', 'duration')
