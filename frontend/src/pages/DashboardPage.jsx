import { useState, useEffect } from 'react';import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  BookOpen,
  TrendingUp,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Target,
  Brain
} from 'lucide-react';
import api from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const statColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success'
  };

  const sessionColorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
  };
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get('/api/auth/me');
        setUser(response.data.user);
      } catch (error) {
        console.error('Erreur chargement utilisateur:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Heures étudiées",
      value: "24h",
      change: "+12%",
      color: "primary"
    },
    {
      icon: <Target className="w-6 h-6" />,
      label: "Objectifs atteints",
      value: "8/10",
      change: "80%",
      color: "secondary"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Progression",
      value: "+15%",
      change: "Cette semaine",
      color: "accent"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Sessions",
      value: "12",
      change: "Cette semaine",
      color: "primary"
    }
  ];

  const upcomingSessions = [
    {
      subject: "Mathématiques",
      time: "14:00 - 16:00",
      date: "Aujourd'hui",
      color: "primary"
    },
    {
      subject: "Physique",
      time: "16:30 - 18:00",
      date: "Aujourd'hui",
      color: "secondary"
    },
    {
      subject: "Informatique",
      time: "09:00 - 11:00",
      date: "Demain",
      color: "accent"
    }
  ];

  const quickActions = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Emploi du temps",
      description: "Voir et gérer",
      href: "/schedule"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Matières",
      description: "Gérer les cours",
      href: "/subjects"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Objectifs",
      description: "Définir des cibles",
      href: "/goals"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Statistiques",
      description: "Voir progression",
      href: "/stats"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">StudyAI</h1>
                <p className="text-xs text-muted-foreground">Tableau de bord</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-muted transition-all">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-all">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Bienvenue, {user?.prenom || user?.nom} ! 👋
          </h2>
          <p className="text-muted-foreground">
            Voici un aperçu de votre progression aujourd'hui
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
  const iconBgClass = stat.color === 'primary' ? 'bg-primary/10' :
                      stat.color === 'secondary' ? 'bg-secondary/10' :
                      stat.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10';
  const iconTextClass = statColorClasses[stat.color] || 'text-primary';
  
  return (
    <div
      key={idx}
      className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all animate-fade-in-up"
      style={{ animationDelay: `${idx * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${iconBgClass} rounded-lg flex items-center justify-center ${iconTextClass}`}>
          {stat.icon}
        </div>
        <span className="text-sm font-semibold text-green-500">{stat.change}</span>
      </div>
      <p className="text-2xl font-bold mb-1">{stat.value}</p>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
})}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-xl font-bold mb-6">Actions rapides</h3>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(action.href)}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Activité récente</h3>
                <button className="text-sm text-primary hover:underline">Voir tout</button>
              </div>
              <div className="space-y-4">
                {[
                  { action: "Session terminée", subject: "Mathématiques", time: "Il y a 2h" },
                  { action: "Objectif atteint", subject: "Physique - Chapitre 3", time: "Il y a 5h" },
                  { action: "Planning mis à jour", subject: "Semaine prochaine", time: "Hier" }
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      ✓
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Prochaines sessions</h3>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session, idx) => {
  const sessionColors = sessionColorClasses[session.color] || sessionColorClasses.primary;
  
  return (
    <div
      key={idx}
      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">{session.subject}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${sessionColors}`}>
          {session.date}
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        {session.time}
      </div>
    </div>
  );
})}
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Objectif de la semaine</h3>
              <p className="text-white/80 text-sm mb-4">20 heures d'étude</p>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span className="font-bold">14h / 20h</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <p className="text-xs text-white/70 mt-4">
                Plus que 6 heures pour atteindre votre objectif ! 💪
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
