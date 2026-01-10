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
    // Immediate dark mode sync
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

  // Prevent flash during hydration
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
                Providing a world-class education that inspires creativity, 
                critical thinking, and global citizenship since 1999.
              </p>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition-colors cursor-pointer" />
                 ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Navigation</h3>
              <ul className="space-y-4">
                {['About Us', 'Academics', 'Admissions', 'Contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => setCurrentPage(item.toUpperCase().split(' ')[0] as Page)} 
                      className="hover:text-blue-400 transition-colors text-sm font-medium"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
             <div>
              <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
              <div className="space-y-4 text-sm">
                <p>123 Knowledge Way,<br/>New Delhi, India 110001</p>
                <p className="text-blue-400 font-bold underline">info@bsdpublic.edu</p>
                <p>+91 (011) 2345-6789</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 dark:border-slate-900 mt-16 pt-8 text-center text-xs text-slate-600 tracking-widest uppercase font-bold">
            &copy; {new Date().getFullYear()} BSD Public School. Crafted for Excellence.
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;