import React from 'react';
import { Sun, Moon, ExternalLink } from 'lucide-react';
import { NAV_ITEMS, SCHOOL_NAME, SCHOOL_LOGO_URL, DIGITAL_PORTAL_URL } from '../constants';
import { Page } from '../types';
import { NavBar, NavItem as TubelightNavItem } from './ui/tubelight-navbar';
import { 
  Home, 
  Info, 
  GraduationCap, 
  UserPlus, 
  Images, 
  PhoneCall, 
  Lock 
} from 'lucide-react';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, isDarkMode, toggleTheme }) => {
  const tubelightNavItems: TubelightNavItem[] = [
    {
      name: 'Home',
      icon: Home,
      onClick: () => onNavigate(Page.HOME),
      active: currentPage === Page.HOME
    },
    {
      name: 'About Us',
      icon: Info,
      onClick: () => onNavigate(Page.ABOUT),
      active: currentPage === Page.ABOUT
    },
    {
      name: 'Academics',
      icon: GraduationCap,
      onClick: () => onNavigate(Page.ACADEMICS),
      active: currentPage === Page.ACADEMICS
    },
    {
      name: 'Admissions',
      icon: UserPlus,
      onClick: () => onNavigate(Page.ADMISSIONS),
      active: currentPage === Page.ADMISSIONS
    },
    {
      name: 'Gallery',
      icon: Images,
      onClick: () => onNavigate(Page.GALLERY),
      active: currentPage === Page.GALLERY
    },
    {
      name: 'Contact',
      icon: PhoneCall,
      onClick: () => onNavigate(Page.CONTACT),
      active: currentPage === Page.CONTACT
    },
    {
      name: 'Staff Login',
      icon: Lock,
      onClick: () => onNavigate(Page.STAFF_LOGIN),
      active: currentPage === Page.STAFF_LOGIN
    }
  ];

  const handleNavClick = (page: Page | 'PORTAL') => {
    if (page === 'PORTAL') {
      window.open(DIGITAL_PORTAL_URL, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate(page);
    }
  };

  const getActiveTabName = () => {
    switch (currentPage) {
      case Page.HOME: return 'Home';
      case Page.ABOUT: return 'About Us';
      case Page.ACADEMICS: return 'Academics';
      case Page.ADMISSIONS: return 'Admissions';
      case Page.GALLERY: return 'Gallery';
      case Page.CONTACT: return 'Contact';
      case Page.STAFF_LOGIN: return 'Staff Login';
      default: return 'Home';
    }
  };

  return (
    <>
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

            {/* Desktop Navigation Links */}
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

            {/* Mobile Controls (No three lines / hamburger menu button) */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => handleNavClick(Page.ADMISSIONS)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-md active:scale-95"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Tubelight Navigation Bar anchored at the bottom */}
      <NavBar 
        items={tubelightNavItems} 
        variant="floating"
        activeTab={getActiveTabName()}
      />
    </>
  );
};

export default Navigation;
