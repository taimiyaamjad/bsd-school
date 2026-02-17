import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users } from 'lucide-react';

const About: React.FC = () => {
  const leadership = [
    { name: "Shashank Sir", role: "Principal", desc: "With over 20 years of experience in educational leadership, dedicated to academic excellence." },
    { name: "Bobby Sir", role: "Vice Principal", desc: "Oversees student affairs and curriculum development for a supportive learning environment." },
    { name: "Sabajeet Sir", role: "Director", desc: "Provides strategic direction and commitment to the school's founding values." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="pb-16 pt-24">
      <div className="container mx-auto px-4">
        {/* Intro */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.h1 variants={textVariants} className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
            Our Legacy & <span className="text-blue-600">Leadership</span>
          </motion.h1>
          <motion.p variants={textVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            BSD Public School has been a beacon of learning and community since 2017. Located in Guraini, Jaunpur, we are dedicated to providing a supportive and challenging environment where students thrive academically, creatively, and personally.
          </motion.p>
        </motion.div>

        {/* Leadership Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {leadership.map((member, i) => (
            <motion.div 
              key={i}
              variants={textVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center transition-all hover:border-blue-500/30"
            >
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-3xl mx-auto mb-6 flex items-center justify-center text-blue-600 dark:text-blue-400 transform -rotate-3 hover:rotate-0 transition-transform">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{member.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* History Timeline */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-100 dark:bg-slate-900/50 rounded-[4rem] p-12 md:p-20 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/5 blur-[100px] -ml-32 -mt-32"></div>
          <h2 className="text-4xl font-bold text-center mb-16 dark:text-white tracking-tight">Our Evolution</h2>
          <div className="space-y-16 max-w-4xl mx-auto">
            {[
              { year: "2017", title: "Founding Year", color: "text-blue-600", bg: "bg-blue-600/10", desc: "BSD Public School was founded in Guraini, Jaunpur, starting as a community school with a mission for holistic development." },
              { year: "2018", title: "CBSE Affiliation", color: "text-orange-500", bg: "bg-orange-500/10", desc: "A major milestone as we became affiliated with CBSE, embracing modern teaching methodologies." },
              { year: "Present", title: "Legacy of Excellence", color: "text-cyan-500", bg: "bg-cyan-500/10", desc: "Today, we are a leading institution in the region, proud of our thousands of successful alumni." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col md:flex-row gap-8 items-start"
              >
                <div className={`flex-shrink-0 w-24 h-24 ${item.bg} rounded-[2rem] shadow-sm flex items-center justify-center font-black text-xl ${item.color} transform rotate-3`}>
                  {item.year}
                </div>
                <div className="pt-2">
                  <h4 className="text-2xl font-bold dark:text-white mb-3 tracking-tight">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;