from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Producto, Cotizacion, DetalleCotizacion, Marca, Categoria, ContactMessage
from cloudinary.utils import cloudinary_url
from django.urls import reverse


#Serializer de usuarios

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['id'] = self.user.id

        return data
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        read_only_fields = ['id', 'username', 'email']

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, validators=[validate_password])

    def validate(self, attrs):
        user = self.context['request'].user
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError({"old_password": "La contraseña antigua es incorrecta."})
        return attrs

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        
        return user
    

#Serializers de productos


class ProductoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio', 'stock', 'imagen',
            'marca', 'categoria', 'caracteristicas', 'ficha_tecnica'
        ]
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Imagen desde Cloudinary
        representation['imagen'] = instance.imagen.url if instance.imagen else None

        # Mostrar nombre de marca y categoría
        representation['marca'] = instance.marca.nombre if instance.marca else None
        representation['categoria'] = instance.categoria.nombre if instance.categoria else None

        # Características: lista de descripciones
        representation['caracteristicas'] = [
            c.descripcion for c in instance.caracteristicas.all()
        ]

        # Ficha técnica: usar URL del backend para servir el PDF
        if instance.ficha_tecnica:
            ficha_id = instance.ficha_tecnica.id
            ficha_url = reverse('descargar_ficha', args=[ficha_id])  # Asegúrate que el name en urls.py sea 'descargar_ficha'
            representation['ficha_tecnica_url'] = ficha_url
        else:
            representation['ficha_tecnica_url'] = None

        return representation

    
class ProductoListSerializer(serializers.ModelSerializer):
    marca = serializers.StringRelatedField()
    categoria = serializers.StringRelatedField()
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Producto
        fields = [
            'id', 'nombre', 'descripcion', 'precio',
            'marca', 'categoria', 'stock',
            'imagen', 'ficha_tecnica', 'imagen_url'
        ]
        read_only_fields = ['id']

    def get_imagen_url(self, obj):
        # Si tiene imagen subida a Cloudinary, usa esa
        if obj.imagen:
            return obj.imagen.url
        # Si tiene una URL directa guardada en un campo adicional
        if hasattr(obj, 'imagen_url') and obj.imagen_url:
            return obj.imagen_url
        return None

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # Por claridad, puedes eliminar el campo 'imagen' si no quieres usarlo en el frontend
        rep['imagen'] = self.get_imagen_url(instance)
        return rep

    
class ProductoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'stock', 'imagen', 'marca', 'categoria']
        read_only_fields = ['id']

    def create(self, validated_data):
        return Producto.objects.create(**validated_data)
    
class ProductoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'stock', 'imagen']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.descripcion = validated_data.get('descripcion', instance.descripcion)
        instance.precio = validated_data.get('precio', instance.precio)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.imagen = validated_data.get('imagen', instance.imagen)
        instance.save()
        return instance

class ProductoDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id']
        read_only_fields = ['id']

    def delete(self, instance):
        instance.delete()
        return instance
    
#Serializers de cotizaciones
    
class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ['id', 'cliente', 'fecha', 'total']
        read_only_fields = ['id', 'total']

    def create(self, validated_data):
        return Cotizacion.objects.create(**validated_data)
    
class CotizacionListSerializer(serializers.ModelSerializer):
    cliente = serializers.StringRelatedField()

    class Meta:
        model = Cotizacion
        fields = ['id', 'cliente', 'fecha', 'total']
        read_only_fields = ['id', 'total']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['cliente'] = instance.cliente.username if instance.cliente else None
        return representation

class CotizacionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ['cliente', 'fecha']
        read_only_fields = ['id', 'total']

    def create(self, validated_data):
        return Cotizacion.objects.create(**validated_data)
    
    
class CotizacionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ['cliente', 'fecha']
        read_only_fields = ['id', 'total']

    def update(self, instance, validated_data):
        instance.cliente = validated_data.get('cliente', instance.cliente)
        instance.fecha = validated_data.get('fecha', instance.fecha)
        instance.save()
        return instance
    
class CotizacionDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ['id']
        read_only_fields = ['id']

    def delete(self, instance):
        instance.delete()
        return instance
    
#Serializers de detalles de cotizaciones
    
class DetalleCotizacionSerializer(serializers.ModelSerializer):
    producto = ProductoListSerializer()

    class Meta:
        model = DetalleCotizacion
        fields = ['id', 'cotizacion', 'producto', 'stock', 'precio_unitario', 'subtotal']
        read_only_fields = ['id', 'subtotal']

    def create(self, validated_data):
        producto_data = validated_data.pop('producto')
        producto = Producto.objects.get(id=producto_data['id'])
        detalle_cotizacion = DetalleCotizacion.objects.create(producto=producto, **validated_data)
        return detalle_cotizacion

class DetalleCotizacionCreateSerializer(serializers.ModelSerializer):
    producto = ProductoListSerializer()

    class Meta:
        model = DetalleCotizacion
        fields = ['cotizacion', 'producto', 'stock', 'precio_unitario']
        read_only_fields = ['id', 'subtotal']

    def create(self, validated_data):
        producto_data = validated_data.pop('producto')
        producto = Producto.objects.get(id=producto_data['id'])
        detalle_cotizacion = DetalleCotizacion.objects.create(producto=producto, **validated_data)
        detalle_cotizacion.subtotal = detalle_cotizacion.stock * detalle_cotizacion.precio_unitario
        detalle_cotizacion.save()
        return detalle_cotizacion
    
class DetalleCotizacionUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCotizacion
        fields = ['producto', 'stock', 'precio_unitario']
        read_only_fields = ['id', 'subtotal']

    def update(self, instance, validated_data):
        instance.producto = validated_data.get('producto', instance.producto)
        instance.stock = validated_data.get('stock', instance.stock)
        instance.precio_unitario = validated_data.get('precio_unitario', instance.precio_unitario)
        instance.subtotal = instance.stock * instance.precio_unitario
        instance.save()
        return instance

class DetalleCotizacionDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleCotizacion
        fields = ['id']
        read_only_fields = ['id']

    def delete(self, instance):
        instance.delete()
        return instance
    
#Serializers de marcas
    
class MarcaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['id', 'nombre']
        read_only_fields = ['id']

    def create(self, validated_data):
        return Marca.objects.create(**validated_data)

class MarcaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['nombre']
        read_only_fields = ['id']

    def create(self, validated_data):
        return Marca.objects.create(**validated_data)
    
class MarcaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['nombre']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()
        return instance

class MarcaDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marca
        fields = ['id']
        read_only_fields = ['id']

    def delete(self, instance):
        instance.delete()
        return instance
    
#Serializers de categorias
    
class CategoriaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']
        read_only_fields = ['id']

    def create(self, validated_data):
        return Categoria.objects.create(**validated_data)
    
class CategoriaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nombre']
        read_only_fields = ['id']

    def create(self, validated_data):
        return Categoria.objects.create(**validated_data)

class CategoriaUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['nombre']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        instance.nombre = validated_data.get('nombre', instance.nombre)
        instance.save()
        return instance
    
class CategoriaDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id']
        read_only_fields = ['id']

    def delete(self, instance):
            instance.delete()
            return instance

class ContactMessageSerializer(serializers.ModelSerializer):
        class Meta:
            model = ContactMessage
            fields = '__all__'
            
        def to_representation(self, instance):
            data = super().to_representation(instance)
            for key in ['nombre', 'apellido', 'email', 'telefono', 'mensaje','estado']:
                if data.get(key) is None:
                    data[key] = ""
            return data