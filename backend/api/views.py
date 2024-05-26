from rest_framework import generics
from .models import Flight
from django.contrib.auth.models import User
from .serializers import FlightSerializer, UserSerializer
from rest_framework.permissions import AllowAny

class FlightList(generics.ListAPIView):
    serializer_class = FlightSerializer

    def get_queryset(self):
        queryset = Flight.objects.all()
        departure_city = self.request.query_params.get('departure_city', None)
        destination_city = self.request.query_params.get('destination_city', None)
        departure_date = self.request.query_params.get('departure_date', None)
        
        if departure_city:
            queryset = queryset.filter(departure_city=departure_city)
        if destination_city:
            queryset = queryset.filter(destination_city=destination_city)
        if departure_date:
            queryset = queryset.filter(departure_date=departure_date)
        
        return queryset
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]