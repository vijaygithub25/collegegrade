"use client";

import { useEffect, useState, use } from 'react';
import { fetchCollegeById, College } from '@/lib/api';
import { CheckCircle, MapPin, IndianRupee, Star, ShieldCheck, ArrowLeft, Loader2, BookOpen, Layers } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CollegePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { selectedColleges, toggleCollege } = useCompare();

  useEffect(() => {
    fetchCollegeById(Number(resolvedParams.id))
      .then(data => setCollege(data))
      .catch(err => setError('College not found.'))
      .finally(() => setLoading(false));
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-t-2 border-[#7C4DFF] animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-[#5B5BFF] animate-spin opacity-70" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
        <p className="text-[#A855F7] font-bold tracking-widest uppercase text-sm animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  if (error || !college) {
    return (
      <div className="text-center py-20 bg-[rgba(15,23,42,0.6)] backdrop-blur-2xl rounded-3xl border border-white/[0.08] mt-10">
        <h2 className="text-2xl font-bold text-white">{error || 'College not found'}</h2>
        <Link href="/" className="text-[#7C4DFF] mt-4 inline-flex items-center hover:text-[#5B5BFF] transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to discovery
        </Link>
      </div>
    );
  }

  const isSelected = selectedColleges.includes(college.id);
  
  // Use same logic for image and logo colors as CollegeCard
  const imageId = ((college.id - 1) % 5) + 1;
  const imageSrc = `/colleges/campus-${imageId}.png`;
  const logoColors = ['bg-[#7C4DFF]', 'bg-[#5B5BFF]', 'bg-[#A855F7]', 'bg-rose-500', 'bg-emerald-500'];
  const logoColor = logoColors[college.id % logoColors.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-8 pb-20"
    >
      <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors bg-[rgba(15,23,42,0.5)] px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm text-sm font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to explore
      </Link>
      
      {/* Header section */}
      <div className="bg-[rgba(15,23,42,0.6)] backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/[0.08]">
        <div className="h-64 md:h-80 relative overflow-hidden bg-[#050816]">
          <Image 
            src={imageSrc}
            alt={`${college.name} campus`}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,42,1)] via-[rgba(15,23,42,0.2)] to-transparent pointer-events-none" />
          
          <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-white flex items-center border border-white/10 shadow-lg">
            <Star className="text-amber-400 w-4 h-4 mr-2 fill-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
            {college.rating.toFixed(1)} / 5.0
          </div>
        </div>
        
        <div className="px-6 md:px-12 pb-10 relative">
          <div className={`w-28 h-28 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 absolute -top-14 left-6 md:left-12 flex items-center justify-center text-5xl font-black text-white ${logoColor} z-10`}>
            {college.name.substring(0, 1)}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pt-20 md:pt-4 md:pl-36 gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight font-outfit">{college.name}</h1>
              <div className="flex items-center gap-4 mt-3 text-slate-400 flex-wrap font-medium">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5 text-[#A855F7]" /> {college.location}</span>
                <span className="flex items-center text-slate-300"><ShieldCheck className="w-4 h-4 mr-1.5 text-[#5B5BFF]" /> {college.placement}% Placement</span>
              </div>
            </div>
            
            <button 
              onClick={() => toggleCollege(college.id)}
              className={`px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all flex items-center flex-shrink-0 active:scale-95 ${
                isSelected 
                  ? 'bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] text-white shadow-[0_0_20px_rgba(124,77,255,0.4)] border border-[#7C4DFF]/50' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {isSelected ? (
                <><CheckCircle className="w-5 h-5 mr-2" /> Added to Compare</>
              ) : (
                <><Layers className="w-5 h-5 mr-2" /> Compare Institution</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-[rgba(15,23,42,0.6)] p-8 rounded-[2rem] shadow-xl border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7C4DFF]/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h2 className="text-xl font-bold text-white mb-6 flex items-center relative z-10"><BookOpen className="w-5 h-5 mr-3 text-[#A855F7]" /> Academic Programs</h2>
            {college.courses && college.courses.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {college.courses.map(course => (
                  <li key={course.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center space-x-3 hover:border-[#7C4DFF]/30 transition-colors group">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#7C4DFF] to-[#5B5BFF] shadow-[0_0_8px_rgba(124,77,255,0.6)] group-hover:scale-125 transition-transform"></div>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{course.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic relative z-10">No programs currently listed for this institution.</p>
            )}
          </div>
          
          <div className="bg-[rgba(15,23,42,0.6)] p-8 rounded-[2rem] shadow-xl border border-white/[0.08] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#5B5BFF]/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h2 className="text-xl font-bold text-white mb-4 relative z-10">Institutional Overview</h2>
            <p className="text-slate-300 leading-relaxed font-light text-lg relative z-10">
              <strong className="text-white font-medium">{college.name}</strong> is a premier educational institution located in the heart of <span className="text-white font-medium">{college.location}</span>. 
              With a remarkable placement rate of <span className="text-[#5B5BFF] font-bold">{college.placement}%</span> and an overall student rating of <span className="text-amber-400 font-bold">{college.rating}/5.0</span>, 
              it is highly regarded for its distinguished faculty, state-of-the-art facilities, and strong industry connections ensuring exceptional career outcomes for graduates.
            </p>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-8">
          <div className="bg-[rgba(15,23,42,0.6)] p-8 rounded-[2rem] shadow-xl border border-white/[0.08] backdrop-blur-xl">
            <h2 className="text-lg font-bold text-white mb-6">Key Statistics</h2>
            <div className="space-y-4">
              <div className="flex flex-col p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]">
                <div className="flex items-center text-slate-400 mb-2">
                  <IndianRupee className="w-4 h-4 mr-2 text-emerald-400" /> 
                  <span className="text-sm font-bold uppercase tracking-wider">Annual Fees</span>
                </div>
                <div className="font-outfit font-black text-3xl text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                  ₹{(college.fees/100000).toFixed(2)}L
                </div>
              </div>
              
              <div className="flex flex-col p-5 rounded-2xl bg-[#5B5BFF]/10 border border-[#5B5BFF]/20 shadow-[inset_0_0_20px_rgba(91,91,255,0.05)]">
                <div className="flex items-center text-slate-400 mb-2">
                  <ShieldCheck className="w-4 h-4 mr-2 text-[#5B5BFF]" /> 
                  <span className="text-sm font-bold uppercase tracking-wider">Placement Rate</span>
                </div>
                <div className="font-outfit font-black text-3xl text-[#5B5BFF] drop-shadow-[0_0_8px_rgba(91,91,255,0.3)]">
                  {college.placement}%
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Contact / Actions Box */}
          <div className="bg-gradient-to-br from-[rgba(15,23,42,0.9)] to-black p-8 rounded-[2rem] shadow-2xl border border-[#7C4DFF]/20 backdrop-blur-xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C4DFF]/20 blur-[50px] rounded-full pointer-events-none" />
            <h3 className="text-white font-bold mb-2 relative z-10">Interested in {college.name}?</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">Add this to your comparison list to see how it stacks up against others.</p>
            <button 
              onClick={() => {
                if (!isSelected) toggleCollege(college.id);
              }}
              className="w-full py-3 rounded-xl bg-white text-[#050816] font-bold hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] relative z-10"
            >
              {isSelected ? 'Ready to Compare' : 'Add to List'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
