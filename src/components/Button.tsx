// Reusable button component with multiple variants and sizes
import React from 'react';
import { Video as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'font-semibold transition-all duration-300 flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-black border-2 border-neutral-200 hover:bg-neutral-50 shadow-md',
    outline: 'border-2 border-white text-white hover:bg-white/10'
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm rounded-lg',
    md: 'px-8 py-3.5 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};
