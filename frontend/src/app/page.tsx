"use client";

import { useState, useEffect } from 'react';
import { fetchColleges, College } from '@/lib/api';
import CollegeCard from '@/components/CollegeCard';
import { Search, MapPin, IndianRupee, Loader2, Info, Sparkles, Navigation, Users, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadColleges = async (s: string, l: string, f: string, p: number) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchColleges({ 
        search: s, 
        location: l, 
        maxFees: f ? Number(f) : undefined, 
        page: p 
      });
      setColleges(res.data);
      setTotalPages(res.meta.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch colleges. Are you sure the backend is running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadColleges(search, location, maxFees, page);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [search, location, maxFees, page]);

  return (
    <div className="pb-24">
      {/* Cinematic Hero Section */}
      <div className="relative pt-36 md:pt-44 pb-20 md:pb-28 flex flex-col items-center text-center -mt-32 bg-[#050816] overflow-hidden rounded-b-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] mb-20 border-b border-white/[0.05]">
        
        {/* Soft radial glow for Hero */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-[#7C4DFF]/15 to-[#5B5BFF]/10 rounded-full blur-[140px] mix-blend-screen" />
        </div>

        {/* Floating Side Cards Wrapper to contain within max-w-7xl safely */}
        <div className="absolute inset-0 max-w-7xl mx-auto w-full h-full pointer-events-none hidden lg:block">
          {/* Floating Side Card - Left */}
          <motion.div 
            initial={{ opacity: 0, x: -30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-[2%] xl:left-[5%] top-[35%] z-10"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-48 bg-[rgba(15,23,42,0.8)] backdrop-blur-2xl border border-white/[0.08] p-3 rounded-2xl shadow-[0_0_30px_rgba(124,77,255,0.15)] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#7C4DFF]/20 flex items-center justify-center border border-[#7C4DFF]/30">
                <Trophy className="w-5 h-5 text-[#7C4DFF]" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-bold leading-tight">Top Colleges</p>
                <p className="text-slate-400 text-[11px] uppercase tracking-wider">Ranked #1</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Side Card - Right */}
          <motion.div 
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute right-[2%] xl:right-[5%] top-[25%] z-10"
          >
            <motion.div 
              animate={{ y: [0, 12, 0] }} 
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-56 bg-[rgba(15,23,42,0.8)] backdrop-blur-2xl border border-white/[0.08] p-3 rounded-2xl shadow-[0_0_30px_rgba(124,77,255,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#5B5BFF]/20 blur-[40px] pointer-events-none" />
              <div className="w-full h-20 rounded-xl overflow-hidden relative mb-2 border border-white/5">
                <Image src="/colleges/campus-2.png" alt="Campus Building" fill sizes="256px" priority className="object-cover opacity-80" />
              </div>
              <div className="bg-gradient-to-r from-[#7C4DFF]/20 to-[#5B5BFF]/20 rounded-lg py-1.5 text-center border border-[#7C4DFF]/30">
                <span className="text-[#A855F7] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Find Your Match
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 flex flex-col items-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#7C4DFF]/10 border border-[#7C4DFF]/30 rounded-full text-[#A855F7] font-medium text-xs mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(124,77,255,0.2)]">
            <span>🚀</span>
            <span className="tracking-widest uppercase font-bold text-white">The #1 platform for discovery</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
            Discover your future.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#7C4DFF] to-[#5B5BFF] drop-shadow-[0_0_15px_rgba(124,77,255,0.3)] block mt-2">
              Compare the best.
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-slate-300 max-w-xl font-light leading-relaxed mx-auto">
            Unlock your potential by exploring top-tier institutions. Filter by location, fees, and real student reviews to find your perfect match.
          </p>
        </motion.div>

        {/* Floating Glass Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto mt-16 px-4 relative z-30"
        >
          <div className="bg-[rgba(15,23,42,0.65)] backdrop-blur-3xl border border-white/[0.08] p-2 md:p-3 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-2 md:gap-3 group hover:border-[#7C4DFF]/30 transition-all duration-500">
            <div className="relative flex-1 flex items-center bg-[#050816]/60 rounded-[1.5rem] border border-white/5 hover:border-[#7C4DFF]/50 transition-colors focus-within:ring-2 focus-within:ring-[#7C4DFF]/50 focus-within:border-[#7C4DFF] focus-within:bg-[rgba(15,23,42,0.95)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <Search className="absolute left-4 md:left-5 w-5 h-5 text-slate-400 group-focus-within:text-[#A855F7] transition-colors" />
              <input 
                type="text" 
                placeholder="Search universities..." 
                className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-transparent outline-none text-white placeholder:text-slate-500 font-medium text-base md:text-lg"
                value={search}
                onChange={(e) => {setSearch(e.target.value); setPage(1);}}
              />
            </div>
            
            <div className="relative md:w-56 flex items-center bg-[#050816]/60 rounded-[1.5rem] border border-white/5 hover:border-[#7C4DFF]/50 transition-colors focus-within:ring-2 focus-within:ring-[#7C4DFF]/50 focus-within:border-[#7C4DFF] focus-within:bg-[rgba(15,23,42,0.95)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <Navigation className="absolute left-4 md:left-5 w-5 h-5 text-slate-400 group-focus-within:text-[#A855F7] transition-colors" />
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-transparent outline-none text-white placeholder:text-slate-500 font-medium text-base md:text-lg"
                value={location}
                onChange={(e) => {setLocation(e.target.value); setPage(1);}}
              />
            </div>

            <div className="relative md:w-48 flex items-center bg-[#050816]/60 rounded-[1.5rem] border border-white/5 hover:border-[#7C4DFF]/50 transition-colors focus-within:ring-2 focus-within:ring-[#7C4DFF]/50 focus-within:border-[#7C4DFF] focus-within:bg-[rgba(15,23,42,0.95)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <IndianRupee className="absolute left-4 md:left-5 w-5 h-5 text-slate-400 group-focus-within:text-[#A855F7] transition-colors" />
              <input 
                type="number" 
                placeholder="Max Fees" 
                className="w-full pl-12 md:pl-14 pr-4 md:pr-5 py-4 md:py-5 bg-transparent outline-none text-white placeholder:text-slate-500 font-medium text-base md:text-lg"
                value={maxFees}
                onChange={(e) => {setMaxFees(e.target.value); setPage(1);}}
              />
            </div>

            <button className="md:w-auto w-full px-8 py-4 md:py-5 rounded-[1.5rem] bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] text-white font-bold text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(124,77,255,0.4)] hover:shadow-[0_0_40px_rgba(124,77,255,0.7)] flex items-center justify-center gap-2 flex-shrink-0">
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6">
        {error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 text-red-400 p-6 rounded-3xl flex items-start gap-4 border border-red-500/20 max-w-2xl mx-auto shadow-[0_0_30px_rgba(239,68,68,0.1)] backdrop-blur-md"
          >
            <Info className="flex-shrink-0 mt-0.5 w-6 h-6" />
            <div>
              <h4 className="font-bold text-lg text-red-300">Connection Error</h4>
              <p className="mt-2 text-red-200/70">{error}</p>
            </div>
          </motion.div>
        ) : loading ? (
          <div className="py-32 flex flex-col justify-center items-center gap-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-[#7C4DFF] animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-t-2 border-[#5B5BFF] animate-spin opacity-70" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
              <div className="absolute inset-4 rounded-full border-t-2 border-[#A855F7] animate-spin opacity-40" style={{ animationDuration: '2s' }}></div>
            </div>
            <p className="text-[#7C4DFF] font-bold tracking-widest uppercase text-sm animate-pulse">Loading Institutions...</p>
          </div>
        ) : colleges.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-24 text-center bg-[rgba(15,23,42,0.5)] rounded-[3rem] border border-white/[0.08] backdrop-blur-xl max-w-3xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            <div className="w-24 h-24 bg-[#050816]/80 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/5 shadow-inner">
              <Search className="w-10 h-10 text-slate-500" />
            </div>
            <h3 className="text-white font-outfit font-bold text-3xl">No institutions found</h3>
            <p className="text-slate-400 mt-4 text-lg max-w-md mx-auto">We couldn't find any matches. Try adjusting your filters or searching for something else.</p>
            <button 
              onClick={() => {setSearch(''); setLocation(''); setMaxFees(''); setPage(1)}}
              className="mt-8 px-8 py-4 bg-[rgba(15,23,42,0.8)] text-white font-bold rounded-full hover:bg-[#7C4DFF]/20 hover:border-[#7C4DFF]/50 transition-all active:scale-95 border border-white/10"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <div className="space-y-16">
            <div className="flex items-center justify-between mb-8 border-b border-white/[0.08] pb-6">
              <h2 className="text-2xl font-bold text-white font-outfit">Recommended <span className="text-[#A855F7] font-light">for you</span></h2>
              <p className="text-slate-400 font-medium">Showing {colleges.length} results</p>
            </div>
            
            {/* Horizontal-styled premium grid */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
            >
              <AnimatePresence>
                {colleges.map((college) => (
                  <motion.div 
                    key={college.id}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    layout
                  >
                    <CollegeCard college={college} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-12 flex justify-center items-center gap-4 max-w-md mx-auto"
              >
                <button 
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-[rgba(15,23,42,0.7)] text-white backdrop-blur-xl shadow-lg hover:bg-[rgba(15,23,42,1)] hover:border-[#7C4DFF]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
                >
                  <svg className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="flex items-center px-8 py-4 bg-[rgba(15,23,42,0.7)] backdrop-blur-xl rounded-full font-bold font-outfit text-white shadow-lg border border-white/10 text-lg">
                  {page} <span className="text-slate-500 mx-3 font-normal">/</span> {totalPages}
                </div>
                <button 
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-[rgba(15,23,42,0.7)] text-white backdrop-blur-xl shadow-lg hover:bg-[rgba(15,23,42,1)] hover:border-[#7C4DFF]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
                >
                  <svg className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
