from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, RegisterView



urlpatterns = [

    path('register/',RegisterView.as_view(), name='register'),  # Include the API URLs
]
