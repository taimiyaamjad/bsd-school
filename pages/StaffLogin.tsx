import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Loader2, AlertCircle, LogIn, CheckCircle, LogOut, Users, Check, X as CloseIcon, Phone, Clock, Upload, Image as ImageIcon, Trash2, ExternalLink, Info } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, Timestamp, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Vercel Blob Token provided by user
const BLOB_TOKEN = "vercel_blob_rw_zNodi0FoXXYvFHHJ_0ONOJAzweaSuTBnGC2ic3PMNNMUcAi";

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

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  timestamp: any;
}

const StaffLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  
  // Gallery Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data if logged in
  useEffect(() => {
    if (!user) return;

    setIsDataLoading(true);
    
    // Inquiries Subscription
    const qInq = query(collection(db, "admissions"), orderBy("submittedAt", "desc"));
    const unsubscribeInq = onSnapshot(qInq, (snap) => {
      const docs: AdmissionInquiry[] = [];
      snap.forEach((d) => docs.push({ id: d.id, ...d.data() } as AdmissionInquiry));
      setInquiries(docs);
    });

    // Gallery Subscription
    const qGal = query(collection(db, "gallery"), orderBy("timestamp", "desc"));
    const unsubscribeGal = onSnapshot(qGal, (snap) => {
      const items: GalleryItem[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as GalleryItem));
      setGalleryItems(items);
      setIsDataLoading(false);
    });

    return () => {
      unsubscribeInq();
      unsubscribeGal();
    };
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

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !uploadTitle.trim()) return;

    setUploading(true);
    try {
      const filename = `${Date.now()}-${selectedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const response = await fetch(`https://blob.vercel-storage.com/${filename}`, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Authorization': `Bearer ${BLOB_TOKEN}`,
        },
      });

      if (!response.ok) throw new Error("Blob upload failed");
      const blobResult = await response.json();
      const imageUrl = blobResult.url;

      await addDoc(collection(db, "gallery"), {
        url: imageUrl,
        title: uploadTitle,
        timestamp: serverTimestamp(),
      });

      setUploadTitle('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photo from the gallery?")) return;
    try {
      await deleteDoc(doc(db, "gallery", id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 pt-20 pb-24 lg:pt-24 lg:pb-16 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">Staff Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Authenticated as <span className="font-bold text-blue-600">{user.email}</span></p>
            </motion.div>
            <div className="flex w-full sm:w-auto gap-2">
              <button 
                onClick={() => window.open('https://bsd-digital-portal.vercel.app/', '_blank')}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} /> Portal
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            
            {/* Admissions Inquiry Section */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                      <Users size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800 dark:text-white leading-none">Admission Inquiries</h2>
                      <p className="text-xs text-slate-500 mt-1">Manage recent student applications</p>
                    </div>
                  </div>
                  <span className="self-start md:self-center bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {inquiries.length} Applications
                  </span>
                </div>

                <div className="p-4 md:p-6 overflow-y-auto max-h-[70vh]">
                  {isDataLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="animate-spin text-blue-600" size={32} />
                      <p className="text-slate-500 text-sm font-medium">Syncing data...</p>
                    </div>
                  ) : inquiries.length === 0 ? (
                    <div className="py-20 text-center text-slate-400">
                      <Info size={40} className="mx-auto mb-4 opacity-20" />
                      <p>No new inquiries at this time.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Responsive Card-like View for each Inquiry */}
                      {inquiries.map((inquiry) => (
                        <motion.div 
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={inquiry.id}
                          className="group relative bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">{inquiry.grade}</div>
                                <span className={`md:hidden px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                  inquiry.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                  inquiry.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                }`}>
                                  {inquiry.status || 'Pending'}
                                </span>
                              </div>
                              
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{inquiry.studentName}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Parent: {inquiry.parentName}</p>
                              </div>

                              <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                                <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                  <Phone size={14} /> {inquiry.phone}
                                </a>
                                <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                  <Mail size={14} /> {inquiry.email}
                                </a>
                              </div>
                            </div>

                            <div className="flex md:flex-col justify-between items-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-200 dark:border-slate-700">
                              <span className={`hidden md:inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                inquiry.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                inquiry.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                              }`}>
                                {inquiry.status || 'Pending'}
                              </span>
                              
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleStatusUpdate(inquiry.id, 'Approved')} 
                                  disabled={inquiry.status === 'Approved'}
                                  className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all disabled:opacity-20 shadow-lg shadow-green-500/20 active:scale-90"
                                >
                                  <Check size={18} />
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(inquiry.id, 'Rejected')} 
                                  disabled={inquiry.status === 'Rejected'}
                                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all disabled:opacity-20 shadow-lg shadow-red-500/20 active:scale-90"
                                >
                                  <CloseIcon size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Side Column: Gallery Management */}
            <div className="lg:col-span-4 space-y-6">
              {/* Upload Box */}
              <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
                  <div className="p-2 bg-orange-500 rounded-lg text-white">
                    <Upload size={18} />
                  </div>
                  New Gallery Photo
                </h2>
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Photo Caption</label>
                    <input 
                      required
                      type="text" 
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm"
                      placeholder="e.g. Science Fair 2024"
                    />
                  </div>
                  <div 
                    className="group relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:bg-orange-50 dark:hover:bg-orange-900/10 cursor-pointer transition-all active:scale-95"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      accept="image/*"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    {selectedFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-xl">
                          <ImageIcon size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-full px-2">
                          {selectedFile.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon size={24} className="text-slate-300 dark:text-slate-600 group-hover:text-orange-400 transition-colors" />
                        <p className="text-xs text-slate-500 font-medium">Tap to select photo</p>
                      </div>
                    )}
                  </div>
                  <button 
                    disabled={uploading || !selectedFile || !uploadTitle}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                    {uploading ? 'Processing...' : 'Publish to Gallery'}
                  </button>
                </form>
              </div>

              {/* Recent Uploads Grid */}
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                 <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                   <h3 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">Live Gallery</h3>
                   <span className="text-[10px] font-bold text-slate-400">{galleryItems.length} Photos</span>
                 </div>
                 <div className="p-4 grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                   {galleryItems.map((item) => (
                     <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800">
                       <img src={item.url} className="w-full h-full object-cover" alt={item.title} />
                       <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button 
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="p-2.5 bg-red-500 text-white rounded-xl shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                         >
                           <Trash2 size={16} />
                         </button>
                       </div>
                     </div>
                   ))}
                   {galleryItems.length === 0 && <p className="col-span-2 text-center text-xs text-slate-400 py-10">No photos published.</p>}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login View remains similar but with minor responsiveness tweaks
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 pt-24 pb-16">
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Staff Portal</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Restricted administrative access for BSD Staff</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Identity (Email)</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Mail size={18} />
              </div>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="staff@bsdpublicschool.edu"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isLoading ? (
              <><Loader2 className="animate-spin" size={20} /> Verifying Credentials...</>
            ) : (
              <><LogIn size={20} /> Authorize Session</>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
            Guraini, Jaunpur<br/>
            BSD Educational Society &copy; {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default StaffLogin;