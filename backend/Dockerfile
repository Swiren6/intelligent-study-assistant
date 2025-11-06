FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les requirements
COPY requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application
COPY . .

# Exposer le port
EXPOSE 5000

# Variable d'environnement
ENV FLASK_APP=run.py

# Commande de démarrage
CMD ["python", "run.py"]