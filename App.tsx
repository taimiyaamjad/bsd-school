import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import ChatBot from './components/ChatBot';
import { Page } from './types';
import { SCHOOL_NAME } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Determine initial theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={setCurrentPage} isDarkMode={isDarkMode} />;
      case Page.ABOUT:
        return <About />;
      case Page.ACADEMICS:
        return <Academics />;
      case Page.ADMISSIONS:
        return <Admissions />;
      case Page.CONTACT:
        return <Contact />;
      default:
        return <Home onNavigate={setCurrentPage} isDarkMode={isDarkMode} />;
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col transition-colors duration-700">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-grow relative z-10"
      >
        {renderPage()}
      </motion.main>

      <footer className="bg-slate-900 dark:bg-black text-slate-300 py-12 border-t border-slate-800 dark:border-slate-900 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">{SCHOOL_NAME}</h2>
              <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                Nurturing the leaders of tomorrow through excellence in education, 
                character building, and holistic development.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentPage(Page.ABOUT)} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setCurrentPage(Page.ACADEMICS)} className="hover:text-white transition-colors">Academics</button></li>
                <li><button onClick={() => setCurrentPage(Page.ADMISSIONS)} className="hover:text-white transition-colors">Admissions</button></li>
                <li><button onClick={() => setCurrentPage(Page.CONTACT)} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
             <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Facebook</li>
                <li className="hover:text-white cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-white cursor-pointer transition-colors">LinkedIn</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-900 mt-12 pt-8 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;