import React from 'react';
import { Page } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { 
    BrainIcon, 
    MessageSquareIcon, 
    MoneyIcon, 
    CalendarIcon, 
    SocialIcon, 
    NewsletterIcon, 
    BarChartIcon,
    ServerIcon
} from './icons';

interface TechnicalArchitectureProps {
  setActivePage: (page: Page) => void;
}

const architectureData = [
  {
    category: 'AI & Content Generation',
    icon: <BrainIcon className="w-8 h-8" />,
    services: [
      { api: 'Gemini 2.5 Pro', role: 'Core brain for receptionist, post, and newsletter generation.' },
      { api: 'Stability.ai or OpenAI Images', role: 'AI image creation for social content.' },
      { api: 'n8n Webhook Node', role: 'Receives AI outputs and triggers workflows (e.g., post to socials, send newsletter).' },
    ]
  },
  {
    category: 'Communication',
    icon: <MessageSquareIcon className="w-8 h-8" />,
    services: [
      { api: 'Twilio (via n8n node)', role: 'Handles calls, SMS, and voicemail forwarding.' },
      { api: 'SendGrid (via n8n node)', role: 'Newsletter delivery and client notifications.' },
      { api: 'WhatsApp Business (Twilio)', role: 'Optional for booking confirmations.' },
    ]
  },
  {
    category: 'Billing',
    icon: <MoneyIcon className="w-8 h-8" />,
    services: [
      { api: 'Stripe (via n8n node)', role: 'Subscription creation, webhooks, failed payment alerts.' },
      { api: 'Stripe Portal', role: 'Client self-service billing.' },
    ]
  },
  {
    category: 'Scheduling & CRM',
    icon: <CalendarIcon className="w-8 h-8" />,
    services: [
      { api: 'Google Calendar / Outlook / Calendly (native)', role: 'Appointment syncing and availability lookup.' },
      { api: 'HubSpot / Pipedrive (optional)', role: 'If you want CRM-style lead tracking inside n8n.' },
    ]
  },
  {
    category: 'Social Media',
    icon: <SocialIcon className="w-8 h-8" />,
    services: [
      { api: 'Meta Graph API', role: 'Post to Instagram and Facebook Pages.' },
      { api: 'LinkedIn Marketing API', role: 'Professional post scheduling.' },
      { api: 'Google Business Profile API', role: 'Post updates and reply to reviews.' },
      { api: 'n8n Scheduler + Webhook', role: 'Queues and automates posting based on AI output.' },
    ]
  },
  {
    category: 'Email & Newsletter',
    icon: <NewsletterIcon className="w-8 h-8" />,
    services: [
      { api: 'SendGrid', role: 'Transactional + campaign emails.' },
      { api: 'Mailchimp / ConvertKit (optional)', role: 'Client-provided lists.' },
      { api: 'n8n Trigger', role: 'Automates newsletter send based on AI draft approval.' },
    ]
  },
  {
    category: 'Analytics & Monitoring',
    icon: <BarChartIcon className="w-8 h-8" />,
    services: [
      { api: 'Google Analytics 4', role: 'Web and campaign tracking.' },
      { api: 'n8n HTTP Request Node', role: 'Sends usage metrics to your database.' },
      { api: 'UptimeRobot API', role: 'System status reporting for admin dashboard.' },
    ]
  },
  {
    category: 'Security & Auth',
    icon: <ServerIcon className="w-8 h-8" />,
    services: [
      { api: 'Google Identity (native)', role: 'Auth + OAuth tokens.' },
      { api: 'Twilio Verify', role: 'SMS-based two-factor.' },
      { api: 'n8n Encryption / Vault', role: 'Store API keys safely and inject into flows.' },
    ]
  },
];

const automationFlowSteps = [
    { title: 'Trigger', description: 'Incoming Twilio call → webhook to n8n.' },
    { title: 'Node 1: AI Processing', description: 'Gemini → summarize call + extract booking intent.' },
    { title: 'Node 2: Scheduling', description: 'Google Calendar → create event.' },
    { title: 'Node 3: Confirmation', description: 'SendGrid → email + SMS confirmation.' },
    { title: 'Node 4: Logging', description: 'Database → log appointment + ROI data.' },
];

const TechnicalArchitecture: React.FC<TechnicalArchitectureProps> = ({ setActivePage }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">Technical Architecture</h1>
        <p className="text-amunet-light mt-2 max-w-3xl mx-auto">
          Amunet AI is built on a modern, scalable, and secure stack, leveraging best-in-class APIs and services to deliver a seamless automation experience.
        </p>
      </div>
      
      <h2 className="text-3xl font-bold font-heading text-center mb-10 text-amunet-accent">Core Services & APIs</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {architectureData.map((category) => (
          <Card key={category.category} className="h-full flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-14 h-14 bg-amunet-secondary rounded-lg flex items-center justify-center text-amunet-accent">
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-amunet-white">{category.category}</h3>
            </div>
            <ul className="space-y-3 flex-grow">
              {category.services.map((service) => (
                <li key={service.api} className="border-t border-amunet-secondary pt-3">
                  <p className="font-semibold text-amunet-white">{service.api}</p>
                  <p className="text-sm text-amunet-light">{service.role}</p>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

       <div className="mt-20">
            <h2 className="text-3xl font-bold font-heading text-center mb-10 text-amunet-accent">Example Automation Flow (n8n)</h2>
            <Card className="bg-amunet-primary/50 py-10">
                <div className="relative">
                    <div className="absolute top-6 left-0 w-full h-0.5 bg-amunet-secondary hidden sm:block"></div>
                    <div className="relative grid grid-cols-1 sm:grid-cols-5 gap-8 text-center">
                        {automationFlowSteps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-amunet-accent flex items-center justify-center font-bold text-white border-4 border-amunet-primary z-10">{index + 1}</div>
                                <h4 className="font-bold text-amunet-white mt-2">{step.title}</h4>
                                <p className="text-sm text-amunet-light">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>

      <Card className="mt-24 text-center bg-gradient-to-r from-amunet-accent/30 to-amunet-primary">
        <h2 className="text-3xl font-bold font-heading mb-2">Built for Performance & Reliability</h2>
        <p className="text-amunet-light mb-6 max-w-2xl mx-auto">
          Our architecture ensures your AI assistants are always online, responsive, and secure. Ready to see it in action?
        </p>
        <Button variant="primary" size="md" onClick={() => setActivePage('playground')}>
          Try the Playground
        </Button>
      </Card>
    </div>
  );
};

export default TechnicalArchitecture;
