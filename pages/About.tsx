import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  const leadership = [
    { name: "Shashank Sir", role: "Principal", desc: "With over 20 years of experience in educational leadership, dedicated to academic excellence." },
    { name: "Bobby Sir", role: "Vice Principal", desc: "Oversees student affairs and curriculum development for a supportive learning environment." },
    { name: "Sabajeet Sir", role: "Director", desc: "Provides strategic direction and commitment to the school's founding values." }
  ];

  return (
    <div className="pb-16 pt-20">
      <div className="container mx-auto px-4">
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Legacy & Leadership</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            BSD Public School has been a beacon of learning and community since 2017. Located in Guraini, Jaunpur, we are dedicated to providing a supportive and challenging environment where students thrive academically, creatively, and personally.
          </p>
        </motion.div>

        {/* Leadership Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {leadership.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 text-center"
            >
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-6 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-cyan-400 font-medium mb-4">{member.role}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{member.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* History Timeline */}
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-[3rem] p-10 md:p-16 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Our Journey</h2>
          <div className="space-y-12 max-w-3xl mx-auto">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md flex items-center justify-center font-bold text-blue-600">2017</div>
              <div>
                <h4 className="text-xl font-bold dark:text-white">Founding Year</h4>
                <p className="text-slate-600 dark:text-slate-400 mt-2">BSD Public School was founded in Guraini, Jaunpur, starting as a community school with a mission for holistic development.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md flex items-center justify-center font-bold text-orange-500">2018</div>
              <div>
                <h4 className="text-xl font-bold dark:text-white">CBSE Affiliation</h4>
                <p className="text-slate-600 dark:text-slate-400 mt-2">A major milestone as we became affiliated with CBSE, embracing modern teaching methodologies.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-md flex items-center justify-center font-bold text-cyan-500">Present</div>
              <div>
                <h4 className="text-xl font-bold dark:text-white">Legacy of Excellence</h4>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Today, we are a leading institution in the region, proud of our thousands of successful alumni.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;