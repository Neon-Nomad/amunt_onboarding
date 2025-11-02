

import React, { useState } from 'react';
import { Page } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { AmunetLogo, GoogleIcon, AppleIcon } from './icons';

interface LoginProps {
  setActivePage: (page: Page) => void;
}

const SocialButton: React.FC<{
  provider: 'Google' | 'Apple';
  onClick: () => void;
}> = ({ provider, onClick }) => {
  const isGoogle = provider === 'Google';
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-amunet-secondary rounded-md hover:bg-amunet-secondary transition-colors"
    >
      {isGoogle ? <GoogleIcon /> : <AppleIcon className="w-5 h-5" />}
      <span className="font-semibold">Sign in with {provider}</span>
    </button>
  );
};

const Login: React.FC<LoginProps> = ({ setActivePage }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthAction = () => {
    setIsProcessing(true);
    // Simulate login
    setTimeout(() => {
      setActivePage('client-dashboard');
    }, 1500);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuthAction();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <AmunetLogo className="justify-center mb-4" />
        <h1 className="text-3xl font-bold font-heading">Welcome Back</h1>
        <p className="text-amunet-light mt-2">Sign in to access your dashboard.</p>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SocialButton provider="Google" onClick={handleAuthAction} />
            <SocialButton provider="Apple" onClick={handleAuthAction} />
          </div>

          <div className="flex items-center">
            <div className="flex-grow border-t border-amunet-secondary"></div>
            <span className="flex-shrink mx-4 text-amunet-light">OR</span>
            <div className="flex-grow border-t border-amunet-secondary"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <Input type="email" placeholder="you@company.com" required disabled={isProcessing} defaultValue="client@example.com" />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Password</label>
              <Input type="password" placeholder="••••••••" required disabled={isProcessing} defaultValue="password123" />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full text-lg py-3" disabled={isProcessing}>
                {isProcessing ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
         <p className="text-center text-sm text-amunet-light mt-6">
            Don't have an account?{' '}
            <button onClick={() => setActivePage('signup')} className="font-semibold text-amunet-accent hover:underline">
                Sign Up
            </button>
        </p>
      </Card>
    </div>
  );
};

export default Login;