import React from 'react';

/**
 * Reusable Card component
 */
export const Card = ({ 
  children, 
  className = '',
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-stone-800/50 border-amber-900/50',
    highlight: 'bg-gradient-to-br from-orange-900/70 via-stone-900 to-orange-900/70 border-amber-800/60',
    dark: 'bg-stone-900/50 border-amber-900/50',
  };

  return (
    <div className={`p-4 rounded-lg border hover:bg-stone-800/80 transition-colors ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};
