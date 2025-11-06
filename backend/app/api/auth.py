"""
Routes API pour l'authentification
"""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required, 
    get_jwt_identity,
    create_access_token
)
from app.services.auth_service import AuthService
from datetime import timedelta

# Créer le Blueprint
bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/register', methods=['POST'])
def register():
    """
    Inscription d'un nouvel utilisateur
    
    Body:
        {
            "nom": "Abdelkhalek",
            "prenom": "Sirine",
            "email": "Sirine.Abdelkhalek@gmail.com",
            "password": "Sirine123",
            "niveau": "GL5",
            "langue": "fr"
        }
    
    Returns:
        201: Utilisateur créé avec succès
        400: Erreur de validation
        409: Email déjà existant
    """
    try:
        data = request.get_json()
        
        # Extraire les données
        nom = data.get('nom')
        prenom = data.get('prenom')
        email = data.get('email')
        password = data.get('password')
        niveau = data.get('niveau')
        langue = data.get('langue', 'fr')
        
        # Appeler le service d'inscription
        result = AuthService.register_user(
            nom=nom,
            email=email,
            password=password,
            prenom=prenom,
            niveau=niveau,
            langue=langue
        )
        
        return jsonify({
            'message': 'Inscription réussie',
            'user': result['user'],
            'access_token': result['access_token'],
            'refresh_token': result['refresh_token']
        }), 201
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Erreur serveur', 'details': str(e)}), 500


@bp.route('/login', methods=['POST'])
def login():
    """
    Connexion d'un utilisateur
    
    Body:
        {
            "email": "Sirine.Abdelkhalek@example.com",
            "password": "Sirine123"
        }
    
    Returns:
        200: Connexion réussie
        401: Identifiants incorrects
        400: Erreur de validation
    """
    try:
        data = request.get_json()
        
        # Extraire les données
        email = data.get('email')
        password = data.get('password')
        
        # Appeler le service de connexion
        result = AuthService.login_user(email, password)
        
        return jsonify({
            'message': 'Connexion réussie',
            'user': result['user'],
            'access_token': result['access_token'],
            'refresh_token': result['refresh_token']
        }), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 401
    except Exception as e:
        return jsonify({'error': 'Erreur serveur', 'details': str(e)}), 500


@bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Déconnexion d'un utilisateur
    
    Note: Avec JWT, la déconnexion côté client consiste à supprimer le token.
    Cette route existe pour la cohérence de l'API.
    
    Returns:
        200: Déconnexion réussie
    """
    return jsonify({'message': 'Déconnexion réussie'}), 200


@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """
    Rafraîchir le token d'accès
    
    Headers:
        Authorization: Bearer <refresh_token>
    
    Returns:
        200: Nouveau token d'accès
        401: Token invalide ou expiré
    """
    try:
        # Récupérer l'identité de l'utilisateur depuis le refresh token
        user_id = get_jwt_identity()
        
        # Créer un nouveau token d'accès (user_id est déjà une string)
        new_access_token = create_access_token(
            identity=user_id,  # Déjà en string
            expires_delta=timedelta(hours=1)
        )
        
        return jsonify({
            'access_token': new_access_token
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Erreur serveur', 'details': str(e)}), 500


@bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """
    Récupérer le profil de l'utilisateur connecté
    
    Headers:
        Authorization: Bearer <access_token>
    
    Returns:
        200: Profil utilisateur
        401: Non authentifié
        404: Utilisateur non trouvé
    """
    try:
        # Récupérer l'ID de l'utilisateur depuis le token (c'est une string)
        user_id = get_jwt_identity()
        
        # Récupérer l'utilisateur (le service gère la conversion)
        user = AuthService.get_user_by_id(user_id)
        
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
        
        return jsonify({
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Erreur serveur', 'details': str(e)}), 500


@bp.route('/me', methods=['PUT'])
@jwt_required()
def update_current_user():
    """
    Mettre à jour le profil de l'utilisateur connecté
    
    Headers:
        Authorization: Bearer <access_token>
    
    Body:
        {
            "nom": "Abdelkhalek",
            "prenom": "Sirine",
            "niveau": "GL5",
            "langue": "en"
        }
    
    Returns:
        200: Profil mis à jour
        400: Erreur de validation
        401: Non authentifié
    """
    try:
        # Récupérer l'ID de l'utilisateur
        user_id = get_jwt_identity()
        
        # Récupérer les données
        data = request.get_json()
        
        # Mettre à jour le profil
        updated_user = AuthService.update_user_profile(user_id, **data)
        
        return jsonify({
            'message': 'Profil mis à jour',
            'user': updated_user
        }), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Erreur serveur', 'details': str(e)}), 500


@bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """
    Changer le mot de passe de l'utilisateur connecté
    
    Headers:
        Authorization: Bearer <access_token>
    
    Body:
        {
            "old_password": "Sirine123",
            "new_password": "newpassword456"
        }
    
    Returns:
        200: Mot de passe changé
        400: Erreur de validation
        401: Ancien mot de passe incorrect
    """
    try:
        # Récupérer l'ID de l'utilisateur
        user_id = get_jwt_identity()
        
        # Récupérer les données
        data = request.get_json()
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        
        # Changer le mot de passe
        AuthService.change_password(user_id, old_password, new_password)
        
        return jsonify({
            'message': 'Mot de passe changé avec succès'
        }), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 401
    except Exception as e:
        return jsonify({'error': 'Erreur serveur', 'details': str(e)}), 500