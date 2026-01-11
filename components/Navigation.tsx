import React, { useState } from 'react';
import { Menu, X, Sun, Moon, ExternalLink } from 'lucide-react';
import { NAV_ITEMS, SCHOOL_NAME, SCHOOL_LOGO_URL, DIGITAL_PORTAL_URL } from '../constants';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, isDarkMode, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: Page | 'PORTAL') => {
    if (page === 'PORTAL') {
      window.open(DIGITAL_PORTAL_URL, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavClick(Page.HOME)}
          >
            <div className="flex items-center justify-center transition-transform hover:scale-105">
              <img 
                src={SCHOOL_LOGO_URL} 
                alt={`${SCHOOL_NAME} Logo`} 
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <span className="font-bold text-xl text-blue-900 dark:text-white tracking-tight transition-colors">{SCHOOL_NAME}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page as any)}
                className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                  currentPage === item.page
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-white'
                } ${item.label === 'Digital Portal' ? 'text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full' : ''}`}
              >
                {item.label}
                {item.label === 'Digital Portal' && <ExternalLink size={14} />}
              </button>
            ))}
            
            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-1" />

            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
                onClick={() => handleNavClick(Page.ADMISSIONS)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
            >
                Apply Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white p-1"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 absolute w-full shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page as any)}
                className={`flex w-full items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  currentPage === item.page
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                } ${item.label === 'Digital Portal' ? 'border-2 border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400' : ''}`}
              >
                {item.label}
                {item.label === 'Digital Portal' && <ExternalLink size={18} />}
              </button>
            ))}
             <button 
                onClick={() => handleNavClick(Page.ADMISSIONS)}
                className="w-full mt-4 px-4 py-4 text-center text-base font-bold text-white bg-orange-500 rounded-xl shadow-lg active:scale-95"
            >
                Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;