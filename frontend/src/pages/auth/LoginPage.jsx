import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Eye, EyeOff, BookOpen } from "lucide-react"
import { apiService } from "../../../lib/api-service"

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get("registered")) {
      setSuccess(true)
      const timer = setTimeout(() => setSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [location])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs")
      setLoading(false)
      return
    }

    try {
      // Appel à l'API Flask via notre service
      await apiService.login({
        email: formData.email,
        password: formData.password,
      })

      // Rediriger vers le dashboard
      navigate("/dashboard")
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Email ou mot de passe incorrect"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex overflow-hidden">
      {/* Left side - Features */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary via-secondary to-primary p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-pulse-glow"></div>
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 animate-slide-in-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">StudyAI</h1>
          </div>
          <p className="text-white/80 text-sm">Assistant Intelligent d&apos;Organisation des Études</p>
        </div>

        <div className="relative z-10 space-y-6 animate-fade-in-up">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Bon retour parmi nous !</h2>
            <p className="text-white/80 leading-relaxed">
              Continuez votre parcours d&apos;apprentissage optimisé avec notre assistant intelligent.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <p className="text-white font-semibold">1,234</p>
                  <p className="text-white/70 text-sm">Heures économisées</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <p className="text-white font-semibold">87%</p>
                  <p className="text-white/70 text-sm">Taux de réussite moyen</p>
                </div>
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
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">StudyAI</h1>
          </div>

          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h2 className="text-3xl font-bold">Connexion</h2>
              <p className="text-muted-foreground mt-2">Accédez à votre espace d&apos;étude personnalisé</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-4 rounded-lg animate-fade-in-up">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-lg dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 animate-fade-in-up">
                  Inscription réussie! Connectez-vous avec vos identifiants.
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="bg-muted border-0 py-3 px-4 rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-foreground">
                    Mot de passe
                  </label>
                  <Link to="#" className="text-sm text-primary hover:underline font-medium">
                    Oublié?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="bg-muted border-0 py-3 px-4 pr-12 rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
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

              <Button
                type="submit"
                className="w-full py-3 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">Ou</span>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Pas encore de compte?{" "}
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  S&apos;inscrire
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            En continuant, vous acceptez nos conditions d&apos;utilisation
          </p>
        </div>
      </div>
    </main>
  )
}