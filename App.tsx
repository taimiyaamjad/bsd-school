import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import ChatBot from './components/ChatBot';
import { Page } from './types';
import { SCHOOL_NAME, DIGITAL_PORTAL_URL, SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_PHONE } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
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

  if (!isLoaded) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-blue-200 dark:selection:bg-blue-800 transition-colors duration-500">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-grow relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-16 border-t border-slate-800 dark:border-slate-900 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">{SCHOOL_NAME}</h2>
              <p className="max-w-sm text-base leading-relaxed mb-8">
                Nurturing leaders since 2017. Affiliated with CBSE, 
                blending tradition with innovation in Guraini, Jaunpur.
              </p>
              <div className="flex gap-4">
                <a href={DIGITAL_PORTAL_URL} target="_blank" rel="noreferrer" className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">
                  Open Digital Portal
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Quick Access</h3>
              <ul className="space-y-4">
                <li><button onClick={() => setCurrentPage(Page.ABOUT)} className="hover:text-blue-400 transition-colors text-sm">About Our History</button></li>
                <li><button onClick={() => setCurrentPage(Page.ACADEMICS)} className="hover:text-blue-400 transition-colors text-sm">Our Faculty</button></li>
                <li><button onClick={() => setCurrentPage(Page.ADMISSIONS)} className="hover:text-blue-400 transition-colors text-sm">Admission Inquiry</button></li>
                <li><a href={DIGITAL_PORTAL_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors text-sm flex items-center gap-1">Student Portal <ExternalLink size={14}/></a></li>
              </ul>
            </div>
             <div>
              <h3 className="text-white font-bold mb-6 text-lg">Contact Detail</h3>
              <div className="space-y-4 text-sm">
                <p>{SCHOOL_ADDRESS}</p>
                <p className="text-blue-400 font-bold underline">{SCHOOL_EMAIL}</p>
                <p>{SCHOOL_PHONE}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-900 mt-16 pt-8 text-center text-xs text-slate-600 tracking-widest uppercase font-bold">
            &copy; {new Date().getFullYear()} {SCHOOL_NAME}. Empowering Excellence.
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

// Simple ExternalLink icon helper for footer
const ExternalLink = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default App;