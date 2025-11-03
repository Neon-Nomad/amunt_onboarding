export type Page = 'landing' | 'playground' | 'roi-calculator' | 'pricing' | 'how-it-works' | 'client-dashboard' | 'admin-dashboard' | 'checkout' | 'signup' | 'login' | 'technical-architecture';

export type PlaygroundTab = 'receptionist' | 'social' | 'newsletter';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

// New types for Client Dashboard
export interface ScheduleItemData {
  type: 'Social Post' | 'Newsletter';
  title: string;
  date: string;
  status: 'Scheduled' | 'Queued' | 'Draft';
}

export interface DashboardStats {
  appointmentsBooked: number;
  socialPostsThisWeek: string;
  nextNewsletterDate: string;
  monthlyROI: number;
}

export interface DashboardData {
  stats: DashboardStats;
  schedule: ScheduleItemData[];
}

// New types for Admin Dashboard
export interface AdminStats {
    activeClients: number;
    platformStatus: string;
    aiInteractionsToday: number;
}