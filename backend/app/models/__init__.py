"""
Expose les classes de modèles pour faciliter leur import.
"""
from app.models.user import User
from app.models.subject import Subject
from app.models.task import Task
from app.models.schedule import Schedule, Course
from app.models.planning import Planning
from app.models.session import Session
from app.models.notification import Notification

__all__ = [
    "User",
    "Subject",
    "Task",
    "Schedule",
    "Course",
    "Planning",
    "Session",
    "Notification",
]
