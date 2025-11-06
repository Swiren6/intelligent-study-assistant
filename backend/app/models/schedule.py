"""
Modèle Schedule (Emploi du temps)
"""
from app import db
from datetime import datetime


class Schedule(db.Model):
    """Modèle pour les emplois du temps importés"""
    
    __tablename__ = 'schedules'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    fichier_pdf = db.Column(db.String(255))
    date_import = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relations
    courses = db.relationship('Course', backref='schedule', lazy='dynamic', cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'fichier_pdf': self.fichier_pdf,
            'date_import': self.date_import.isoformat() if self.date_import else None,
            'courses': [course.to_dict() for course in self.courses]
        }
    
    def __repr__(self):
        return f'<Schedule {self.id} - User {self.user_id}>'


class Course(db.Model):
    """Modèle pour les cours extraits de l'emploi du temps"""
    
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer, db.ForeignKey('schedules.id'), nullable=False)
    jour = db.Column(db.String(20), nullable=False)  # Lundi, Mardi, etc.
    heure_debut = db.Column(db.Time, nullable=False)
    heure_fin = db.Column(db.Time, nullable=False)
    matiere = db.Column(db.String(100), nullable=False)
    salle = db.Column(db.String(50))
    enseignant = db.Column(db.String(100))
    
    def to_dict(self):
        """Convertir l'objet en dictionnaire"""
        return {
            'id': self.id,
            'schedule_id': self.schedule_id,
            'jour': self.jour,
            'heure_debut': self.heure_debut.strftime('%H:%M') if self.heure_debut else None,
            'heure_fin': self.heure_fin.strftime('%H:%M') if self.heure_fin else None,
            'matiere': self.matiere,
            'salle': self.salle,
            'enseignant': self.enseignant
        }
    
    def __repr__(self):
        return f'<Course {self.matiere} - {self.jour}>'
