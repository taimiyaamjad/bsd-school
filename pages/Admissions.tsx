import React from 'react';
import { Download, Calendar, CheckCircle } from 'lucide-react';

const Admissions: React.FC = () => {
  return (
    <div className="animate-fade-in pb-16">
       <div className="bg-orange-50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200 py-16 transition-colors">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Join the BSD Family</h1>
                <p className="max-w-2xl mx-auto">
                    We invite parents who value educational excellence and character development to apply for the 2024-25 academic session.
                </p>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
                
                {/* Process */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Admission Process</h2>
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold">1</div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Online Registration</h3>
                                <p className="text-gray-600 dark:text-slate-400">Fill out the inquiry form below or download the prospectus.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold">2</div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">School Visit & Assessment</h3>
                                <p className="text-gray-600 dark:text-slate-400">Schedule a campus tour. For Grade 1+, a basic aptitude assessment is conducted.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center font-bold">3</div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Parent Interaction</h3>
                                <p className="text-gray-600 dark:text-slate-400">An informal interaction with the Principal/Head of Section.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center font-bold">4</div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Confirmation</h3>
                                <p className="text-gray-600 dark:text-slate-400">Fee submission and document verification to secure the seat.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white"><Calendar size={20}/> Important Dates</h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                            <li className="flex justify-between"><span>Registration Opens:</span> <span className="font-semibold">Jan 15, 2024</span></li>
                            <li className="flex justify-between"><span>First Round Assessment:</span> <span className="font-semibold">Feb 10, 2024</span></li>
                            <li className="flex justify-between"><span>Session Begins:</span> <span className="font-semibold">April 2, 2024</span></li>
                        </ul>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-800 h-fit transition-colors">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admission Inquiry</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Parent's Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" placeholder="John Doe" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Student's Name</label>
                            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors" placeholder="Jane Doe" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Grade Applying For</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors">
                                    <option>Kindergarten</option>
                                    <option>Grade 1-5</option>
                                    <option>Grade 6-8</option>
                                    <option>Grade 9-12</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Phone Number</label>
                                <input type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors" placeholder="+1 (555)..." />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors" placeholder="you@example.com" />
                        </div>
                        <button className="w-full bg-blue-900 dark:bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 dark:hover:bg-blue-500 transition-colors shadow-md mt-2">
                            Submit Inquiry
                        </button>
                        <p className="text-xs text-gray-500 dark:text-slate-500 text-center mt-2">
                            Our admissions team will contact you within 24 hours.
                        </p>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
                        <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center justify-center gap-2 hover:text-blue-800 dark:hover:text-blue-300">
                            <Download size={16} /> Download Prospectus (PDF)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Admissions;