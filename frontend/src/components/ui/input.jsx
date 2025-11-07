import React from 'react';

/**
 * Input Component - Composant d'entrée réutilisable
 * Conforme au design system de StudyAI
 */
export function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`w-full bg-muted border-0 py-3 px-4 rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}

export default Input;