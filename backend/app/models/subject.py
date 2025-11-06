"""
Modèle Subject (Matière)
"""
from app import db
from datetime import datetime


class Subject(db.Model):
    """Modèle pour les matières étudiées"""
    
    __tablename__ = 'subjects'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    titre = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    couleur = db.Column(db.String(7), default='#0ea5e9')  # Couleur hex pour l'UI
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relations
    tasks = db.relationship('Task', backref='subject', lazy='dynamic')
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'titre': self.titre,
            'description': self.description,
            'couleur': self.couleur,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Subject {self.titre}>'