import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const KnowledgeBackground: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const shapes = [
    { size: 'w-64 h-64', pos: 'top-10 left-[-5%]', color: 'bg-blue-400/10 dark:bg-blue-600/5', delay: 0 },
    { size: 'w-96 h-96', pos: 'top-[40%] right-[-10%]', color: 'bg-orange-400/10 dark:bg-orange-600/5', delay: 2 },
    { size: 'w-72 h-72', pos: 'bottom-[10%] left-[10%]', color: 'bg-cyan-400/10 dark:bg-cyan-600/5', delay: 4 },
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden overflow-y-hidden">
      {/* Animated Orbs */}
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: shape.delay }}
          style={{ y: i % 2 === 0 ? y1 : y2, rotate: rotate }}
          className={`absolute rounded-full blur-[80px] ${shape.size} ${shape.pos} ${shape.color}`}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]" 
           style={{ backgroundImage: 'radial-gradient(#1e3a8a 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      
      {/* Subtle Floating Icons (CSS only) */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + 'vw', 
              y: Math.random() * 100 + 'vh',
              opacity: 0 
            }}
            animate={{ 
              y: [null, '-20vh'],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-blue-900/20 dark:text-cyan-400/20 font-serif text-2xl select-none"
          >
            {['α', 'Σ', '∫', 'π', 'Ω', '√', 'Δ'][i % 7]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBackground;