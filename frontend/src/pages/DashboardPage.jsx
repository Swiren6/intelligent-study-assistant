import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-4">
            Bienvenue, {user.prenom || user.nom} ! 🎉
          </h1>
          <p className="text-muted-foreground mb-6">
            Vous êtes maintenant connecté à StudyAI
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold">Email:</p>
              <p>{user.email}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold">Niveau:</p>
              <p>{user.niveau || 'Non défini'}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-3 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-all"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;