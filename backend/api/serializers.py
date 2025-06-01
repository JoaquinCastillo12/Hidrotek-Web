from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Producto, Cotizacion, DetalleCotizacion


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

        # Puedes agregar más info si quieres (como el username)
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

    
class ProductoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'stock', 'imagen']
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['imagen'] = instance.imagen.url if instance.imagen else None
        return representation
    
class ProductoListSerializer(serializers.ModelSerializer):
    marca = serializers.StringRelatedField()
    categoria = serializers.StringRelatedField()

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio', 'marca', 'categoria', 'stock', 'imagen']
        read_only_fields = ['id']


    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['imagen'] = instance.imagen.url if instance.imagen else None
        return representation
    
class ProductoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['nombre', 'descripcion', 'precio', 'stock', 'imagen']
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
    
class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ['id', 'cliente', 'fecha', 'total']
        read_only_fields = ['id', 'total']

    def create(self, validated_data):
        return Cotizacion.objects.create(**validated_data)
    
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
    
