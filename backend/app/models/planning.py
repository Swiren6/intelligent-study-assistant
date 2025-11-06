"""
Modèle Planning
"""
from app import db
from datetime import datetime


class Planning(db.Model):
    """Modèle pour les plannings d'étude générés"""
    
    __tablename__ = 'plannings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    titre = db.Column(db.String(200), default='Planning d\'étude')
    date_debut = db.Column(db.Date, nullable=False)
    date_fin = db.Column(db.Date, nullable=False)
    actif = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relations
    sessions = db.relationship('Session', backref='planning', lazy='dynamic', cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'titre': self.titre,
            'date_debut': self.date_debut.isoformat() if self.date_debut else None,
            'date_fin': self.date_fin.isoformat() if self.date_fin else None,
            'actif': self.actif,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'sessions': [session.to_dict() for session in self.sessions]
        }
    
    def __repr__(self):
        return f'<Planning {self.titre}>'
