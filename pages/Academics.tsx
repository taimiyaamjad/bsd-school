import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, FlaskConical, Globe, Calculator, Languages } from 'lucide-react';

const Academics: React.FC = () => {
  const faculty = [
    { name: "Mr. Ramakant Prajapati", sub: "Mathematics", qual: "M.Sc. in Mathematics", icon: <Calculator /> },
    { name: "Mr. Bobby Sir", sub: "Science", qual: "M.Sc. in Physics", icon: <FlaskConical /> },
    { name: "Mr. Amit Sir", sub: "English", qual: "M.A. in English Literature", icon: <Languages /> },
    { name: "Mr. Deepak Sir", sub: "Social Studies", qual: "M.A. in History", icon: <Globe /> },
    { name: "Mr. Abbaas Sir", sub: "Computer Science", qual: "M.C.A.", icon: <Code /> },
    { name: "Ms. Preeti Mam", sub: "Hindi", qual: "M.A. in Hindi", icon: <BookOpen /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="pb-16 pt-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Academic <span className="text-blue-600">Excellence</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Our curriculum, affiliated with CBSE, balances rigorous academics with practical innovation and creative exploration.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <div className="mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-black text-slate-400 dark:text-slate-600 mb-12 text-center uppercase tracking-[0.3em]"
          >
            Our Esteemed Faculty
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {faculty.map((teacher, i) => (
              <motion.div 
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-6 group hover:border-blue-500/50 transition-colors"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {teacher.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{teacher.name}</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mt-1">{teacher.sub}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 font-medium">{teacher.qual}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Curriculum Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-orange-50 dark:bg-orange-900/10 p-12 rounded-[3.5rem] border border-orange-100 dark:border-orange-900/20"
          >
            <h3 className="text-3xl font-bold text-orange-900 dark:text-orange-300 mb-8 tracking-tight">Core Foundation</h3>
            <ul className="space-y-6">
              {[
                "CBSE Standardized Curriculum",
                "Science & Mathematics Specialization",
                "Advanced Computer Applications",
                "Practical Laboratory Learning"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-blue-50 dark:bg-blue-900/10 p-12 rounded-[3.5rem] border border-blue-100 dark:border-blue-900/20"
          >
            <h3 className="text-3xl font-bold text-blue-900 dark:text-blue-300 mb-8 tracking-tight">Beyond Textbooks</h3>
            <ul className="space-y-6">
              {[
                "English & Hindi Literacy Excellence",
                "Interactive Social Studies Projects",
                "Physical Education & Leadership",
                "Artistic & Creative Development"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Academics;