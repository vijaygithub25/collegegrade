"use client";

import { useEffect, useState } from 'react';
import { fetchCompareColleges, College } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';
import { 
  Loader2, ArrowLeft, Building, MapPin, IndianRupee, ShieldCheck, 
  Star, Share2, ChevronRight, Plus, X, Trophy, TrendingUp, Sparkles, AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ComparePage() {
  const { selectedColleges, toggleCollege } = useCompare();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (selectedColleges.length < 2) {
      router.push('/');
      return;
    }
    fetchCompareColleges(selectedColleges)
      .then(data => setColleges(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedColleges, router]);

  if (selectedColleges.length < 2) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-[#7C4DFF] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-[#5B5BFF] animate-spin opacity-70" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <p className="text-[#A855F7] font-bold tracking-widest uppercase text-sm animate-pulse">Analyzing Institutions...</p>
        </div>
      </div>
    );
  }

  // Value highlight logic
  const bestRating = Math.max(...colleges.map(c => c.rating));
  const bestPlacement = Math.max(...colleges.map(c => c.placement));
  const lowestFees = Math.min(...colleges.map(c => c.fees));

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <div className="min-h-screen bg-[#050816] pb-32 text-slate-100 selection:bg-[#7C4DFF]/30 font-sans">
      
      {/* Hero Header */}
      <div className="relative overflow-hidden text-white pb-24 pt-12 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#7C4DFF]/15 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#5B5BFF]/15 blur-[120px]" />
        </div>
        
        <header className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium bg-[rgba(15,23,42,0.5)] px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm w-fit">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to discover
              </Link>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent pb-2">
                  Institutional Analysis
                </h1>
                <p className="text-slate-400 text-lg max-w-xl font-medium mt-2 leading-relaxed">
                  Compare fees, placements, ratings, and programs side-by-side to make smarter decisions.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 bg-[rgba(15,23,42,0.5)] text-white rounded-full text-sm font-medium hover:bg-[rgba(15,23,42,0.8)] border border-white/5 hover:border-[#7C4DFF]/50 transition-all backdrop-blur-sm flex items-center gap-2">
                <Share2 size={16} className="text-[#A855F7]" /> Share Report
              </button>
              <Link href="/" className="px-6 py-3 bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] text-white rounded-full text-sm font-semibold transition-all shadow-[0_0_20px_rgba(124,77,255,0.4)] hover:shadow-[0_0_35px_rgba(124,77,255,0.7)] hover:scale-105 flex items-center gap-2 border border-white/20">
                Add Institution <Plus size={16} />
              </Link>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-7xl mx-auto px-6 -mt-12 relative z-20 space-y-8">
        
        {/* Top College Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {colleges.map((college, index) => {
              const logoColors = ['bg-[#7C4DFF]', 'bg-[#5B5BFF]', 'bg-[#A855F7]', 'bg-rose-500', 'bg-emerald-500'];
              const logoColor = logoColors[college.id % logoColors.length];

              return (
                <motion.div 
                  key={college.id}
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[rgba(15,23,42,0.6)] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative group hover:border-[#7C4DFF]/40 hover:shadow-[0_0_30px_rgba(124,77,255,0.15)] transition-all duration-300 flex flex-col"
                >
                  <button 
                    onClick={() => toggleCollege(college.id)}
                    className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 hover:bg-white/5 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-14 h-14 ${logoColor} text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)] flex-shrink-0 border border-white/10`}>
                      {college.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 pr-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7C4DFF] group-hover:to-[#5B5BFF] transition-all">{college.name}</h3>
                      <p className="text-[#A855F7] text-sm mt-1 flex items-center gap-1 font-medium">
                        <MapPin size={14} /> {college.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Rating</p>
                      <p className="text-sm font-bold text-white flex items-center justify-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" /> {college.rating}
                      </p>
                    </div>
                    <div className="w-px h-8 bg-white/[0.05]"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Placement</p>
                      <p className="text-sm font-bold text-white">{college.placement}%</p>
                    </div>
                    <div className="w-px h-8 bg-white/[0.05]"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fees</p>
                      <p className="text-sm font-bold text-white">₹{(college.fees / 100000).toFixed(1)}L</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Comparison Sections */}
        <div className="space-y-6 pt-8">
          
          {/* Annual Fees */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[rgba(15,23,42,0.4)] rounded-[2rem] border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-md"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center gap-3 bg-[rgba(15,23,42,0.6)]">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <IndianRupee size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Annual Fees</h2>
                <p className="text-sm text-slate-400">Lower is generally better for ROI.</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colleges.map(c => {
                const isBest = c.fees === lowestFees;
                const maxFees = Math.max(...colleges.map(col => col.fees));
                const percentage = (c.fees / maxFees) * 100;
                
                return (
                  <div key={c.id} className={`relative p-5 rounded-2xl border flex flex-col ${isBest ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/5 bg-white/5'}`}>
                    {isBest && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1 border border-emerald-300">
                        <Trophy size={12} /> Best ROI
                      </div>
                    )}
                    <h3 className="text-sm font-medium text-slate-400 mb-2 truncate">{c.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4 flex-1">
                      <span className={`text-3xl font-bold tracking-tight ${isBest ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-white'}`}>
                        ₹{c.fees.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500">/yr</span>
                    </div>
                    
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${isBest ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-[#5B5BFF]'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Rating Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[rgba(15,23,42,0.4)] rounded-[2rem] border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-md"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center gap-3 bg-[rgba(15,23,42,0.6)]">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Star size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Overall Rating</h2>
                <p className="text-sm text-slate-400">Based on student reviews and infrastructure.</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colleges.map(c => {
                const isBest = c.rating === bestRating;
                
                return (
                  <div key={c.id} className={`relative p-5 rounded-2xl border flex flex-col items-center justify-center text-center ${isBest ? 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-white/5 bg-white/5'}`}>
                    {isBest && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center gap-1 border border-amber-300">
                        <Sparkles size={12} /> Highest Rated
                      </div>
                    )}
                    <h3 className="text-sm font-medium text-slate-400 mb-4 truncate w-full">{c.name}</h3>
                    
                    <div className="relative w-24 h-24 mb-4">
                      <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-slate-800" strokeWidth="8" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 283 }}
                          whileInView={{ strokeDashoffset: 283 - (283 * c.rating) / 5 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" 
                          className={isBest ? 'text-amber-400' : 'text-[#7C4DFF]'} 
                          strokeWidth="8" strokeLinecap="round" 
                          strokeDasharray="283" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className={`text-2xl font-bold ${isBest ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 'text-white'}`}>{c.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={`${star <= Math.round(c.rating) ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 'text-slate-700'}`} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Placement Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[rgba(15,23,42,0.4)] rounded-[2rem] border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-md"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center gap-3 bg-[rgba(15,23,42,0.6)]">
              <div className="w-10 h-10 rounded-xl bg-[#5B5BFF]/20 text-[#5B5BFF] flex items-center justify-center border border-[#5B5BFF]/30 shadow-[0_0_15px_rgba(91,91,255,0.2)]">
                <TrendingUp size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Placement Rate</h2>
                <p className="text-sm text-slate-400">Percentage of students placed in recent batch.</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colleges.map(c => {
                const isBest = c.placement === bestPlacement;
                
                return (
                  <div key={c.id} className={`relative p-5 rounded-2xl border flex flex-col ${isBest ? 'border-[#5B5BFF]/50 bg-[#5B5BFF]/10 shadow-[0_0_20px_rgba(91,91,255,0.15)]' : 'border-white/5 bg-white/5'}`}>
                    {isBest && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(124,77,255,0.5)] flex items-center gap-1 border border-[#7C4DFF]/50">
                        <ShieldCheck size={12} /> Top Placement
                      </div>
                    )}
                    <h3 className="text-sm font-medium text-slate-400 mb-2 truncate">{c.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4 flex-1">
                      <span className={`text-4xl font-bold tracking-tight ${isBest ? 'text-[#5B5BFF] drop-shadow-[0_0_10px_rgba(91,91,255,0.5)]' : 'text-white'}`}>
                        {c.placement}%
                      </span>
                    </div>
                    
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.placement}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-full rounded-full ${isBest ? 'bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] shadow-[0_0_10px_rgba(91,91,255,0.8)]' : 'bg-slate-500'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Programs Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[rgba(15,23,42,0.4)] rounded-[2rem] border border-white/[0.08] overflow-hidden shadow-2xl backdrop-blur-md"
          >
            <div className="p-6 border-b border-white/[0.05] flex items-center gap-3 bg-[rgba(15,23,42,0.6)]">
              <div className="w-10 h-10 rounded-xl bg-[#7C4DFF]/20 text-[#A855F7] flex items-center justify-center border border-[#7C4DFF]/30 shadow-[0_0_15px_rgba(124,77,255,0.2)]">
                <Building size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Available Programs</h2>
                <p className="text-sm text-slate-400">Major degrees and specializations offered.</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {colleges.map(c => (
                <div key={c.id} className="relative p-5 rounded-2xl border border-white/5 bg-white/5">
                  <h3 className="text-sm font-medium text-slate-400 mb-4 truncate">{c.name}</h3>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {c.courses.map(course => (
                      <span key={course.id} className="px-3 py-1.5 bg-black/40 border border-white/10 text-slate-300 text-xs font-medium rounded-lg hover:border-[#7C4DFF]/50 hover:text-white hover:bg-[#7C4DFF]/10 transition-colors cursor-default shadow-sm backdrop-blur-md">
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center space-y-8 py-12 relative"
        >
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 w-full h-[300px] bg-[#7C4DFF]/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7C4DFF]/10 text-[#A855F7] text-sm font-bold border border-[#7C4DFF]/30 shadow-[0_0_20px_rgba(124,77,255,0.2)] backdrop-blur-md">
            <AlertCircle size={16} /> Made your decision?
          </div>
          <div className="relative z-10 flex flex-wrap justify-center gap-6">
            {colleges.map(college => {
              const logoColors = ['bg-[#7C4DFF]', 'bg-[#5B5BFF]', 'bg-[#A855F7]', 'bg-rose-500', 'bg-emerald-500'];
              const logoColor = logoColors[college.id % logoColors.length];

              return (
                <Link 
                  key={college.id} 
                  href={`/colleges/${college.id}`}
                  className="group relative flex items-center gap-4 p-4 pr-6 rounded-2xl bg-[rgba(15,23,42,0.8)] border border-white/[0.08] hover:border-[#7C4DFF]/50 hover:bg-[rgba(15,23,42,1)] shadow-xl hover:shadow-[0_0_30px_rgba(124,77,255,0.2)] transition-all duration-300 backdrop-blur-xl"
                >
                  <div className={`w-12 h-12 ${logoColor} rounded-xl flex items-center justify-center text-white shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)] font-bold text-xl`}>
                    {college.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7C4DFF] group-hover:to-[#5B5BFF] transition-all">{college.name}</span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1 group-hover:text-[#A855F7] transition-colors">
                      View full profile <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(124,77,255,0.5);
        }
      `}} />
    </div>
  );
}

