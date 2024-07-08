from rest_framework import routers

from implovit.views import *

router = routers.DefaultRouter()
router.register(r'medicine', MedicineReadOnlyViewSet)
