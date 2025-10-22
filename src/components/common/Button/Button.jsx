import React from 'react';

/**
 * Reusable Button component
 */
export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-amber-600 text-white hover:bg-amber-700 shadow-lg shadow-amber-900/40',
    secondary: 'bg-stone-800/60 text-stone-300 hover:bg-stone-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-stone-400 hover:text-white hover:bg-stone-700/50',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
      {children}
    </button>
  );
};
