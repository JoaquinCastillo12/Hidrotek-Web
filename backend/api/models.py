from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

class Marca(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class FichaTecnica(models.Model):
    nombre = models.CharField(max_length=255)
    archivo_pdf = CloudinaryField('ficha', resource_type='raw')

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    # Imagen desde Cloudinary o URL
    imagen = CloudinaryField('imagen', blank=True, null=True)
    imagen_url = models.URLField(blank=True, null=True)

    ficha_tecnica = models.ForeignKey(FichaTecnica, on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.nombre

class Cotizacion(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    correo = models.EmailField(blank=True, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'Cotización #{self.id} - {self.usuario.username}'

class DetalleCotizacion(models.Model):
    cotizacion = models.ForeignKey(Cotizacion, related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre} (Cotización #{self.cotizacion.id})'

class ContactMessage(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    mensaje = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.BooleanField(default=False)
