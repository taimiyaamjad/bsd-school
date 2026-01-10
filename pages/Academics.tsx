import React from 'react';

const Academics: React.FC = () => {
  return (
    <div className="animate-fade-in pb-16">
        <div className="bg-blue-900 dark:bg-blue-950 text-white py-16 transition-colors">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-4">Academic Excellence</h1>
                <p className="text-blue-100 dark:text-blue-200 max-w-2xl">
                    Our curriculum is designed to challenge students and foster a lifelong love for learning through a balanced mix of theory and practice.
                </p>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            
            {/* Sections */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-900/50 overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors">
                    <img src="https://picsum.photos/400/250?random=2" alt="Primary" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Primary Wing (K-5)</h3>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">Focus on literacy, numeracy, and social skills through play-based and experiential learning.</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-900/50 overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors">
                    <img src="https://picsum.photos/400/250?random=3" alt="Middle" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Middle School (6-8)</h3>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">Transition to specialized subjects, promoting critical thinking and collaborative project work.</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-slate-900/50 overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors">
                    <img src="https://picsum.photos/400/250?random=4" alt="Senior" className="w-full h-48 object-cover"/>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Senior School (9-12)</h3>
                        <p className="text-gray-600 dark:text-slate-400 text-sm">Rigorous preparation for board exams and university entrance with specialized streams in Science, Commerce, and Humanities.</p>
                    </div>
                </div>
            </div>

            {/* Curriculum Highlights */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Curriculum Highlights</h2>
            <div className="space-y-4">
                {[
                    { title: "STEM Integration", desc: "Robotics and coding classes integrated from Grade 3 onwards." },
                    { title: "Language Lab", desc: "Advanced facilities for mastering English, French, and Spanish." },
                    { title: "Visual & Performing Arts", desc: "Dedicated studios for music, dance, and fine arts." },
                    { title: "Digital Library", desc: "Access to over 10,000 eBooks and international research journals." }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <div className="flex-shrink-0 w-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">{item.title}</h4>
                            <p className="text-gray-600 dark:text-slate-400 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Academics;