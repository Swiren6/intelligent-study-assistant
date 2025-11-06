"""
Modèle Task (Tâche/Examen)
"""
from app import db
from datetime import datetime


class Task(db.Model):
    """Modèle pour les tâches et examens"""
    
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'))
    titre = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    date_limite = db.Column(db.DateTime, nullable=False, index=True)
    priorite = db.Column(db.Integer, default=1)  # 1=Basse, 3=Moyenne, 5=Haute
    etat = db.Column(db.String(20), default='à faire')  # à faire, en cours, terminée
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relations
    sessions = db.relationship('Session', backref='task', lazy='dynamic')
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subject_id': self.subject_id,
            'subject': self.subject.to_dict() if self.subject else None,
            'titre': self.titre,
            'description': self.description,
            'date_limite': self.date_limite.isoformat() if self.date_limite else None,
            'priorite': self.priorite,
            'etat': self.etat,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f'<Task {self.titre}>'
