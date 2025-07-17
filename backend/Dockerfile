FROM python:3.11-slim

# Aquí definimos la carpeta de trabajo dentro del contenedor, que será la raíz del backend
WORKDIR /app

# Copiamos requirements para instalar dependencias
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copiamos TODO el backend al contenedor
COPY . .

# Comando para correr gunicorn apuntando al módulo wsgi correcto
CMD ["gunicorn", "main.wsgi:application", "--bind", "0.0.0.0:8000"]
