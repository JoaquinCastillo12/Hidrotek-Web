from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer 
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Producto, Marca, Categoria, Cotizacion, DetalleCotizacion, ContactMessage
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from django.conf import settings
from django.template.loader import render_to_string
from django.http import HttpResponse
from xhtml2pdf import pisa
from io import BytesIO
import os
from django.conf import settings
from django.contrib.staticfiles import finders
from rest_framework_simplejwt.tokens import RefreshToken


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
    ContactMessageSerializer,
    
    
)

#Apis de autenticacion y autorizacion

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=204)
        except Exception as e:
            return Response({"error": "Invalid token or already blacklisted"}, status=400)

    
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

from decimal import Decimal

def link_callback(uri, rel):
    """
    Convierte las rutas relativas en rutas absolutas del sistema de archivos
    para que xhtml2pdf pueda encontrar imágenes y otros recursos.
    """
    if uri.startswith(settings.STATIC_URL):
        path = os.path.join(settings.STATIC_ROOT, uri.replace(settings.STATIC_URL, ""))
    elif uri.startswith(settings.MEDIA_URL):
        path = os.path.join(settings.MEDIA_ROOT, uri.replace(settings.MEDIA_URL, ""))
    else:
        result = finders.find(uri)
        if result:
            if not isinstance(result, (list, tuple)):
                result = [result]
            path = result[0]
        else:
            return uri  # Fallback: puede ser una URL externa

    if not os.path.isfile(path):
        raise Exception(f"El archivo no se encontró: {path}")
    return path


class CotizacionPDFCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        detalles = request.data.get('detalles', [])
        user = request.user

        cotizacion = Cotizacion.objects.create(
            usuario=user,
            correo=user.email
        )

        total = Decimal('0.00')
        itbms_total = Decimal('0.00')
        detalles_objs = []

        for det in detalles:
            producto = Producto.objects.get(id=det['producto'])
            cantidad = int(det['cantidad'])
            precio_unitario = Decimal(str(det['precio_unitario']))
            subtotal = cantidad * precio_unitario
            itbms = subtotal * Decimal('0.07')
            subtotal_con_itbms = subtotal + itbms

            total += subtotal_con_itbms
            itbms_total += itbms

            DetalleCotizacion.objects.create(
                cotizacion=cotizacion,
                producto=producto,
                cantidad=cantidad,
                precio_unitario=precio_unitario
            )

            detalles_objs.append({
                'producto': producto,
                'cantidad': cantidad,
                'precio_unitario': precio_unitario,
                'subtotal': subtotal,
                'itbms': itbms,
                'subtotal_con_itbms': subtotal_con_itbms
            })

        cotizacion.total = total
        cotizacion.save()

        # Ruta relativa del logo dentro de STATIC
        logo_path = os.path.join(settings.STATIC_URL, 'images', 'LOGO HIDROTEK.jpg')

        html = render_to_string('cotizacion_pdf.html', {
            'cotizacion': cotizacion,
            'detalles': detalles_objs,
            'itbms_total': itbms_total,
            'total_con_itbms': total,
            'logo_path': logo_path
        })

        result = BytesIO()
        pisa_status = pisa.CreatePDF(html, dest=result, link_callback=link_callback)

        if pisa_status.err:
            return Response({'error': 'Error al generar PDF'}, status=500)

        response = HttpResponse(result.getvalue(), content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="cotizacion_{cotizacion.id}.pdf"'
        return response

import requests
from django.http import HttpResponse, Http404

def ver_ficha_tecnica(request, ruta):
    # ruta viene como 'raw/upload/v1750350871/eahpt4dhierkrwasqwpf.pdf'
    url = f"https://res.cloudinary.com/dimcffiqf/{ruta}"
    
    try:
        r = requests.get(url)
        if r.status_code != 200:
            raise Http404("Archivo no encontrado")
        return HttpResponse(r.content, content_type="application/pdf")
    except requests.RequestException:
        raise Http404("Error al obtener el archivo")


#Prueba de vista
    
def HomeView(request):
    return render(request, 'Prueba.html')
from django.template.loader import get_template
from django.http import HttpResponse
from xhtml2pdf import pisa
import io
from types import SimpleNamespace


def prueba_pdf(request):
    # 🔹 Datos simulados
    cotizacion_de_ejemplo = SimpleNamespace(
        id=123,
        usuario=SimpleNamespace(username="Juan Pérez"),
        correo="juanperez@ejemplo.com",
        fecha="2025-06-24 10:00",
        total=140.00
    )

    lista_de_detalles_simulada = [
        SimpleNamespace(
            producto=SimpleNamespace(nombre="Bomba Centrífuga 1HP"),
            cantidad=2,
            precio_unitario=50.00,
            subtotal=100.00,
            itbms=7.00,
            subtotal_con_itbms=107.00
        ),
        SimpleNamespace(
            producto=SimpleNamespace(nombre="Tanque de 500L"),
            cantidad=1,
            precio_unitario=40.00,
            subtotal=40.00,
            itbms=2.80,
            subtotal_con_itbms=42.80
        )
    ]

    # 🔹 Ruta de imagen (usa una imagen local o URL completa para pruebas)
    logo_path = os.path.join(settings.STATIC_URL, 'images', 'LOGO HIDROTEK.jpg')  # reemplaza si quieres usar una imagen local

    # 🔹 Renderizado del PDF
    template = get_template("cotizacion_pdf.html")  # tu plantilla
    context = {
        "cotizacion": cotizacion_de_ejemplo,
        "detalles": lista_de_detalles_simulada,
        "logo_path": logo_path,
        "itbms_total": 9.80,
        "total_con_itbms": 149.80
    }

    html = template.render(context)
    result = io.BytesIO()
    pdf = pisa.pisaDocument(io.BytesIO(html.encode("UTF-8")), result)

    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type="application/pdf")
    return HttpResponse("Error al generar PDF", status=500)


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


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class ContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all().order_by('-fecha')
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAuthenticated]