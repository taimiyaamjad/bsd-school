import React from 'react';
import ThreeScene from '../components/ThreeScene';
import { SCHOOL_STATS } from '../constants';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
  isDarkMode?: boolean;
}

const Home: React.FC<HomeProps> = ({ onNavigate, isDarkMode }) => {
  return (
    <div className="animate-fade-in relative">
      {/* Fixed Background Scene */}
      <ThreeScene isDarkMode={isDarkMode} />
      
      {/* Introduction */}
      <div className="container mx-auto px-4 pt-48 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="bg-white/30 dark:bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-900 dark:text-white mb-6 transition-colors drop-shadow-sm">
              Empowering Minds,<br/> Shaping Futures
            </h1>
            <p className="text-lg text-gray-800 dark:text-slate-200 leading-relaxed mb-8 transition-colors font-medium">
              Welcome to BSD Public School. Where numbers come alive and innovation meets tradition.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button 
                  onClick={() => onNavigate(Page.ABOUT)}
                  className="px-8 py-3 bg-blue-900 dark:bg-cyan-600 text-white rounded-full font-bold hover:bg-blue-800 dark:hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/20"
              >
                Discover More
              </button>
              <button 
                  onClick={() => onNavigate(Page.ADMISSIONS)}
                  className="px-8 py-3 bg-white/80 dark:bg-slate-800/80 text-blue-900 dark:text-white rounded-full font-bold hover:bg-white dark:hover:bg-slate-700 transition-all backdrop-blur-sm shadow-lg"
              >
                Admissions Open
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {SCHOOL_STATS.map((stat, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 dark:border-slate-700 text-center hover:transform hover:-translate-y-1 transition-all duration-300">
                    <div className="text-blue-600 dark:text-cyan-400 font-bold text-3xl mb-2">{stat.value}</div>
                    <div className="text-gray-600 dark:text-slate-300 text-sm uppercase tracking-wide font-semibold">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 group hover:border-blue-200 dark:hover:border-cyan-700 transition-all">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Academic Excellence</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-4">
                    Rigorous curriculum combining STEM, Arts, and Humanities to prepare students for top global universities.
                </p>
                <button onClick={() => onNavigate(Page.ACADEMICS)} className="text-blue-600 dark:text-cyan-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight size={16} />
                </button>
            </div>
             <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 group hover:border-green-200 dark:hover:border-green-700 transition-all">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Holistic Development</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-4">
                    Focus on emotional intelligence, leadership skills, and community service alongside academics.
                </p>
                <button onClick={() => onNavigate(Page.ABOUT)} className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Our Philosophy <ArrowRight size={16} />
                </button>
            </div>
             <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 group hover:border-orange-200 dark:hover:border-orange-700 transition-all">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Trophy size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Beyond Classroom</h3>
                <p className="text-gray-600 dark:text-slate-400 mb-4">
                    State-of-the-art sports facilities, robotics clubs, and music conservatories.
                </p>
                <button onClick={() => onNavigate(Page.ACADEMICS)} className="text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    View Activities <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
