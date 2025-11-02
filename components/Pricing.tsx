
import React from 'react';
import { Page } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { CheckIcon } from './icons';

interface PricingProps {
  setActivePage: (page: Page) => void;
}

const coreFeatures = [
  "AI Receptionist (Calls & SMS)",
  "Booking & Calendar Sync",
  "Social AI (5 posts/week)",
  "1 Newsletter/month"
];

const growthFeatures = [
  "Everything in Core, plus:",
  "Expanded Social AI (2 posts/day)",
  "4 Newsletters/month",
  "Multi-Location Support",
  "Priority Support"
];

const Pricing: React.FC<PricingProps> = ({ setActivePage }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">Simple, Powerful Pricing</h1>
        <p className="text-amunet-light mt-2 max-w-2xl mx-auto">Choose the plan that fits your business needs. No hidden fees, no surprises. 7-day free trial on all plans.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <PricingCard
          planName="Core"
          price="777"
          description="Perfect for solo entrepreneurs and small businesses."
          features={coreFeatures}
          setActivePage={setActivePage}
        />
        <PricingCard
          planName="Growth"
          price="997"
          description="Ideal for growing businesses and multiple locations."
          features={growthFeatures}
          setActivePage={setActivePage}
          isFeatured={true}
        />
      </div>

      <Card className="mt-12 text-center">
        <h3 className="text-2xl font-bold font-heading">Enterprise Solutions</h3>
        <p className="text-amunet-light mt-2">Need a custom solution for your large-scale business or agency? We offer white-labeling, custom integrations, and dedicated support. Contact our sales team to learn more.</p>
        <a href="mailto:sales@amunet.ai" className="mt-4 inline-block rounded-md font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amunet-bg px-6 py-2 bg-amunet-secondary text-amunet-white hover:bg-amunet-light/20 focus:ring-amunet-light">
          Talk to Sales
        </a>
      </Card>
    </div>
  );
};

interface PricingCardProps {
    planName: string;
    price: string;
    description: string;
    features: string[];
    setActivePage: (page: Page) => void;
    isFeatured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ planName, price, description, features, setActivePage, isFeatured = false }) => (
     <Card className={`w-full ${isFeatured ? 'bg-gradient-to-br from-amunet-accent/30 to-amunet-primary border-2 border-amunet-accent shadow-2xl relative' : ''}`}>
        {isFeatured && (
            <div className="absolute top-0 right-0 -mt-4 mr-4 bg-amunet-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                Most Popular
            </div>
        )}
        <h2 className="text-2xl font-bold font-heading text-center text-amunet-white mb-2">{planName}</h2>
        <p className="text-center text-amunet-light mb-4 h-10">{description}</p>
        <div className="text-center mb-6">
            <span className={`text-6xl font-extrabold font-heading ${isFeatured ? 'text-amunet-accent' : 'text-amunet-white'}`}>${price}</span>
            <span className="text-lg text-amunet-light">/month</span>
        </div>
        
        <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-amunet-accent flex-shrink-0" />
                    <span className="text-amunet-white">{feature}</span>
                </li>
            ))}
        </ul>

        <Button variant={isFeatured ? 'primary' : 'secondary'} className="w-full text-lg py-3" onClick={() => setActivePage('signup')}>
            Get Started Now
        </Button>
    </Card>
);


export default Pricing;