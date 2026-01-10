import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_PHONE } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in pb-16">
        <div className="bg-gray-900 dark:bg-black text-white py-16 transition-colors">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="max-w-xl mx-auto text-gray-400">
                    We are here to answer your questions. Visit us, call us, or send a message.
                </p>
            </div>
        </div>

        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Contact Info Cards */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-800 flex items-start gap-4 transition-colors">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Our Location</h3>
                            <p className="text-gray-600 dark:text-slate-400 text-sm">{SCHOOL_ADDRESS}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-800 flex items-start gap-4 transition-colors">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                            <p className="text-gray-600 dark:text-slate-400 text-sm">{SCHOOL_PHONE}</p>
                            <p className="text-gray-500 dark:text-slate-500 text-xs mt-1">Mon-Fri, 8am - 4pm</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm dark:shadow-slate-900/50 border border-gray-100 dark:border-slate-800 flex items-start gap-4 transition-colors">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                            <p className="text-gray-600 dark:text-slate-400 text-sm">{SCHOOL_EMAIL}</p>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="md:col-span-2 h-[400px] bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden relative shadow-inner transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-slate-800">
                        <p className="text-gray-500 dark:text-slate-400 font-semibold flex items-center gap-2">
                             <MapPin size={20} /> Map Integration Placeholder
                        </p>
                    </div>
                    {/* Simulated Map Overlay */}
                    <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg max-w-xs transition-colors">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Visiting Hours</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400 mt-2">
                            <Clock size={14} />
                            <span>8:00 AM - 2:00 PM (Weekdays)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Contact;