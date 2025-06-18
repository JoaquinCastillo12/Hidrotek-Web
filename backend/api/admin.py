from django.contrib import admin
from .models import Producto, Marca, Categoria, FichaTecnica

admin.site.register(Producto)
admin.site.register(Marca)
admin.site.register(Categoria)
admin.site.register(FichaTecnica)

