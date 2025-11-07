import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ArrowLeft } from 'lucide-react';

const Navbar = ({ showBackButton = false, showAuthLinks = false }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl">StudyAI</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Assistant Intelligent</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {showAuthLinks && (
              <>
                {!isLoginPage && (
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-all"
                  >
                    Connexion
                  </Link>
                )}
                {!isRegisterPage && (
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                  >
                    S'inscrire
                  </Link>
                )}
              </>
            )}

            {showBackButton && (
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Retour à l'accueil</span>
                <span className="sm:hidden">Retour</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;