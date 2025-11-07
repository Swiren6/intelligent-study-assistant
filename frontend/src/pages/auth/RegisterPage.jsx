import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Check } from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/Navbar';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    niveau: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStep1 = () => {
    if (!formData.nom || !formData.email) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setError('');
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.nom || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tous les champs sont obligatoires');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        password: formData.password,
        niveau: formData.niveau,
        langue: 'fr',
      });

      // Sauvegarder les tokens
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Rediriger vers le dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar showBackButton={true} />
    <main className="min-h-screen bg-background flex overflow-hidden">
      {/* Left side - Features */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-secondary via-primary to-secondary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative z-10 animate-slide-in-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">StudyAI</h1>
          </div>
          <p className="text-white/80 text-sm">Assistant Intelligent d'Organisation des Études</p>
        </div>

        <div className="relative z-10 space-y-6 animate-fade-in-up">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Rejoignez la révolution de l'étude</h2>
            <p className="text-white/80 leading-relaxed">
              Nos étudiants économisent en moyenne 5 heures par semaine avec notre système d'organisation intelligent.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Inscription gratuite</p>
                <p className="text-white/70 text-sm">Accès immédiat à toutes les fonctionnalités</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Données sécurisées</p>
                <p className="text-white/70 text-sm">Cryptage de bout en bout de vos informations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold">Support 24/7</p>
                <p className="text-white/70 text-sm">Notre équipe vous aide à chaque étape</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">StudyAI</h1>
          </div>

          <div className={`space-y-8 transition-all duration-500 ${currentStep === 1 ? 'animate-slide-in-right' : ''}`}>
            <div>
              <h2 className="text-3xl font-bold">Créer un compte</h2>
              <p className="text-muted-foreground mt-2">
                {currentStep === 1 ? 'Commençons par les informations de base' : 'Sécurisez votre compte'}
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <div
                className={`h-2 rounded-full transition-all ${currentStep >= 1 ? 'bg-primary w-8' : 'bg-border w-2'}`}
              ></div>
              <div className={`flex-1 h-0.5 transition-all ${currentStep >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
              <div
                className={`h-2 rounded-full transition-all ${currentStep >= 2 ? 'bg-primary w-8' : 'bg-border w-2'}`}
              ></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-4 rounded-lg animate-fade-in-up">
                  {error}
                </div>
              )}

              {currentStep === 1 ? (
                <div className="space-y-5 animate-slide-in-right">
                  <div className="space-y-2">
                    <label htmlFor="nom" className="text-sm font-semibold text-foreground">
                      Nom
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      placeholder="Doe"
                      value={formData.nom}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full bg-muted border-0 py-3 px-4 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-background transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="prenom" className="text-sm font-semibold text-foreground">
                      Prénom (optionnel)
                    </label>
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      placeholder="John"
                      value={formData.prenom}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full bg-muted border-0 py-3 px-4 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-background transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="vous@exemple.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full bg-muted border-0 py-3 px-4 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-background transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="niveau" className="text-sm font-semibold text-foreground">
                      Niveau d'études (optionnel)
                    </label>
                    <select
                      id="niveau"
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full bg-muted border-0 py-3 px-4 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-background transition-all outline-none"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="Licence 1">Licence 1</option>
                      <option value="Licence 2">Licence 2</option>
                      <option value="Licence 3">Licence 3</option>
                      <option value="Master 1">Master 1</option>
                      <option value="Master 2">Master 2</option>
                      <option value="Doctorat">Doctorat</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleStep1}
                    className="w-full py-3 text-base font-semibold rounded-lg bg-secondary hover:bg-secondary/90 text-white transition-all"
                  >
                    Continuer
                  </button>
                </div>
              ) : (
                <div className="space-y-5 animate-slide-in-right">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-muted border-0 py-3 px-4 pr-12 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-background transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground">
                      Confirmer le mot de passe
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-muted border-0 py-3 px-4 pr-12 rounded-lg focus:ring-2 focus:ring-secondary focus:bg-background transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full py-3 text-base font-semibold rounded-lg bg-secondary hover:bg-secondary/90 text-white transition-all"
                      disabled={loading}
                    >
                      {loading ? 'Inscription en cours...' : "S'inscrire"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      disabled={loading}
                      className="w-full py-3 text-base font-semibold rounded-lg border border-border hover:bg-muted transition-all"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Vous avez déjà un compte?{' '}
              <Link to="/login" className="text-secondary hover:underline font-semibold">
                Connectez-vous
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            En continuant, vous acceptez nos conditions d'utilisation
          </p>
        </div>
      </div>
    </main>
    </>
  );
};

export default RegisterPage;
