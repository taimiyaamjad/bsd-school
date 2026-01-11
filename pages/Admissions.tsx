import React, { useState } from 'react';
import { Download, Calendar, CheckCircle, Send, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Admissions: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: 'Nursery / KG',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Add a new document with a generated id to the "admissions" collection
      await addDoc(collection(db, "admissions"), {
        ...formData,
        submittedAt: serverTimestamp(),
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError("Failed to submit. Please check your internet connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-16 pt-20">
       <div className="bg-orange-50 dark:bg-orange-950/30 text-orange-900 dark:text-orange-200 py-16 mb-12 transition-colors">
            <div className="container mx-auto px-4 text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  Join the BSD Family
                </motion.h1>
                <p className="max-w-2xl mx-auto text-lg opacity-90">
                    We invite parents who value educational excellence and character development to apply for the upcoming academic session.
                </p>
            </div>
        </div>

        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                
                {/* Process Info */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Admission Process</h2>
                    <div className="space-y-8">
                        {[
                          { step: 1, title: "Online Registration", desc: "Fill out the inquiry form or download the prospectus to begin.", color: "blue" },
                          { step: 2, title: "School Visit & Assessment", desc: "Schedule a campus tour and a basic aptitude assessment.", color: "blue" },
                          { step: 3, title: "Parent Interaction", desc: "An informal meeting with the Principal to discuss the student's needs.", color: "blue" },
                          { step: 4, title: "Confirmation", desc: "Document verification and fee submission to secure admission.", color: "green" }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-5"
                          >
                            <div className={`flex-shrink-0 w-12 h-12 ${item.color === 'blue' ? 'bg-blue-600' : 'bg-green-600'} text-white rounded-2xl flex items-center justify-center font-bold shadow-lg`}>
                              {item.step}
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                          <Calendar size={24} className="text-blue-600"/> Important Dates
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                              <span className="text-slate-600 dark:text-slate-400">Registration Opens</span>
                              <span className="font-bold text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">January 15</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                              <span className="text-slate-600 dark:text-slate-400">Assessment Rounds</span>
                              <span className="font-bold text-slate-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg">February 10-25</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600 dark:text-slate-400">New Session Starts</span>
                              <span className="font-bold text-slate-900 dark:text-white bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg text-green-700 dark:text-green-400">April 2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inquiry Form */}
                <div className="relative">
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div 
                        key="form"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800"
                      >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Inquiry Form</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8">Tell us about your child to get started.</p>
                        
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {error && (
                              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 text-sm font-medium animate-shake">
                                <AlertCircle size={18} />
                                {error}
                              </div>
                            )}

                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Parent's Full Name</label>
                                    <input 
                                      required 
                                      name="parentName"
                                      value={formData.parentName}
                                      onChange={handleChange}
                                      type="text" 
                                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" 
                                      placeholder="e.g. Rahul Sharma" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Student's Full Name</label>
                                    <input 
                                      required 
                                      name="studentName"
                                      value={formData.studentName}
                                      onChange={handleChange}
                                      type="text" 
                                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" 
                                      placeholder="e.g. Aryan Sharma" 
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Grade Level</label>
                                    <select 
                                      name="grade"
                                      value={formData.grade}
                                      onChange={handleChange}
                                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none"
                                    >
                                        <option>Nursery / KG</option>
                                        <option>Grade 1 - 5</option>
                                        <option>Grade 6 - 8</option>
                                        <option>Grade 9 - 12</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                                    <input 
                                      required 
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleChange}
                                      type="tel" 
                                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" 
                                      placeholder="+91 0000000000" 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                                <input 
                                  required 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  type="email" 
                                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" 
                                  placeholder="name@email.com" 
                                />
                            </div>

                            <button 
                              disabled={isSubmitting}
                              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                  <>
                                    <Loader2 className="animate-spin" size={24} /> Submitting to BSD...
                                  </>
                                ) : (
                                  <>
                                    <Send size={20} /> Submit Inquiry
                                  </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-500 dark:text-slate-500 font-medium">
                                * Your data will be stored securely in the BSD Digital Portal database.
                            </p>
                        </form>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                            <button className="text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center gap-2 hover:underline group">
                                <Download size={20} className="group-hover:translate-y-1 transition-transform" /> 
                                Download 2024 Prospectus
                            </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 dark:bg-green-900/20 p-12 rounded-[3rem] text-center border-2 border-green-200 dark:border-green-800"
                      >
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <CheckCircle size={48} />
                        </div>
                        <h2 className="text-3xl font-bold text-green-900 dark:text-green-300 mb-4">Application Received!</h2>
                        <p className="text-green-800 dark:text-green-400 mb-8 text-lg">
                          Thank you for choosing BSD Public School. Your details have been saved to our Digital Portal. Our admissions officer will contact you within 24-48 hours.
                        </p>
                        <button 
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData({
                              parentName: '',
                              studentName: '',
                              grade: 'Nursery / KG',
                              phone: '',
                              email: ''
                            });
                          }}
                          className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md"
                        >
                          Submit Another Inquiry
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Admissions;