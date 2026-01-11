import React from 'react';
import KnowledgeBackground from '../components/KnowledgeBackground';
import { SCHOOL_STATS } from '../constants';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';
import { Page } from '../types';
import { motion } from 'framer-motion';

interface HomeProps {
  onNavigate: (page: Page) => void;
  isDarkMode?: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, isDarkMode }) => {
  return (
    <div className="relative min-h-screen">
      {/* Background Component */}
      <KnowledgeBackground isDarkMode={!!isDarkMode} />
      
      <div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] border border-white/50 dark:border-slate-800/50 shadow-2xl">
            <motion.span 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-bold mb-6"
            >
              Est. 2017 • Excellence in Education
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight leading-tight">
              Empowering Minds,<br/><span className="text-blue-600 dark:text-cyan-400">Shaping Futures</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Welcome to BSD Public School, where we blend tradition with modern innovation to nurture the leaders of tomorrow.
            </p>
            <div className="flex justify-center gap-5 flex-wrap">
              <button 
                  onClick={() => onNavigate(Page.ABOUT)}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95"
              >
                Discover Our Story
              </button>
              <button 
                  onClick={() => onNavigate(Page.ADMISSIONS)}
                  className="px-10 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-lg hover:scale-105 active:scale-95"
              >
                Admissions Open
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {SCHOOL_STATS.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white dark:border-slate-800 text-center"
                >
                    <div className="text-blue-600 dark:text-cyan-400 font-bold text-4xl mb-2">{stat.value}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-[0.2em] font-black">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: <BookOpen />, 
                title: "Academic Excellence", 
                desc: "A rigorous K-12 curriculum designed for global success.", 
                color: "blue",
                page: Page.ACADEMICS 
              },
              { 
                icon: <Users />, 
                title: "Holistic Growth", 
                desc: "Focusing on character, empathy, and leadership skills.", 
                color: "green",
                page: Page.ABOUT 
              },
              { 
                icon: <Trophy />, 
                title: "Beyond Classroom", 
                desc: "State-of-the-art sports and extracurricular programs.", 
                color: "orange",
                page: Page.ACADEMICS 
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 group"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 text-${feature.color}-600 dark:text-${feature.color}-400 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform`}>
                    {React.cloneElement(feature.icon as React.ReactElement, { size: 28 })}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                    {feature.desc}
                </p>
                <button 
                  onClick={() => onNavigate(feature.page)}
                  className="font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-blue-600 dark:text-cyan-400"
                >
                    Learn more <ArrowRight size={20} />
                </button>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;