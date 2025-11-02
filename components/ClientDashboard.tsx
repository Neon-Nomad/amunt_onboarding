import React, { useState, useEffect } from 'react';
import { Page, DashboardData } from '../types';
import Card from './ui/Card';
import { CalendarIcon, MoneyIcon, NewsletterIcon, SocialIcon } from './icons';
import Button from './ui/Button';
import ToggleSwitch from './ui/ToggleSwitch';
import { generateClientDashboardData } from '../services/apiService';

interface ClientDashboardProps {
  setActivePage: (page: Page) => void;
  impersonatedClient: string | null;
  handleStopImpersonation: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; isLoading?: boolean }> = ({ icon, title, value, isLoading }) => (
    <Card className="flex items-center space-x-4">
        <div className="p-3 bg-amunet-secondary rounded-md text-amunet-accent">
            {icon}
        </div>
        <div>
            <p className="text-amunet-light">{title}</p>
            {isLoading ? (
                <div className="h-8 w-24 bg-amunet-secondary rounded animate-pulse mt-1"></div>
            ) : (
                <p className="text-2xl font-bold font-heading text-amunet-white">{value}</p>
            )}
        </div>
    </Card>
);

const ClientDashboard: React.FC<ClientDashboardProps> = ({ setActivePage, impersonatedClient, handleStopImpersonation }) => {
  const [modules, setModules] = useState({
    receptionist: true,
    social: true,
    newsletter: false,
  });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clientName = impersonatedClient || "Your Business";
  const plan = impersonatedClient ? 'Growth' : 'Growth'; // Mock plan for now

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await generateClientDashboardData(clientName, plan);
            setDashboardData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, [clientName, plan]);


  const handleToggle = (module: keyof typeof modules) => {
    setModules(prev => ({...prev, [module]: !prev[module]}));
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
  }


  return (
    <div className="max-w-6xl mx-auto">
      {impersonatedClient && (
         <Card className="mb-8 bg-amunet-secondary border-amunet-accent border-2">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold font-heading text-amunet-white">Impersonation Mode</h2>
                    <p className="text-amunet-light">You are currently viewing the dashboard as <span className="font-bold text-amunet-accent">{impersonatedClient}</span>.</p>
                </div>
                <Button variant="secondary" onClick={handleStopImpersonation}>Return to Admin</Button>
            </div>
        </Card>
      )}

      <div className="mb-12">
        <h1 className="text-4xl font-bold font-heading">Welcome, {clientName}</h1>
        <p className="text-amunet-light mt-2">Here's a snapshot of your AI-powered operations.</p>
      </div>
      
      {!impersonatedClient && (
        <Card className="mb-8 bg-gradient-to-r from-amunet-accent/30 to-amunet-primary border border-amunet-accent">
          <h2 className="text-2xl font-bold font-heading text-amunet-white mb-2">Subscription Active: Growth Plan</h2>
          <p className="text-amunet-light">Your 7-day free trial is underway. Explore the dashboard to manage your AI assistants. We recommend trying the Playground to see Amunet in action.</p>
          <Button variant="secondary" className="mt-4" onClick={() => setActivePage('playground')}>Go to Playground</Button>
        </Card>
      )}

      {error && (
        <Card className="mb-8 bg-red-900/50 border border-red-500 text-red-300">
            <h3 className="font-bold">Error loading dashboard</h3>
            <p>{error}</p>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard isLoading={isLoading} icon={<CalendarIcon/>} title="Appointments Booked" value={dashboardData?.stats.appointmentsBooked.toString() ?? '...'} />
        <StatCard isLoading={isLoading} icon={<SocialIcon/>} title="Social Posts This Week" value={dashboardData?.stats.socialPostsThisWeek ?? '...'} />
        <StatCard isLoading={isLoading} icon={<NewsletterIcon/>} title="Next Newsletter" value={dashboardData?.stats.nextNewsletterDate ?? '...'} />
        <StatCard isLoading={isLoading} icon={<MoneyIcon/>} title="Est. Monthly ROI" value={dashboardData ? formatCurrency(dashboardData.stats.monthlyROI) : '...'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-heading mb-4">Upcoming Content Schedule</h2>
             {isLoading ? (
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => <ScheduleItemSkeleton key={i} />)}
                </div>
            ) : (
                <div className="space-y-4">
                    {dashboardData?.schedule.map((item, index) => (
                        <ScheduleItem key={index} type={item.type} title={item.title} date={item.date} status={item.status} />
                    ))}
                </div>
            )}
        </Card>
        <Card>
            <h2 className="text-2xl font-bold font-heading mb-4">Module Controls</h2>
            <div className="space-y-6">
                <ToggleSwitch label="AI Receptionist" enabled={modules.receptionist} onChange={() => handleToggle('receptionist')} enabledText="Active" disabledText="Inactive" />
                <ToggleSwitch label="Social Media AI" enabled={modules.social} onChange={() => handleToggle('social')} enabledText="Active" disabledText="Inactive" />
                <ToggleSwitch label="Newsletter AI" enabled={modules.newsletter} onChange={() => handleToggle('newsletter')} enabledText="Active" disabledText="Inactive" />
            </div>
        </Card>
      </div>

    </div>
  );
};

const statusColors: { [key: string]: string } = {
    Scheduled: 'bg-green-800 text-green-200',
    Queued: 'bg-yellow-800 text-yellow-200',
    Draft: 'bg-gray-700 text-gray-200'
}

const ScheduleItem: React.FC<{type: 'Social Post' | 'Newsletter', title: string, date: string, status: 'Scheduled' | 'Queued' | 'Draft'}> = ({ type, title, date, status}) => (
    <div className="flex items-center justify-between p-4 bg-amunet-secondary rounded-md">
        <div>
            <span className="text-xs text-amunet-accent font-bold uppercase">{type}</span>
            <p className="font-semibold text-amunet-white">{title}</p>
            <p className="text-sm text-amunet-light">{date}</p>
        </div>
        <div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[status]}`}>{status}</span>
        </div>
    </div>
);

const ScheduleItemSkeleton: React.FC = () => (
    <div className="flex items-center justify-between p-4 bg-amunet-secondary rounded-md animate-pulse">
        <div>
            <div className="h-4 w-20 bg-amunet-primary rounded mb-2"></div>
            <div className="h-5 w-48 bg-amunet-primary rounded mb-2"></div>
            <div className="h-4 w-32 bg-amunet-primary rounded"></div>
        </div>
        <div>
            <div className="h-6 w-24 bg-amunet-primary rounded-full"></div>
        </div>
    </div>
);


export default ClientDashboard;