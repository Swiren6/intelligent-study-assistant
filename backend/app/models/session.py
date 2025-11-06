"""
Modèle Session (Session d'étude)
"""
from app import db
from datetime import datetime


class Session(db.Model):
    """Modèle pour les sessions d'étude planifiées"""
    
    __tablename__ = 'sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    planning_id = db.Column(db.Integer, db.ForeignKey('plannings.id'), nullable=False, index=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    date = db.Column(db.Date, nullable=False, index=True)
    heure_debut = db.Column(db.Time, nullable=False)
    heure_fin = db.Column(db.Time, nullable=False)
    matiere = db.Column(db.String(100))
    description = db.Column(db.Text)
    completee = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'planning_id': self.planning_id,
            'task_id': self.task_id,
            'task': self.task.to_dict() if self.task else None,
            'date': self.date.isoformat() if self.date else None,
            'heure_debut': self.heure_debut.strftime('%H:%M') if self.heure_debut else None,
            'heure_fin': self.heure_fin.strftime('%H:%M') if self.heure_fin else None,
            'matiere': self.matiere,
            'description': self.description,
            'completee': self.completee,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Session {self.matiere} - {self.date}>'
