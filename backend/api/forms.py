from django import forms
from .models import FichaTecnica

class FichaTecnicaForm(forms.ModelForm):
    archivo_pdf = forms.FileField(required=True, label="Archivo PDF")

    class Meta:
        model = FichaTecnica
        fields = ['nombre', 'archivo_pdf']

    def save(self, commit=True):
        instance = super().save(commit=False)
        archivo = self.cleaned_data['archivo_pdf']
        instance.archivo_pdf = archivo.read()
        if commit:
            instance.save()
        return instance
