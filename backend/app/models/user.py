"""
Modèle User (Utilisateur)
"""
from app import db
from datetime import datetime
try:
    from werkzeug.security import generate_password_hash, check_password_hash
except Exception:
    # Fallback simple implementation using PBKDF2-HMAC-SHA256 if werkzeug is not available.
    # This provides compatible generate_password_hash/check_password_hash signatures used in this file.
    import hashlib
    import hmac
    import os
    import base64

    def generate_password_hash(password, method='pbkdf2:sha256', salt_length=8):
        salt = base64.b64encode(os.urandom(salt_length)).decode('utf-8')
        dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return f'pbkdf2:sha256${salt}${base64.b64encode(dk).decode()}'

    def check_password_hash(pwhash, password):
        try:
            _method, salt, hashb64 = pwhash.split('$', 2)
            dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
            return hmac.compare_digest(base64.b64encode(dk).decode(), hashb64)
        except Exception:
            return False


class User(db.Model):
    """Modèle pour les utilisateurs de l'application"""
    
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100))
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    mot_de_passe = db.Column(db.String(255), nullable=False)
    niveau = db.Column(db.String(50))  # Ex: Licence 1, Master 2, etc.
    langue = db.Column(db.String(10), default='fr')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relations
    subjects = db.relationship('Subject', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    tasks = db.relationship('Task', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    schedules = db.relationship('Schedule', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    plannings = db.relationship('Planning', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    notifications = db.relationship('Notification', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hasher le mot de passe"""
        self.mot_de_passe = generate_password_hash(password)
    
    def check_password(self, password):
        """Vérifier le mot de passe"""
        return check_password_hash(self.mot_de_passe, password)
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'nom': self.nom,
            'prenom': self.prenom,
            'email': self.email,
            'niveau': self.niveau,
            'langue': self.langue,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<User {self.email}>'