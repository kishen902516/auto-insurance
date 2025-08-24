import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const VARIANTS = {
  primary: {
    enabled: 'bg-blue-600 hover:bg-blue-700 text-white',
    disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
  },
  secondary: {
    enabled: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    disabled: 'bg-gray-100 text-gray-400 cursor-not-allowed'
  }
} as const;

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
} as const;

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  isLoading = false,
  disabled,
  className = '',
  children, 
  ...props 
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const variantClasses = isDisabled ? VARIANTS[variant].disabled : VARIANTS[variant].enabled;
  const sizeClasses = SIZES[size];
  
  return (
    <button
      disabled={isDisabled}
      className={`
        font-semibold rounded-lg transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${variantClasses} ${sizeClasses} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}