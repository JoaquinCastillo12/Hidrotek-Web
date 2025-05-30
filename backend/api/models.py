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

class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    imagen = CloudinaryField('imagen', blank=True, null=True)

    def __str__(self):
        return self.nombre

class Cotizacion(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    cliente = models.CharField(max_length=200)
    correo = models.EmailField(blank=True, null=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)  
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  

    def __str__(self):
        return f'Cotización #{self.id} - {self.cliente}'

class DetalleCotizacion(models.Model):
    cotizacion = models.ForeignKey(Cotizacion, related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre} (Cotización #{self.cotizacion.id})'
