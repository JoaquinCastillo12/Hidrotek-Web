
# urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import RegisterView, LoginView, ProductoListView, ProductoDetailView, HomeView, ProductoUpdateView, ProductoCreateView, MarcaListView, CategoriaListView, ContactMessageCreateView, ContactMessageListView, ContactMessageCreateView, CotizacionPDFCreateView, ver_ficha_tecnica, descargar_pdf

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('productos/', ProductoListView.as_view(), name='producto-list'),
    path('productos/<int:pk>/', ProductoDetailView.as_view(), name='producto-detail'),
    path('', HomeView, name='home'),
    path('productos/<int:pk>/update/', ProductoUpdateView.as_view(), name='producto-update'),
    path('productos/add/', ProductoCreateView.as_view(), name='producto-add'),
    path('marca/', MarcaListView.as_view(), name='marca-list'),
    path('categoria/', CategoriaListView.as_view(), name='categoria-list'),
    path('contact-message/', ContactMessageCreateView.as_view()),
    path('contact-messages/', ContactMessageListView.as_view()),
    path('cotizacion-pdf/', CotizacionPDFCreateView.as_view(), name='cotizacion-pdf'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('prueba-pdf/', views.prueba_pdf, name='prueba_pdf'),
    path("ficha/<path:ruta>/", ver_ficha_tecnica, name="ver_ficha_tecnica"),
    path('ficha-tecnica/<int:ficha_id>/descargar/', descargar_pdf, name='descargar_pdf'),
]