
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full bg-amunet-bg border border-amunet-secondary rounded-md px-4 py-2 text-amunet-white placeholder-amunet-light focus:outline-none focus:ring-2 focus:ring-amunet-accent ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
