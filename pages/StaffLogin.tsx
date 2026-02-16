import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Loader2, AlertCircle, LogIn, CheckCircle, LogOut, Users, Check, X as CloseIcon, Phone, Clock, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
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
      // 1. Upload to Vercel Blob
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

      // 2. Save Metadata to Firestore
      await addDoc(collection(db, "gallery"), {
        url: imageUrl,
        title: uploadTitle,
        timestamp: serverTimestamp(),
      });

      // Reset Form
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Admissions Table */}
          <div className="lg:col-span-2 space-y-8">
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
                    <p className="text-slate-500 font-medium">Loading Inquiries...</p>
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="p-20 text-center">
                    <p className="text-slate-400 text-lg">No inquiries found.</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/30 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        <th className="px-8 py-4">Student & Grade</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {inquiries.slice(0, 10).map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-8 py-6">
                            <div className="font-bold text-slate-900 dark:text-white">{inquiry.studentName}</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">{inquiry.grade}</div>
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
                              <button onClick={() => handleStatusUpdate(inquiry.id, 'Approved')} className="p-2 bg-green-500 text-white rounded-lg"><Check size={16}/></button>
                              <button onClick={() => handleStatusUpdate(inquiry.id, 'Rejected')} className="p-2 bg-red-500 text-white rounded-lg"><CloseIcon size={16}/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* Gallery Management */}
          <div className="space-y-8">
            {/* Upload Box */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white mb-6">
                <Upload size={20} className="text-orange-500" /> Upload to Gallery
              </h2>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <input 
                  required
                  type="text" 
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                  placeholder="Photo Title (e.g. Sports Day 2024)"
                />
                <div 
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
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
                      <ImageIcon size={32} className="text-orange-500" />
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-full">
                        {selectedFile.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon size={32} className="text-slate-300" />
                      <p className="text-sm text-slate-500">Click to select photo</p>
                    </div>
                  )}
                </div>
                <button 
                  disabled={uploading || !selectedFile || !uploadTitle}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  {uploading ? 'Uploading...' : 'Publish to Gallery'}
                </button>
              </form>
            </div>

            {/* Recent Gallery Items */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                 <h3 className="font-bold text-slate-800 dark:text-white">Gallery Management</h3>
               </div>
               <div className="p-6 grid grid-cols-2 gap-3">
                 {galleryItems.slice(0, 6).map((item) => (
                   <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800">
                     <img src={item.url} className="w-full h-full object-cover" />
                     <button 
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <Trash2 size={14} />
                     </button>
                   </div>
                 ))}
                 {galleryItems.length === 0 && <p className="col-span-2 text-center text-xs text-slate-400 py-10">No photos uploaded yet.</p>}
               </div>
            </div>
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