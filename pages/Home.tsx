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
      {/* Dynamic Background */}
      <KnowledgeBackground isDarkMode={!!isDarkMode} />
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-white dark:border-slate-800 shadow-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest mb-6"
            >
              Established 2017
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
              Knowledge is<br/><span className="text-blue-600 dark:text-blue-400">Power & Progress</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Welcome to BSD Public School. We provide a world-class education rooted in values and powered by modern innovation.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button 
                  onClick={() => onNavigate(Page.ABOUT)}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                Learn More
              </button>
              <button 
                  onClick={() => onNavigate(Page.ADMISSIONS)}
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95"
              >
                Apply Now
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {SCHOOL_STATS.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center"
                >
                    <div className="text-blue-600 dark:text-blue-400 font-bold text-3xl mb-1">{stat.value}</div>
                    <div className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-widest font-bold">{stat.label}</div>
                </motion.div>
            ))}
        </div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                icon: <BookOpen size={24}/>, 
                title: "Excellence", 
                desc: "Achieving top-tier results through dedicated teaching.",
                page: Page.ACADEMICS 
              },
              { 
                icon: <Users size={24}/>, 
                title: "Community", 
                desc: "Building strong bonds between students, teachers, and parents.",
                page: Page.ABOUT 
              },
              { 
                icon: <Trophy size={24}/>, 
                title: "Growth", 
                desc: "Nurturing talents beyond the traditional classroom.",
                page: Page.ACADEMICS 
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => onNavigate(feature.page)}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer group hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {feature.desc}
                </p>
                <div className="font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;