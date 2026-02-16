import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Loader2, Maximize2, X } from 'lucide-react';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  timestamp: any;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: GalleryItem[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as GalleryItem);
      });
      setImages(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pb-16 pt-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">School Gallery</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Capturing moments of learning, sports, and celebrations at BSD Public School.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-500 font-medium">Loading memories...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
            <ImageIcon size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p className="text-slate-500 dark:text-slate-500">The gallery is currently being curated. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer shadow-lg shadow-slate-200/50 dark:shadow-none"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg leading-tight">{img.title}</h3>
                  <div className="mt-2 flex items-center text-blue-300 text-xs font-bold uppercase tracking-widest gap-2">
                    <Maximize2 size={14} /> Full View
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="max-h-[80vh] w-auto rounded-3xl shadow-2xl border-4 border-white/10"
              />
              <div className="mt-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedImage.title}</h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;