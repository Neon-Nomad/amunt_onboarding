
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  // Fix: Add a `size` prop to allow for different button sizes.
  size?: 'sm' | 'md';
  className?: string;
}

// Fix: Implement the `size` prop logic to apply different padding and text size classes.
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amunet-bg';
  
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-2',
  };
  
  const variantStyles = {
    primary: 'bg-amunet-accent text-white hover:bg-purple-600 focus:ring-amunet-accent',
    secondary: 'bg-amunet-secondary text-amunet-white hover:bg-amunet-light/20 focus:ring-amunet-light',
    ghost: 'bg-transparent text-amunet-white hover:bg-amunet-accent/20 focus:ring-amunet-light',
  };

  return (
    <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
