import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Playground from './components/Playground';
import ROICalculator from './components/ROICalculator';
import Pricing from './components/Pricing';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';
import Chatbot from './components/Chatbot';
import { Page } from './types';
import CheckoutForm from './components/CheckoutForm';
import SignUp from './components/SignUp';
import Login from './components/Login';
import HowItWorks from './components/HowItWorks';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('landing');
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleImpersonate = (clientName: string) => {
    setImpersonatedClient(clientName);
    setActivePage('client-dashboard');
  };

  const handleStopImpersonation = () => {
    setImpersonatedClient(null);
    setActivePage('admin-dashboard');
  };

  useEffect(() => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const handleScroll = () => {
        if (parallaxContainer) {
            setScrollTop(parallaxContainer.scrollTop);
        }
    };

    if (parallaxContainer) {
      parallaxContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (parallaxContainer) {
        parallaxContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activePage]);


  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage setActivePage={setActivePage} />;
      case 'playground':
        return <Playground setActivePage={setActivePage} />;
      case 'roi-calculator':
        return <ROICalculator setActivePage={setActivePage} />;
      case 'pricing':
        return <Pricing setActivePage={setActivePage} />;
      case 'how-it-works':
        return <HowItWorks setActivePage={setActivePage} />;
      case 'signup':
        return <SignUp setActivePage={setActivePage} />;
      case 'login':
        return <Login setActivePage={setActivePage} />;
      case 'client-dashboard':
        return <ClientDashboard setActivePage={setActivePage} impersonatedClient={impersonatedClient} handleStopImpersonation={handleStopImpersonation} />;
       case 'admin-dashboard':
        return <AdminDashboard setActivePage={setActivePage} handleImpersonate={handleImpersonate} />;
      case 'checkout':
        return <CheckoutForm setActivePage={setActivePage} />;
      default:
        return <LandingPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-amunet-bg font-sans text-amunet-white parallax-container">
        <div 
            className="parallax-layer parallax-bg" 
            style={{ 
                transform: `translate3d(0, ${scrollTop * 0.5}px, -1px) scale(2)`,
                backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(157, 0, 255, 0.1), transparent 30%), radial-gradient(circle at 80% 70%, rgba(157, 0, 255, 0.1), transparent 30%)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
            }}
        ></div>
        <div className="main-content">
            <Header activePage={activePage} setActivePage={setActivePage} />
            <main className="container mx-auto px-4 py-8">
                {renderPage()}
            </main>
            <footer className="text-center py-6 text-amunet-light border-t border-amunet-secondary mt-12">
                <p>&copy; 2024 Amunet AI. All rights reserved.</p>
            </footer>
            <Chatbot activePage={activePage} />
        </div>
    </div>
  );
};

export default App;