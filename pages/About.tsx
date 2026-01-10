import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in pb-16">
      {/* Hero */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img 
            src="https://picsum.photos/1200/400?grayscale&blur=2" 
            alt="School Building" 
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60 dark:bg-slate-900/80 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">About BSD Public School</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6">Principal's Message</h2>
                <p className="text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
                    "Welcome to BSD Public School. For over 25 years, we have dedicated ourselves to fostering an environment where curiosity thrives and potential is realized. Our mission goes beyond textbooks; we aim to mold compassionate, resilient, and forward-thinking individuals ready to lead in a complex world."
                </p>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed font-semibold">
                    - Dr. Sarah Johnson, Principal
                </p>
            </div>
            <div className="md:w-1/2">
                <img src="https://picsum.photos/600/400?random=1" alt="Principal" className="rounded-2xl shadow-lg w-full object-cover" />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-transparent dark:border-blue-800">
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-4">Our Vision</h3>
                <p className="text-gray-700 dark:text-slate-300">
                    To be a global leader in education, inspiring a passion for learning and empowering students to make a positive impact on society.
                </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-2xl border border-transparent dark:border-orange-800">
                <h3 className="text-xl font-bold text-orange-900 dark:text-orange-300 mb-4">Our Mission</h3>
                <p className="text-gray-700 dark:text-slate-300">
                    Provide a safe, inclusive, and technologically advanced learning environment that cultivates academic excellence, creativity, and moral integrity.
                </p>
            </div>
        </div>

        <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Our History</h2>
            <div className="relative border-l-2 border-blue-200 dark:border-slate-700 ml-4 md:ml-0 md:pl-0 space-y-12">
                <div className="md:flex items-center">
                    <div className="hidden md:block w-1/2 pr-8 text-right">
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">1999</h4>
                        <p className="text-gray-600 dark:text-slate-400">Founded by the Educational Trust with 50 students.</p>
                    </div>
                    <div className="absolute left-[-9px] md:left-1/2 md:ml-[-9px] w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"></div>
                    <div className="md:w-1/2 pl-8 md:pl-8 block md:hidden">
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">1999</h4>
                        <p className="text-gray-600 dark:text-slate-400">Founded by the Educational Trust with 50 students.</p>
                    </div>
                </div>
                 <div className="md:flex items-center">
                    <div className="md:w-1/2 pr-8 text-right hidden md:block"></div>
                    <div className="absolute left-[-9px] md:left-1/2 md:ml-[-9px] w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"></div>
                     <div className="md:w-1/2 pl-8">
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">2010</h4>
                        <p className="text-gray-600 dark:text-slate-400">Expanded to Senior Secondary Wing with state-of-the-art Science Labs.</p>
                    </div>
                </div>
                 <div className="md:flex items-center">
                    <div className="hidden md:block w-1/2 pr-8 text-right">
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">2023</h4>
                        <p className="text-gray-600 dark:text-slate-400">Received "Best Innovation in Education" Award. Student count crosses 1200.</p>
                    </div>
                    <div className="absolute left-[-9px] md:left-1/2 md:ml-[-9px] w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"></div>
                     <div className="md:w-1/2 pl-8 block md:hidden">
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-300">2023</h4>
                        <p className="text-gray-600 dark:text-slate-400">Received "Best Innovation in Education" Award. Student count crosses 1200.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;