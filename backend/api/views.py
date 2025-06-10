from rest_framework import generics, viewsets, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer 
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Producto, Marca, Categoria, Cotizacion, DetalleCotizacion
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

from .serializers import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    ProductoCreateSerializer,
    ProductoListSerializer,
    ProductoDetailSerializer,
    ProductoUpdateSerializer,
    ProductoDeleteSerializer,
    CotizacionCreateSerializer,
    CotizacionListSerializer,
    CotizacionDeleteSerializer,
    CotizacionUpdateSerializer,
    MarcaSerializer,
    MarcaCreateSerializer,
    MarcaUpdateSerializer,
    MarcaDeleteSerializer,
    CategoriaCreateSerializer,
    CategoriaUpdateSerializer,
    CategoriaDeleteSerializer,
    CategoriaSerializer,
    
)

#Apis de autenticacion y autorizacion

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
    
class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logged out successfully"}, status=204)
    
#Apis de productos

class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoListSerializer
    permission_classes = [AllowAny]
    
class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoDetailSerializer
    permission_classes = [AllowAny]
    
class ProductoUpdateView(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    

class ProductoCreateView(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoCreateSerializer
    permission_classes = [permissions.IsAdminUser]
    
class ProductoDeleteView(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoDeleteSerializer
    permission_classes = [permissions.IsAdminUser]
    
#Apis de cotizaciones
        
class CotizacionCreateView(generics.CreateAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
class CotizacionListView(generics.ListAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionListSerializer
    permission_classes = [permissions.IsAuthenticated]

class CotizacionDeleteView(generics.DestroyAPIView):
    queryset = Cotizacion.objects.all()
    serializer_class = CotizacionDeleteSerializer
    permission_classes = [permissions.IsAdminUser]

class CotizacionUpdateView(generics.UpdateAPIView):
    serializer_class = CotizacionUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    

#Prueba de vista
    
def HomeView(request):
    return render(request, 'Prueba.html')

#Apis de marcas 

class MarcaListView(generics.ListAPIView):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [AllowAny]
    
class MarcaCreateView(generics.CreateAPIView):
    queryset = Marca.objects.all()
    serializer_class = MarcaCreateSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MarcaUpdateView(generics.UpdateAPIView):
    queryset = Marca.objects.all()
    serializer_class = MarcaUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    
class MarcaDeleteView(generics.DestroyAPIView):
    queryset = Marca.objects.all()
    serializer_class = MarcaDeleteSerializer
    permission_classes = [permissions.IsAdminUser]

#Apis de categorias
    
class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
    
class CategoriaCreateView(generics.CreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaCreateSerializer
    permission_classes = [permissions.IsAdminUser]
    
class CategoriaUpdateView(generics.UpdateAPIView):      
    queryset = Categoria.objects.all()
    serializer_class = CategoriaUpdateSerializer
    permission_classes = [permissions.IsAdminUser]
    
class CategoriaDeleteView(generics.DestroyAPIView): 
    queryset = Categoria.objects.all()
    serializer_class = CategoriaDeleteSerializer
    permission_classes = [permissions.IsAdminUser]


class ContactEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        nombre = request.data.get('nombre')
        apellido = request.data.get('apellido')
        email = request.data.get('email')
        telefono = request.data.get('telefono')
        mensaje = request.data.get('mensaje')

        cuerpo = f"""
        Nombre: {nombre}
        Apellido: {apellido}
        Email: {email}
        Teléfono: {telefono}
        Mensaje: {mensaje}
        """

        send_mail(
            subject="Nuevo mensaje de contacto",
            message=cuerpo,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.DEFAULT_FROM_EMAIL],  # Cambia por tu correo si quieres
        )
        return Response({"detail": "Mensaje enviado"}, status=status.HTTP_200_OK)