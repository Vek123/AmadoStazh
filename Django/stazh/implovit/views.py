from django.shortcuts import render
from rest_framework import viewsets
from implovit.serializers import *


# Create your views here.

class MedicineReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MedicineBasicSerializer
    queryset = Medicines.objects.all()

