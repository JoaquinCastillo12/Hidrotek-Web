from rest_framework import generics, viewsets, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer 
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Producto, Marca, Categoria 
from .serializers import CustomTokenObtainPairSerializer, ProductoCreateSerializer, ProductoListSerializer, ProductoDetailSerializer, CotizacionUpdateSerializer, MarcaSerializer, CategoriaSerializer
from rest_framework.response import Response
from django.shortcuts import render


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

class ProductoListView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoListSerializer
    permission_classes = [AllowAny]
    
class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoDetailSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  

class ProductoUpdateView(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = CotizacionUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Producto.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save()

class ProductoCreateView(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save()
        
class CotizacionCreateView(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

   
class CotizacionDetailView(generics.RetrieveAPIView):
    serializer_class = ProductoDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Producto.objects.filter(user=self.request.user)
    
class CotizacionUpdateView(generics.UpdateAPIView):
    serializer_class = ProductoDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Producto.objects.filter(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
    

def HomeView(request):
    return render(request, 'Prueba.html')

class MarcaListView(generics.ListAPIView):
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [AllowAny]
    
class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [AllowAny]
