"""
Service d'authentification
Gère l'inscription, la connexion et la gestion des tokens JWT
"""
from app import db
from app.models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta


class AuthService:
    """Service pour gérer l'authentification des utilisateurs"""
    
    @staticmethod
    def register_user(nom, email, password, prenom=None, niveau=None, langue='fr'):
        """
        Inscrire un nouvel utilisateur
        
        Args:
            nom: Nom de l'utilisateur
            email: Email de l'utilisateur
            password: Mot de passe en clair
            prenom: Prénom (optionnel)
            niveau: Niveau d'études (optionnel)
            langue: Langue préférée (par défaut 'fr')
            
        Returns:
            dict: Utilisateur créé et tokens JWT
            
        Raises:
            ValueError: Si l'email existe déjà ou si les données sont invalides
        """
        # Vérifier si l'email existe déjà
        if User.query.filter_by(email=email).first():
            raise ValueError("Un utilisateur avec cet email existe déjà")
        
        # Vérifier que les champs obligatoires sont présents
        if not nom or not email or not password:
            raise ValueError("Le nom, l'email et le mot de passe sont obligatoires")
        
        # Vérifier la longueur du mot de passe
        if len(password) < 6:
            raise ValueError("Le mot de passe doit contenir au moins 6 caractères")
        
        # Créer le nouvel utilisateur
        user = User(
            nom=nom,
            prenom=prenom,
            email=email,
            niveau=niveau,
            langue=langue
        )
        user.set_password(password)
        
        # Sauvegarder dans la base de données
        db.session.add(user)
        db.session.commit()
        
        # Générer les tokens JWT (IMPORTANT: convertir user.id en string)
        access_token = create_access_token(
            identity=str(user.id),  # ← Convertir en string
            expires_delta=timedelta(hours=1)
        )
        refresh_token = create_refresh_token(
            identity=str(user.id),  # ← Convertir en string
            expires_delta=timedelta(days=30)
        )
        
        return {
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    
    @staticmethod
    def login_user(email, password):
        """
        Connecter un utilisateur
        
        Args:
            email: Email de l'utilisateur
            password: Mot de passe en clair
            
        Returns:
            dict: Utilisateur et tokens JWT
            
        Raises:
            ValueError: Si les identifiants sont incorrects
        """
        # Vérifier que les champs sont présents
        if not email or not password:
            raise ValueError("L'email et le mot de passe sont obligatoires")
        
        # Chercher l'utilisateur
        user = User.query.filter_by(email=email).first()
        
        # Vérifier que l'utilisateur existe et que le mot de passe est correct
        if not user or not user.check_password(password):
            raise ValueError("Email ou mot de passe incorrect")
        
        # Générer les tokens JWT (IMPORTANT: convertir user.id en string)
        access_token = create_access_token(
            identity=str(user.id),  # ← Convertir en string
            expires_delta=timedelta(hours=1)
        )
        refresh_token = create_refresh_token(
            identity=str(user.id),  # ← Convertir en string
            expires_delta=timedelta(days=30)
        )
        
        return {
            'user': user.to_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token
        }
    
    @staticmethod
    def get_user_by_id(user_id):
        """
        Récupérer un utilisateur par son ID
        
        Args:
            user_id: ID de l'utilisateur (string ou int)
            
        Returns:
            User: L'utilisateur ou None
        """
        # Convertir en int si c'est une string
        if isinstance(user_id, str):
            user_id = int(user_id)
        return User.query.get(user_id)
    
    @staticmethod
    def update_user_profile(user_id, **kwargs):
        """
        Mettre à jour le profil d'un utilisateur
        
        Args:
            user_id: ID de l'utilisateur (string ou int)
            **kwargs: Champs à mettre à jour (nom, prenom, niveau, langue)
            
        Returns:
            dict: Utilisateur mis à jour
            
        Raises:
            ValueError: Si l'utilisateur n'existe pas
        """
        # Convertir en int si c'est une string
        if isinstance(user_id, str):
            user_id = int(user_id)
            
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Utilisateur non trouvé")
        
        # Mettre à jour les champs autorisés
        allowed_fields = ['nom', 'prenom', 'niveau', 'langue']
        for field in allowed_fields:
            if field in kwargs:
                setattr(user, field, kwargs[field])
        
        db.session.commit()
        return user.to_dict()
    
    @staticmethod
    def change_password(user_id, old_password, new_password):
        """
        Changer le mot de passe d'un utilisateur
        
        Args:
            user_id: ID de l'utilisateur (string ou int)
            old_password: Ancien mot de passe
            new_password: Nouveau mot de passe
            
        Returns:
            bool: True si le changement a réussi
            
        Raises:
            ValueError: Si l'ancien mot de passe est incorrect
        """
        # Convertir en int si c'est une string
        if isinstance(user_id, str):
            user_id = int(user_id)
            
        user = User.query.get(user_id)
        if not user:
            raise ValueError("Utilisateur non trouvé")
        
        # Vérifier l'ancien mot de passe
        if not user.check_password(old_password):
            raise ValueError("Ancien mot de passe incorrect")
        
        # Vérifier la longueur du nouveau mot de passe
        if len(new_password) < 6:
            raise ValueError("Le nouveau mot de passe doit contenir au moins 6 caractères")
        
        # Mettre à jour le mot de passe
        user.set_password(new_password)
        db.session.commit()
        
        return True