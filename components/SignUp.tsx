
import React, { useState } from 'react';
import { Page } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { AmunetLogo, GoogleIcon, AppleIcon } from './icons';

interface SignUpProps {
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
      <span className="font-semibold">Sign up with {provider}</span>
    </button>
  );
};

const SignUp: React.FC<SignUpProps> = ({ setActivePage }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthAction = () => {
    setIsProcessing(true);
    // Simulate account creation/login
    setTimeout(() => {
      // On success, redirect to the client dashboard to start the trial
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
        <h1 className="text-3xl font-bold font-heading">Create Your Account</h1>
        <p className="text-amunet-light mt-2">Start your 7-day free trial. No credit card required.</p>
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
              <label className="block mb-2 font-semibold">Full Name</label>
              <Input type="text" placeholder="e.g., Jane Doe" required disabled={isProcessing} />
            </div>
             <div>
              <label className="block mb-2 font-semibold">Company Name</label>
              <Input type="text" placeholder="e.g., Glow MedSpa" required disabled={isProcessing} />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email Address</label>
              <Input type="email" placeholder="you@company.com" required disabled={isProcessing} />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Password</label>
              <Input type="password" placeholder="••••••••" required disabled={isProcessing} />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full text-lg py-3" disabled={isProcessing}>
                {isProcessing ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </div>
         <p className="text-center text-sm text-amunet-light mt-6">
            Already have an account?{' '}
            <button onClick={() => setActivePage('login')} className="font-semibold text-amunet-accent hover:underline">
                Log In
            </button>
        </p>
      </Card>
    </div>
  );
};

export default SignUp;