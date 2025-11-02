import React, { useEffect, useState } from 'react';
import { Page, AdminStats } from '../types';
import Card from './ui/Card';
import { BriefcaseIcon, CheckIcon, ServerIcon, ZapIcon } from './icons';
import Button from './ui/Button';
import { generateAdminDashboardStats } from '../services/apiService';

interface AdminDashboardProps {
  setActivePage: (page: Page) => void;
  handleImpersonate: (clientName: string) => void;
}

const mockClients = [
    { name: 'Quantum Legal Group', plan: 'Growth', status: 'Active', integrations: { twilio: true, stripe: true, calendar: true } },
    { name: 'Glow MedSpa', plan: 'Growth', status: 'Active', integrations: { twilio: true, stripe: true, calendar: true } },
    { name: 'Apex Realty', plan: 'Core', status: 'Active', integrations: { twilio: true, stripe: true, calendar: false } },
    { name: 'FixIt Services', plan: 'Core', status: 'Trial', integrations: { twilio: true, stripe: false, calendar: true } },
    { name: 'Innovate Law', plan: 'Enterprise', status: 'Active', integrations: { twilio: true, stripe: true, calendar: true } },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActivePage, handleImpersonate }) => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            setIsLoading(true);
            setError('');
            try {
                const data = await generateAdminDashboardStats();
                setStats(data);
            } catch (err) {
                 const errorMessage = err instanceof Error ? err.message : "Failed to fetch admin stats.";
                setError(errorMessage);
                // Fallback to mock data on error
                setStats({
                    activeClients: 1248,
                    platformStatus: "Error",
                    aiInteractionsToday: 34912,
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-heading">Admin Dashboard</h1>
        <p className="text-amunet-light mt-2">Oversee and manage all Amunet AI operations.</p>
      </div>

       {error && (
            <Card className="mb-8 bg-red-900/50 border border-red-500 text-red-300">
                <h3 className="font-bold">Could not load live stats</h3>
                <p>{error}</p>
            </Card>
        )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<BriefcaseIcon />} title="Active Clients" value={stats ? formatNumber(stats.activeClients) : '...'} isLoading={isLoading} />
        <StatCard icon={<ServerIcon />} title="Platform Status" value={stats?.platformStatus ?? '...'} valueColor={stats?.platformStatus === 'All Systems Online' ? 'text-green-400' : 'text-yellow-400'} isLoading={isLoading}/>
        <StatCard icon={<ZapIcon />} title="AI Interactions Today" value={stats ? formatNumber(stats.aiInteractionsToday) : '...'} isLoading={isLoading} />
      </div>

      <Card>
        <h2 className="text-2xl font-bold font-heading mb-4">Client Management</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-amunet-secondary">
                    <tr>
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Plan</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Integrations</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockClients.map(client => (
                        <tr key={client.name} className="border-b border-amunet-secondary hover:bg-amunet-secondary/50">
                            <td className="p-4 font-semibold">{client.name}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${client.plan === 'Growth' ? 'bg-purple-800 text-purple-200' : client.plan === 'Enterprise' ? 'bg-yellow-800 text-yellow-200' : 'bg-gray-700 text-gray-200'}`}>
                                    {client.plan}
                                </span>
                            </td>
                            <td className="p-4">
                                <span className={`font-semibold ${client.status === 'Active' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {client.status}
                                </span>
                            </td>
                            <td className="p-4 flex items-center space-x-2">
                                <span title="Twilio OK" className={client.integrations.twilio ? 'text-green-400' : 'text-red-500'}>📞</span>
                                <span title="Stripe OK" className={client.integrations.stripe ? 'text-green-400' : 'text-red-500'}>💳</span>
                                <span title="Calendar OK" className={client.integrations.calendar ? 'text-green-400' : 'text-red-500'}>🗓️</span>
                            </td>
                            <td className="p-4">
                                <Button variant="ghost" size="sm" onClick={() => handleImpersonate(client.name)}>Impersonate</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>

    </div>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, title: string, value: string, valueColor?: string, isLoading?: boolean}> = ({ icon, title, value, valueColor = 'text-amunet-white', isLoading }) => (
    <Card className="flex items-center space-x-4">
        <div className="p-3 bg-amunet-secondary rounded-md text-amunet-accent">
            {icon}
        </div>
        <div>
            <p className="text-amunet-light">{title}</p>
            {isLoading ? (
                <div className="h-8 w-40 bg-amunet-secondary rounded animate-pulse mt-1"></div>
            ) : (
                <p className={`text-2xl font-bold font-heading ${valueColor}`}>{value}</p>
            )}
        </div>
    </Card>
)

export default AdminDashboard;