import React, { useEffect, useState } from 'react';
import KnowledgeBackground from '../components/KnowledgeBackground';
import { SCHOOL_STATS } from '../constants';
import { ArrowRight, BookOpen, Users, Trophy } from 'lucide-react';
import { Page, SchoolStat } from '../types';
import { motion, useSpring, useTransform, animate, useInView } from 'framer-motion';

interface HomeProps {
  onNavigate: (page: Page) => void;
  isDarkMode?: boolean;
}

const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Extract numeric part and suffix (e.g., "800+" -> 800 and "+")
      const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
      const suffix = value.replace(/[0-9]/g, '');
      
      const controls = animate(0, numericPart, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest) + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

const Home: React.FC<HomeProps> = ({ onNavigate, isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  const heroWords = "Knowledge is Power & Progress".split(" ");

  return (
    <div className="relative min-h-screen">
      {/* Dynamic Background */}
      <KnowledgeBackground isDarkMode={!!isDarkMode} />
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-8 md:p-14 rounded-[4rem] border border-white/50 dark:border-slate-800 shadow-2xl shadow-blue-500/5">
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-[0.2em]">
                Established 2017
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.95] overflow-hidden">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                {heroWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={itemVariants}
                    className={word === "Power" || word === "&" || word === "Progress" ? "text-blue-600 dark:text-blue-400" : ""}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto font-medium"
            >
              Nurturing minds, building character, and empowering the next generation of leaders in Jaunpur.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center gap-5 flex-wrap">
              <button 
                  onClick={() => onNavigate(Page.ABOUT)}
                  className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-500/25 active:scale-95 hover:translate-y-[-2px]"
              >
                Learn More
              </button>
              <button 
                  onClick={() => onNavigate(Page.ADMISSIONS)}
                  className="px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm active:scale-95 hover:translate-y-[-2px]"
              >
                Apply Now
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid with Counting Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {SCHOOL_STATS.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 text-center group hover:border-blue-400 transition-colors"
                >
                    <div className="text-blue-600 dark:text-blue-400 font-black text-4xl mb-2">
                        <CountUp value={stat.value} />
                    </div>
                    <div className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black">
                        {stat.label}
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Core Pillars - Visual Enhancements */}
        <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <BookOpen size={28}/>, 
                title: "Excellence", 
                desc: "Our students consistently achieve top-tier results through our dedicated teaching approach and modern curriculum.",
                page: Page.ACADEMICS,
                delay: 0
              },
              { 
                icon: <Users size={28}/>, 
                title: "Community", 
                desc: "We foster strong bonds between students, teachers, and parents, creating a supportive family atmosphere.",
                page: Page.ABOUT,
                delay: 0.1
              },
              { 
                icon: <Trophy size={28}/>, 
                title: "Growth", 
                desc: "Beyond academics, we nurture diverse talents through sports, arts, and leadership development programs.",
                page: Page.ACADEMICS,
                delay: 0.2
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.8 }}
                onClick={() => onNavigate(feature.page)}
                className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 cursor-pointer group hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                    {feature.desc}
                </p>
                <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-5 transition-all">
                    Discover More <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;