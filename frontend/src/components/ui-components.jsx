// Composants UI réutilisables avec corrections des classes Tailwind dynamiques

// Badge avec styles premium
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20',
    outline: 'border-border text-foreground',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Card avec effet glass
export const GlassCard = ({ children, className = '', hover = true }) => {
  return (
    <div className={`glass-card rounded-2xl p-6 ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

// Button avec gradients
export const GradientButton = ({ children, variant = 'primary', className = '', ...props }) => {
  const variantClasses = {
    primary: 'gradient-primary shadow-glow',
    secondary: 'gradient-secondary shadow-glow',
    accent: 'gradient-accent shadow-glow',
  };

  return (
    <button
      className={`px-6 py-3 ${variantClasses[variant]} text-white rounded-xl font-semibold hover:opacity-90 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Icon Box avec animation
export const IconBox = ({ icon, color = 'primary', size = 'md', animated = true }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-xl flex items-center justify-center ${animated ? 'animate-float' : ''}`}>
      {icon}
    </div>
  );
};

// Stats Card
export const StatsCard = ({ value, label, icon, trend, trendValue }) => {
  return (
    <div className="glass-card rounded-xl p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <div className="text-primary">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
            {trendValue}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

// Feature Card avec image - CORRIGÉ
export const FeatureCard = ({ title, description, image, icon, color = 'primary' }) => {
  // Mapping des couleurs - CORRECTION MAJEURE
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

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className={`absolute top-4 left-4 w-12 h-12 ${colors.bg} backdrop-blur-xl rounded-xl flex items-center justify-center ${colors.text} border ${colors.border}`}>
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// Testimonial Card
export const TestimonialCard = ({ name, role, avatar, content, rating }) => {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4 hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
      {/* Rating */}
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 fill-accent text-accent" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        &quot;{content}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <img 
          src={avatar} 
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-primary/20"
        />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

// Progress Bar avec gradient
export const ProgressBar = ({ value, label, showValue = true, color = 'primary' }) => {
  const colorClasses = {
    primary: 'gradient-primary',
    secondary: 'gradient-secondary',
    accent: 'gradient-accent',
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          {showValue && <span className="font-bold text-primary">{value}%</span>}
        </div>
      )}
      <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

// Loading Spinner
export const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'border-primary/30 border-t-primary',
    secondary: 'border-secondary/30 border-t-secondary',
    accent: 'border-accent/30 border-t-accent',
  };

  return (
    <div className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}></div>
  );
};

// Floating Blob (background decoration)
export const FloatingBlob = ({ color = 'primary', size = 'md', delay = 0, position = 'top-right' }) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72',
    lg: 'w-96 h-96',
  };

  const colorClasses = {
    primary: 'bg-primary/30',
    secondary: 'bg-secondary/30',
    accent: 'bg-accent/30',
  };

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} ${colorClasses[color]} rounded-full blur-3xl animate-blob pointer-events-none`}
      style={{ animationDelay: `${delay}ms` }}
    ></div>
  );
};

// Section Header
export const SectionHeader = ({ badge, title, description, centered = true }) => {
  return (
    <div className={`space-y-4 mb-16 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <div className={centered ? 'flex justify-center' : ''}>
          <Badge variant="default">{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
        {title}
      </h2>
      {description && (
        <p className={`text-base md:text-lg text-muted-foreground ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};

// Grid Container - CORRIGÉ
export const GridContainer = ({ children, cols = 3, gap = 8 }) => {
  const colsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12',
  };

  return (
    <div className={`grid ${colsClasses[cols]} ${gapClasses[gap]}`}>
      {children}
    </div>
  );
};

export default {
  Badge,
  GlassCard,
  GradientButton,
  IconBox,
  StatsCard,
  FeatureCard,
  TestimonialCard,
  ProgressBar,
  LoadingSpinner,
  FloatingBlob,
  SectionHeader,
  GridContainer,
};