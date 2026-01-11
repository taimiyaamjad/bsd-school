import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Loader2, AlertCircle, LogIn, CheckCircle, LogOut, Users, Check, X as CloseIcon, Phone, Clock } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, Timestamp } from 'firebase/firestore';

interface AdmissionInquiry {
  id: string;
  parentName: string;
  studentName: string;
  grade: string;
  phone: string;
  email: string;
  status?: 'Approved' | 'Rejected' | 'Pending';
  submittedAt: Timestamp;
}

const StaffLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>([]);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Inquiries if logged in
  useEffect(() => {
    if (!user) return;

    setIsDataLoading(true);
    const q = query(collection(db, "admissions"), orderBy("submittedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: AdmissionInquiry[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() } as AdmissionInquiry);
      });
      setInquiries(docs);
      setIsDataLoading(false);
    }, (err) => {
      console.error("Firestore error:", err);
      setIsDataLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
      setError("Invalid credentials. Please check your email and password.");
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      const docRef = doc(db, "admissions", id);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Staff Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Signed in as <span className="font-bold text-blue-600">{user.email}</span></p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.open('https://bsd-digital-portal.vercel.app/', '_blank')}
              className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2"
            >
              Full Portal
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center gap-2"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
              <Users size={20} className="text-blue-600" /> Recent Admission Inquiries
            </h2>
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              {inquiries.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            {isDataLoading ? (
              <div className="p-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-slate-500 font-medium">Synchronizing with BSD Digital Portal...</p>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="p-20 text-center">
                <p className="text-slate-400 text-lg">No inquiries found in the database.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/30 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <th className="px-8 py-4">Student & Grade</th>
                    <th className="px-8 py-4">Parent Contact</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {inquiries.map((inquiry) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={inquiry.id} 
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900 dark:text-white">{inquiry.studentName}</div>
                        <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{inquiry.grade}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{inquiry.parentName}</div>
                        <div className="flex items-center gap-4 mt-1 text-slate-500 text-xs">
                          <span className="flex items-center gap-1"><Phone size={12} /> {inquiry.phone}</span>
                          <span className="flex items-center gap-1"><Mail size={12} /> {inquiry.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          inquiry.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          inquiry.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                        }`}>
                          {inquiry.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(inquiry.id, 'Approved')}
                            disabled={inquiry.status === 'Approved'}
                            className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-green-500/10"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(inquiry.id, 'Rejected')}
                            disabled={inquiry.status === 'Rejected'}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-red-500/10"
                            title="Reject"
                          >
                            <CloseIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 pt-20 pb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <div className="text-center mb-10 relative">
          <div className="inline-flex p-4 rounded-3xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Staff Login</h1>
          <p className="text-slate-500 dark:text-slate-400">Access the BSD Digital Administration Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-sm font-medium"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Work Email</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={20} />
              </div>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="staff@bsdpublicschool.edu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={20} />
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isLoading ? (
              <><Loader2 className="animate-spin" size={24} /> Verifying...</>
            ) : (
              <><LogIn size={20} /> Authorize Session</>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-xs">
            Restricted access for BSD Public School employees only.<br/>
            Contact the IT department for account assistance.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StaffLogin;