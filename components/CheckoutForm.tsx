
import React, { useState } from 'react';
import { Page } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import Input from './ui/Input';
import { AmunetLogo } from './icons';

interface CheckoutFormProps {
  setActivePage: (page: Page) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ setActivePage }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setActivePage('admin-dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <AmunetLogo className="justify-center mb-4" />
        <h1 className="text-3xl font-bold font-heading">Complete Your Subscription</h1>
        <p className="text-amunet-light mt-2">You're one step away from automating your business.</p>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-amunet-secondary">
          <h2 className="text-lg font-semibold">Amunet Pro Plan</h2>
          <div>
            <span className="text-2xl font-bold text-amunet-accent">$777</span>
            <span className="text-amunet-light">/month</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Card Information</label>
            <div className="bg-amunet-bg border border-amunet-secondary rounded-md p-3">
              {/* This would be the Stripe Card Element */}
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amunet-light"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                <Input type="text" placeholder="Card Number" className="border-none bg-transparent !ring-0 !outline-none" defaultValue="4242 4242 4242 4242" disabled />
                <Input type="text" placeholder="MM / YY" className="w-24 border-none bg-transparent !ring-0 !outline-none" defaultValue="12 / 28" disabled />
                <Input type="text" placeholder="CVC" className="w-16 border-none bg-transparent !ring-0 !outline-none" defaultValue="123" disabled />
              </div>
            </div>
             <p className="text-xs text-amunet-light mt-2">This is a demo. No real card information is required.</p>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full text-lg py-3" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Subscribe & Activate'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutForm;