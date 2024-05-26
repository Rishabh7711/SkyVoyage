from django.db import models

class Flight(models.Model):
    departure_city = models.CharField(max_length=100)
    destination_city = models.CharField(max_length=100)
    departure_date = models.DateField()
    flight_number = models.CharField(max_length=10)
    airline = models.CharField(max_length=50)
    duration = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.flight_number} from {self.departure_city} to {self.destination_city} on {self.departure_date}"
