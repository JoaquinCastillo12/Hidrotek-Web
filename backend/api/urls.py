# urls.py
from django.urls import path
from .views import RegisterView, LoginView, ProductoListView, ProductoDetailView, HomeView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='producto-detail'),
    path('', HomeView.as_view(), name='home'),
]
