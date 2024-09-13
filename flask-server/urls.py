from django.urls import path
from .views import processInput

urlpatterns = [
    path('api/process-input/', processInput, name="processInput"),
]
