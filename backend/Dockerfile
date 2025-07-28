# Usa imagen base ligera de Python
FROM python:3.11-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo el archivo de requerimientos primero (para aprovechar cache)
COPY requirements.txt .

# Instala pip y las dependencias
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# ✅ Copia el resto del código del proyecto al contenedor
COPY . .

# ✅ Ejecuta collectstatic ya con manage.py dentro
RUN python manage.py collectstatic --noinput

# Comando final (por ejemplo, usar gunicorn en producción)
CMD ["gunicorn", "main.wsgi:application", "--bind", "0.0.0.0:8000"]
