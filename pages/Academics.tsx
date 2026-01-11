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

  return (
    <div className="pb-16 pt-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Academic Excellence</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our curriculum, affiliated with CBSE, balances rigorous academics with practical innovation and creative exploration.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">Our Esteemed Faculty</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {faculty.map((teacher, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center gap-5"
            >
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                {teacher.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{teacher.name}</h4>
                <p className="text-blue-600 dark:text-cyan-400 text-sm font-medium">{teacher.sub}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{teacher.qual}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Curriculum Sections */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-orange-50 dark:bg-orange-900/10 p-10 rounded-[2.5rem]">
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-300 mb-4">Core Focus</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                CBSE Standardized Curriculum
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Science & Mathematics Specialization
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                Advanced Computer Applications
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-10 rounded-[2.5rem]">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">Beyond Textbooks</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                English & Hindi Literacy Excellence
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Interactive Social Studies Projects
              </li>
              <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                Physical Education & Discipline
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;