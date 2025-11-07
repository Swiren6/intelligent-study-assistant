import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Brain, Calendar, TrendingUp, Bell, BarChart, Target, 
  CheckCircle, Zap, Shield, Users, Star, ArrowRight, Sparkles,
  Clock, Award, TrendingDown, PlayCircle, ChevronRight
} from 'lucide-react';

const HomePage = () => {
   const [_activeFeature, setActiveFeature] = useState(0);
   const [_scrollY, _setScrollY] = useState(0);

  const colorClasses = {
    primary: {
      bg: 'bg-primary/20',
      text: 'text-primary',
      border: 'border-primary/20'
    },
    secondary: {
      bg: 'bg-secondary/20',
      text: 'text-secondary',
      border: 'border-secondary/20'
    },
    accent: {
      bg: 'bg-accent/20',
      text: 'text-accent',
      border: 'border-accent/20'
    },
    success: {
      bg: 'bg-success/20',
      text: 'text-success',
      border: 'border-success/20'
    }
  };

  useEffect(() => {
  const handleScroll = () => _setScrollY(window.scrollY);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Planning Intelligent",
      description: "Génération automatique d'un emploi du temps optimisé par IA",
      color: "primary",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Rappels Smart",
      description: "Notifications personnalisées au moment parfait",
      color: "secondary",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Analytics Avancés",
      description: "Visualisez votre progression en temps réel",
      color: "accent",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "IA Prédictive",
      description: "Anticipe vos besoins et adapte votre planning",
      color: "success",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Objectifs Gamifiés",
      description: "Atteignez vos buts avec un système de récompenses",
      color: "primary",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ML Performance",
      description: "Machine Learning pour maximiser vos résultats",
      color: "secondary",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Martin",
      role: "Étudiante en Médecine",
      avatar: "https://i.pravatar.cc/150?img=1",
      content: "StudyAI m'a permis d'économiser 8h par semaine. Je suis passée de 12/20 à 16/20 de moyenne !",
      rating: 5
    },
    {
      name: "Thomas Dubois",
      role: "Master Informatique",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: "L'IA prédit exactement quand je suis le plus productif. C'est bluffant.",
      rating: 5
    },
    {
      name: "Léa Bernard",
      role: "Licence Économie",
      avatar: "https://i.pravatar.cc/150?img=5",
      content: "Fini le stress des deadlines ! Le planning s'adapte automatiquement.",
      rating: 5
    }
  ];

  const stats = [
    { value: "1,234+", label: "Étudiants actifs", icon: <Users className="w-5 h-5" /> },
    { value: "5h+", label: "Économisées/semaine", icon: <Clock className="w-5 h-5" /> },
    { value: "87%", label: "Taux de réussite", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "4.9/5", label: "Note moyenne", icon: <Star className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation avec effet glassmorphism */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-slide-in-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-50 animate-pulse-glow"></div>
                <div className="relative w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="font-bold text-xl gradient-text">
                StudyAI
              </h1>
            </div>
            
            <div className="flex items-center gap-3 animate-slide-in-right">
              <Link to="/login">
                <button className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-all">
                  Connexion
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 text-sm font-semibold gradient-primary text-white rounded-lg hover:opacity-90 transition-all shadow-glow">
                  Essai Gratuit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section avec mesh gradient */}
      <section className="relative pt-32 pb-20 gradient-mesh">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 animate-scale-in">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Propulsé par GPT-4 & ML Avancé
                </span>
              </div>
              
              <h1 className="text-responsive-xl font-bold leading-tight">
                Révolutionnez votre{' '}
                <span className="gradient-text">
                  façon d'étudier
                </span>{' '}
                avec l'IA
              </h1>
              
              <p className="text-responsive-sm text-muted-foreground leading-relaxed">
                L'assistant intelligent qui analyse votre emploi du temps, génère un planning 
                personnalisé et s'adapte à votre productivité en temps réel.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <button className="group px-8 py-4 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-glow-lg hover:shadow-glow flex items-center gap-2">
                    Commencer Gratuitement
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="px-8 py-4 glass-card rounded-xl font-semibold hover:bg-muted transition-all flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Voir la Démo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="glass-card rounded-xl p-4 hover-lift animate-slide-in-up"
                    style={{ animationDelay: `${Math.min(idx * 100, 1000)}ms` }}

                  >
                    <div className="flex items-center gap-2 text-primary mb-1">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - 3D Card */}
            <div className="relative animate-slide-in-right">
              {/* Floating blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-blob delay-700"></div>
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent/30 rounded-full blur-3xl animate-blob delay-1000"></div>
              
              {/* Main Card */}
              <div className="relative glass-card rounded-3xl p-8 shadow-glow-lg hover-lift">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg animate-float">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Intelligence Artificielle</h3>
                      <p className="text-sm text-muted-foreground">Analyse & Optimisation</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {[
                      { text: "Analyse automatique des cours", delay: 0 },
                      { text: "Extraction d'horaires intelligente", delay: 200 },
                      { text: "Planning optimisé en temps réel", delay: 400 }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 animate-slide-in-left"
                        style={{ animationDelay: `${item.delay}ms` }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <p className="text-sm">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Productivité</span>
                      <span className="font-bold text-primary">+87%</span>
                    </div>
                    <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
                      <div className="h-full gradient-primary rounded-full animate-shimmer" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  {/* Image preview */}
                  <div className="rounded-xl overflow-hidden border border-border/50">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop" 
                      alt="Dashboard Preview"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid avec images */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4 animate-slide-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Zap className="w-4 h-4" />
              Fonctionnalités Premium
            </div>
            <h2 className="text-responsive-lg font-bold">
              Tout ce dont vous avez besoin pour{' '}
              <span className="gradient-text">exceller</span>
            </h2>
            <p className="text-responsive-sm text-muted-foreground max-w-2xl mx-auto">
              Une suite complète d'outils propulsés par l'IA pour optimiser chaque aspect de vos études
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
  const colors = colorClasses[feature.color] || colorClasses.primary;
  return (
    <div
      key={idx}
      className="group glass-card rounded-2xl overflow-hidden hover-lift animate-slide-in-up cursor-pointer"
      style={{ animationDelay: `${idx * 100}ms` }}
      onMouseEnter={() => setActiveFeature(idx)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={feature.image} 
          alt={feature.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className={`absolute top-4 left-4 w-12 h-12 ${colors.bg} backdrop-blur-xl rounded-xl flex items-center justify-center ${colors.text} border ${colors.border}`}>
          {feature.icon}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
          En savoir plus
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
})}
          </div>
        </div>
      </section>

      {/* Testimonials avec avatars */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-responsive-lg font-bold">
              Ils ont transformé{' '}
              <span className="gradient-text">leurs études</span>
            </h2>
            <p className="text-responsive-sm text-muted-foreground">
              Rejoignez plus de 1,200 étudiants qui ont déjà amélioré leurs résultats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 space-y-4 hover-lift animate-slide-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final avec effet premium */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative gradient-primary rounded-3xl p-12 overflow-hidden shadow-glow-lg">
            {/* Pattern overlay */}
            <div className="absolute inset-0 pattern-dots opacity-10"></div>
            
            {/* Floating shapes */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float delay-500"></div>

            <div className="relative z-10 text-center text-white space-y-6">
              <h2 className="text-responsive-lg font-bold">
                Prêt à révolutionner vos études ?
              </h2>
              <p className="text-responsive-sm text-white/80 max-w-2xl mx-auto">
                Rejoignez gratuitement et découvrez comment l'IA peut transformer votre façon d'apprendre
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/register">
                  <button className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-all shadow-xl hover-scale flex items-center gap-2">
                    Commencer Gratuitement
                    <Sparkles className="w-5 h-5" />
                  </button>
                </Link>
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all backdrop-blur-xl">
                  Planifier une Démo
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex justify-center gap-8 pt-8">
                <div className="flex items-center gap-2 text-white/80">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">100% Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="w-5 h-5" />
                  <span className="text-sm">Sans Engagement</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm">Setup en 2 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer moderne */}
      <footer className="border-t border-border bg-muted/30 backdrop-blur-xl py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg gradient-text">StudyAI</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                L'assistant intelligent qui révolutionne votre façon d'étudier
              </p>
            </div>

            {/* Links */}
            {['Produit', 'Ressources', 'Légal'].map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold mb-4">{section}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Fonctionnalités</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Tarifs</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 StudyAI. Propulsé par l'IA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;