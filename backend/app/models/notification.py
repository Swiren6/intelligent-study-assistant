"""
Modèle Notification
"""
from app import db
from datetime import datetime


class Notification(db.Model):
    """Modèle pour les notifications envoyées aux utilisateurs"""
    
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    type = db.Column(db.String(50), nullable=False)  # rappel, conseil, alerte
    message = db.Column(db.Text, nullable=False)
    date_envoi = db.Column(db.DateTime, nullable=False)
    lue = db.Column(db.Boolean, default=False, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'message': self.message,
            'date_envoi': self.date_envoi.isoformat() if self.date_envoi else None,
            'lue': self.lue,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def mark_as_read(self):
        """Marquer la notification comme lue"""
        self.lue = True
        db.session.commit()
    
    def __repr__(self):
        return f'<Notification {self.type} - User {self.user_id}>'
