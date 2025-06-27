from django.contrib import admin
from .models import Producto, Marca, Categoria, FichaTecnica, Caracteristica

admin.site.register(Producto)
admin.site.register(Marca)
admin.site.register(Categoria)
from django.contrib import admin
from .models import FichaTecnica
from .forms import FichaTecnicaForm

class FichaTecnicaAdmin(admin.ModelAdmin):
    form = FichaTecnicaForm
    list_display = ['nombre']

admin.site.register(FichaTecnica, FichaTecnicaAdmin)

admin.site.register(Caracteristica)

