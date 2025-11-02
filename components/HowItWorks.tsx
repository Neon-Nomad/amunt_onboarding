import React from 'react';
import { Page } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { LinkIcon, BrainIcon, CalendarIcon, BarChartIcon } from './icons';

interface HowItWorksProps {
  setActivePage: (page: Page) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ setActivePage }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">From Onboarding to Automation</h1>
        <p className="text-amunet-light mt-2 max-w-2xl mx-auto">
          See exactly how Amunet AI integrates with your business to save you time and capture more revenue.
        </p>
      </div>

      <div className="relative space-y-12">
        {/* Dashed line connector */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px border-l-2 border-dashed border-amunet-secondary top-8 hidden md:block" aria-hidden="true"></div>

        <Step
          number="01"
          icon={<LinkIcon className="w-8 h-8" />}
          title="Simple Onboarding: Connect Your Tools"
          description="Getting started takes less than 10 minutes. Simply sign up, connect your Google or Outlook calendar, and link your business's social media accounts (like Facebook, Instagram, and LinkedIn). This one-time setup is all it takes to give Amunet access to your schedule and platforms."
          image="https://picsum.photos/seed/onboarding/600/400"
          alignment="left"
        />

        <Step
          number="02"
          icon={<BrainIcon className="w-8 h-8" />}
          title="The AI Learns Your Business: Brand Voice & Goals"
          description="You're in control. Provide Amunet with key details: your business hours, frequently asked questions, the tone you prefer for social media, and your primary services. Our AI uses this information to build a unique 'Brand Profile,' ensuring every interaction—from a phone call to a social post—is perfectly on-brand and accurate."
          image="https://picsum.photos/seed/braintuning/600/400"
          alignment="right"
        />
        
        <Step
          number="03"
          icon={<CalendarIcon className="w-8 h-8" />}
          title="24/7 Automation in Action: The Three Modules"
          description="Once set up, Amunet works for you around the clock. The AI Receptionist books appointments directly into your synced calendar. The Social Media Manager drafts and queues posts based on your Brand Profile. The Newsletter Assistant compiles relevant updates into a monthly draft, all without you lifting a finger."
          image="https://picsum.photos/seed/automation/600/400"
          alignment="left"
        />

        <Step
          number="04"
          icon={<BarChartIcon className="w-8 h-8" />}
          title="Track Your Growth: The Analytics Dashboard"
          description="Automation is only powerful if you can see the results. Your dashboard provides a clear, real-time view of key metrics. Track appointments booked, see your most engaging social posts, and calculate your ROI instantly. Amunet doesn't just work—it proves its value every single day."
          image="https://picsum.photos/seed/dashboard/600/400"
          alignment="right"
        />
      </div>
      
       <Card className="mt-24 text-center bg-gradient-to-r from-amunet-accent/30 to-amunet-primary">
            <h2 className="text-3xl font-bold font-heading mb-2">Ready to See It in Action?</h2>
            <p className="text-amunet-light mb-6 max-w-2xl mx-auto">The best way to understand the power of Amunet is to experience it firsthand. Try our interactive Playground demo—no signup required.</p>
            <Button variant="primary" size="md" onClick={() => setActivePage('playground')}>
                Try the Playground
            </Button>
        </Card>
    </div>
  );
};

interface StepProps {
    number: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
    alignment: 'left' | 'right';
}

const Step: React.FC<StepProps> = ({ number, icon, title, description, image, alignment }) => {
    const isLeft = alignment === 'left';
    return (
        <div className={`relative md:grid md:grid-cols-2 md:gap-12 items-center`}>
            <div className={`mb-8 md:mb-0 ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
                <Card className="relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-amunet-secondary rounded-full flex items-center justify-center text-amunet-accent border-2 border-amunet-accent/50">
                            {icon}
                        </div>
                        <div>
                            <span className="text-sm font-bold text-amunet-accent">STEP {number}</span>
                            <h3 className="text-2xl font-bold font-heading text-amunet-white">{title}</h3>
                        </div>
                    </div>
                    <p className="text-amunet-light">{description}</p>
                </Card>
            </div>
            <div className={`flex justify-center items-center ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
                 <img src={image} alt={title} className="rounded-lg shadow-2xl w-full" />
            </div>
        </div>
    );
};

export default HowItWorks;
