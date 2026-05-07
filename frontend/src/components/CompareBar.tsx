"use client";

import { useCompare } from '@/context/CompareContext';
import { useRouter } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompareBar() {
  const { selectedColleges, clearSelection } = useCompare();
  const router = useRouter();

  return (
    <AnimatePresence>
      {selectedColleges.length > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          className="fixed bottom-6 md:bottom-12 left-1/2 z-50 w-full max-w-xl px-4 md:px-6"
        >
          <div className="bg-[rgba(15,23,42,0.85)] backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 rounded-full p-2 pl-4 md:pl-6 flex items-center justify-between gap-2 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex -space-x-2">
                {selectedColleges.slice(0, 3).map((id, index) => (
                  <div 
                    key={id} 
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-[#7C4DFF] to-[#5B5BFF] flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(124,77,255,0.4)]"
                  >
                    {index + 1}
                  </div>
                ))}
                {selectedColleges.length > 3 && (
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-slate-900 bg-[#050816] flex items-center justify-center text-[10px] font-bold text-slate-400">
                    +{selectedColleges.length - 3}
                  </div>
                )}
              </div>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <p className="text-sm font-medium text-slate-300 flex items-center gap-1">
                <span className="text-white font-bold">{selectedColleges.length}</span> 
                <span className="hidden sm:inline">{selectedColleges.length === 1 ? 'institution' : 'institutions'}</span>
              </p>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button 
                onClick={clearSelection}
                className="p-2 md:p-3 text-slate-500 hover:text-white transition-colors hover:bg-white/5 rounded-full"
                title="Clear selection"
              >
                <X size={16} />
              </button>
              <button 
                disabled={selectedColleges.length < 2}
                onClick={() => router.push('/compare')}
                className={`group h-10 md:h-11 px-4 md:px-6 rounded-full text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 md:gap-2 ${
                  selectedColleges.length >= 2 
                    ? 'bg-white text-[#050816] hover:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95' 
                    : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                Compare <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
