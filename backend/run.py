"""
Point d'entrée de l'application Flask
"""
from app import create_app
import os

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))  
    debug = os.getenv('DEBUG', 'True') == 'True'
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )