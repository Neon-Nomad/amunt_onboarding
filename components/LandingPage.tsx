import React from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { Page } from '../types';
import { CalendarIcon, SocialIcon, NewsletterIcon, MoneyIcon, TimeIcon } from './icons';
import TestimonialCarousel from './ui/TestimonialCarousel';

interface LandingPageProps {
  setActivePage: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <Card className="text-center flex flex-col items-center">
    <div className="p-3 bg-amunet-secondary rounded-full mb-4 text-amunet-accent">{icon}</div>
    <h3 className="text-xl font-bold font-heading mb-2 text-amunet-white">{title}</h3>
    <p className="text-amunet-light">{description}</p>
  </Card>
);

const testimonials = [
    {
        quote: "Amunet AI has been a game-changer. We're capturing leads we used to miss after hours, and our social media has never been more consistent. It paid for itself in the first month.",
        name: "Sarah Johnson",
        company: "Glow MedSpa",
        avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
        quote: "As a small law firm, every call matters. Amunet ensures we never miss a potential client. The AI receptionist is professional, efficient, and frees up my team to focus on billable work.",
        name: "Mark Dillon",
        company: "Dillon & Associates Law",
        avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
        quote: "I was skeptical about an AI managing our social media, but the content is spot-on for our brand. It's saved me at least 10 hours a week. Highly recommended for any service business.",
        name: "Jessica Chen",
        company: "Apex Realty",
        avatar: "https://i.pravatar.cc/150?img=3"
    }
];

const LandingPage: React.FC<LandingPageProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-extrabold font-heading mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amunet-white to-amunet-accent">
          Your AI-Powered Business Assistant
        </h1>
        <p className="text-2xl font-semibold text-amunet-light max-w-3xl mx-auto mb-4">
          We Don’t Just Make You Money. We Save You Time.
        </p>
        <p className="text-lg text-amunet-light max-w-3xl mx-auto mb-8">
            Amunet AI answers your calls, books appointments, manages your social media, and keeps your clients engaged—all automatically. It’s like having a full-time receptionist, marketer, and content creator in one smart system that never sleeps. Grow your business without adding more hours to your day.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="primary" onClick={() => setActivePage('signup')}>
            Start My Free Demo
          </Button>
          <Button variant="secondary" onClick={() => setActivePage('pricing')}>
            View Pricing
          </Button>
        </div>
      </section>

      {/* Trust Badges */}
       <section className="text-center">
            <h3 className="text-lg font-semibold text-amunet-light mb-6">TRUSTED BY LEADING LOCAL BUSINESSES</h3>
            <div className="flex justify-center items-center space-x-12 opacity-50 grayscale">
                <p className="font-heading text-2xl">Innovate Law</p>
                <p className="font-heading text-2xl">Apex Realty</p>
                <p className="font-heading text-2xl">Glow MedSpa</p>
                <p className="font-heading text-2xl">FixIt Services</p>
            </div>
        </section>

      {/* Features Section */}
      <section>
        <h2 className="text-4xl font-bold font-heading text-center mb-12">Automate Your Operations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<CalendarIcon className="w-8 h-8" />}
            title="AI Receptionist"
            description="Never miss a booking. Amunet handles appointments, answers queries, and manages your calendar 24/7."
          />
          <FeatureCard
            icon={<SocialIcon className="w-8 h-8" />}
            title="Social Media Manager"
            description="Engage your audience consistently. Our AI drafts and schedules compelling posts for all your platforms."
          />
          <FeatureCard
            icon={<NewsletterIcon className="w-8 h-8" />}
            title="Newsletter Assistant"
            description="Nurture your client relationships with professionally drafted monthly newsletters that drive retention."
          />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section>
          <h2 className="text-4xl font-bold font-heading text-center mb-12">Don't Just Take Our Word For It</h2>
          <TestimonialCarousel testimonials={testimonials} />
      </section>


      {/* Value Prop Section */}
      <section className="bg-amunet-primary rounded-lg p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-4xl font-bold font-heading mb-4 text-amunet-accent">Focus On What You Do Best</h2>
                <p className="text-amunet-light text-lg mb-6">Stop wasting hours on repetitive administrative tasks. Amunet AI frees up your schedule so you can focus on growing your business and serving your clients.</p>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <TimeIcon className="w-6 h-6 mr-3 text-amunet-accent" />
                        <span>Reclaim up to 15 hours per week.</span>
                    </div>
                    <div className="flex items-center">
                        <MoneyIcon className="w-6 h-6 mr-3 text-amunet-accent" />
                        <span>Reduce overhead costs from manual admin work.</span>
                    </div>
                </div>
                 <Button variant="primary" className="mt-8" onClick={() => setActivePage('roi-calculator')}>
                    Calculate Your ROI
                </Button>
            </div>
            <div className="flex justify-center">
               <img src="https://picsum.photos/seed/holographicpyramid/500/500" alt="Abstract AI technology visualization" className="rounded-lg shadow-2xl" />
            </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;