"""
Factory de l'application Flask
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

# Initialiser les extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

def create_app():
    """Créer et configurer l'application Flask"""
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
    app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
    app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', 16777216))
    
    # Initialiser les extensions avec l'app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    limiter.init_app(app)
    
    # Configurer CORS
    CORS(app, origins=os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(','))
    
    # IMPORTANT : Importer les modèles pour que Flask-Migrate les détecte
    from app.models.user import User
    from app.models.subject import Subject
    from app.models.task import Task
    from app.models.schedule import Schedule, Course
    from app.models.planning import Planning
    from app.models.session import Session
    from app.models.notification import Notification
    
    # Importer et enregistrer les blueprints (routes)
    from app.api import auth
    app.register_blueprint(auth.bp)
    
    # TODO: Décommenter après création des autres routes
    # from app.api import users, subjects, tasks, schedules, planning, notifications, statistics
    # app.register_blueprint(users.bp)
    # app.register_blueprint(subjects.bp)
    # app.register_blueprint(tasks.bp)
    # app.register_blueprint(schedules.bp)
    # app.register_blueprint(planning.bp)
    # app.register_blueprint(notifications.bp)
    # app.register_blueprint(statistics.bp)
    
    # Route de test
    @app.route('/')
    def index():
        return {
            'message': 'API Assistant Intelligent d\'Organisation des Études',
            'status': 'running',
            'version': '1.0.0'
        }
    
    @app.route('/health')
    def health():
        return {'status': 'healthy'}, 200
    
    return app
