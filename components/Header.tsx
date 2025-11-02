import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { AmunetLogo, MenuIcon, XIcon } from './icons';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavLink: React.FC<{
  label: string;
  page: Page;
  activePage: Page;
  setActivePage: (page: Page) => void;
  className?: string;
}> = ({ label, page, activePage, setActivePage, className = '' }) => {
  const isActive = activePage === page;
  return (
    <button
      onClick={() => setActivePage(page)}
      className={`transition-colors duration-300 ${className} ${
        isActive
          ? 'bg-amunet-accent text-white'
          : 'text-amunet-white hover:bg-amunet-secondary'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDashboard = activePage === 'client-dashboard' || activePage === 'admin-dashboard';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  const handleNavClick = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  }

  const navItems = (
    <>
      <NavLink label="How It Works" page="how-it-works" activePage={activePage} setActivePage={() => handleNavClick('how-it-works')} className="px-4 py-2 rounded-md text-sm font-medium" />
      <NavLink label="Playground" page="playground" activePage={activePage} setActivePage={() => handleNavClick('playground')} className="px-4 py-2 rounded-md text-sm font-medium" />
      <NavLink label="Pricing" page="pricing" activePage={activePage} setActivePage={() => handleNavClick('pricing')} className="px-4 py-2 rounded-md text-sm font-medium" />
      <NavLink label="ROI Calculator" page="roi-calculator" activePage={activePage} setActivePage={() => handleNavClick('roi-calculator')} className="px-4 py-2 rounded-md text-sm font-medium" />
      <NavLink label="Admin Dashboard" page="admin-dashboard" activePage={activePage} setActivePage={() => handleNavClick('admin-dashboard')} className="px-4 py-2 rounded-md text-sm font-medium" />
    </>
  );
  
  const authButtons = (
     <div className="flex items-center space-x-2">
      {isDashboard ? (
         <button
          onClick={() => handleNavClick('landing')}
          className="bg-amunet-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors duration-300"
        >
          Logout
        </button>
      ) : (
        <>
          <button
              onClick={() => handleNavClick('login')}
              className="bg-transparent text-amunet-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amunet-secondary transition-colors duration-300"
          >
              Client Login
          </button>
          <button
              onClick={() => handleNavClick('signup')}
              className="bg-amunet-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600 transition-colors duration-300"
          >
              Sign Up
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <header className="bg-amunet-primary/50 backdrop-blur-sm sticky top-0 z-40 border-b border-amunet-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('landing')}>
              <AmunetLogo />
            </div>
            <nav className="hidden md:flex items-center space-x-2">
              {navItems}
            </nav>
            <div className="hidden md:flex">
              {authButtons}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-amunet-light hover:text-white hover:bg-amunet-secondary focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="absolute inset-0 bg-amunet-primary/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className="absolute top-0 right-0 h-full w-full max-w-xs bg-amunet-primary shadow-lg p-4 flex flex-col">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('landing')}>
                  <AmunetLogo />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-amunet-light hover:text-white hover:bg-amunet-secondary focus:outline-none"
              >
                  <span className="sr-only">Close menu</span>
                  <XIcon />
              </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems}
          </nav>
          
          <div className="mt-auto pt-8 border-t border-amunet-secondary">
            {authButtons}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;