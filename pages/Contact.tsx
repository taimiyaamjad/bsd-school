import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_PHONE } from '../constants';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div className="pb-16 pt-20">
        <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h1>
                <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-400">
                    We are here to answer your questions. Visit our campus in Guraini, Jaunpur, or connect with us online.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Contact Info Cards */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-start gap-5">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl text-blue-600 dark:text-blue-400">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Our Location</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{SCHOOL_ADDRESS}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-start gap-5">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl text-blue-600 dark:text-blue-400">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{SCHOOL_PHONE}</p>
                            <p className="text-slate-400 text-xs mt-1">Mon-Sat, 8:00 AM - 3:00 PM</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-start gap-5">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl text-blue-600 dark:text-blue-400">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">{SCHOOL_EMAIL}</p>
                        </div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="md:col-span-2 h-[500px] bg-slate-200 dark:bg-slate-800 rounded-[3rem] overflow-hidden relative shadow-inner border-4 border-white dark:border-slate-900">
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-800/80 p-6 text-center">
                        <MapPin size={48} className="text-blue-600 mb-4 opacity-50" />
                        <h4 className="text-xl font-bold dark:text-white mb-2">Campus Map</h4>
                        <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                            Located in the peaceful surroundings of Guraini, Jaunpur, Uttar Pradesh.
                        </p>
                        <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                            Open in Google Maps
                        </button>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white dark:border-slate-800 max-w-xs">
                        <div className="flex items-center gap-3 text-slate-900 dark:text-white font-bold mb-3">
                            <Clock size={18} className="text-orange-500" />
                            Visiting Hours
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <p>Weekdays: 8:00 AM - 2:30 PM</p>
                            <p>Saturday: 8:00 AM - 12:30 PM</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-2">*Prior appointment recommended</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Contact;