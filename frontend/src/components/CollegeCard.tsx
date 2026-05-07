import Link from 'next/link';
import Image from 'next/image';
import { useCompare } from '@/context/CompareContext';
import { College } from '@/lib/api';
import { MapPin, IndianRupee, Star, ShieldCheck, Plus, Check, Heart, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CollegeCard({ college }: { college: College }) {
  const { selectedColleges, toggleCollege } = useCompare();
  const isSelected = selectedColleges.includes(college.id);

  // Map to local mock images based on ID in exact order
  const imageId = ((college.id - 1) % 5) + 1;
  const imageSrc = `/colleges/campus-${imageId}.png`;
  
  // Generating a dummy logo placeholder color
  const logoColors = ['bg-[#7C4DFF]', 'bg-[#5B5BFF]', 'bg-[#A855F7]', 'bg-rose-500', 'bg-emerald-500'];
  const logoColor = logoColors[college.id % logoColors.length];

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`group relative bg-[rgba(15,23,42,0.75)] backdrop-blur-2xl rounded-3xl p-3 transition-all duration-500 overflow-hidden flex flex-col h-full
      ${isSelected 
        ? 'shadow-[0_0_30px_rgba(124,77,255,0.3)] ring-2 ring-[#7C4DFF] border-transparent' 
        : 'border border-white/[0.08] hover:shadow-[0_0_40px_rgba(91,91,255,0.15)] hover:border-[#5B5BFF]/40'}`
    }>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C4DFF]/0 via-[#5B5BFF]/0 to-[#A855F7]/0 group-hover:from-[#7C4DFF]/5 group-hover:via-[#5B5BFF]/5 group-hover:to-[#A855F7]/5 transition-all duration-500 pointer-events-none" />

      {/* Premium Cover Image Area */}
      <div className="h-48 w-full rounded-[1.25rem] relative overflow-hidden bg-[#050816] flex-shrink-0 border border-white/5">
        <Image 
          src={imageSrc} 
          alt={`${college.name} campus`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
        />
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-black/40 pointer-events-none" />
        
        {/* Wishlist Heart */}
        <button className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white/70 hover:text-rose-400 hover:bg-black/60 transition-colors z-10">
          <Heart className="w-4 h-4" />
        </button>

        {/* Rating pill */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center border border-white/10 shadow-lg z-10">
          <Star className="text-amber-400 w-3.5 h-3.5 mr-1.5 fill-amber-400" />
          {college.rating.toFixed(1)}
        </div>

      </div>
      
      <div className="px-5 pt-6 pb-4 flex-1 flex flex-col relative z-10">
        <Link href={`/colleges/${college.id}`}>
          <h3 className="font-outfit font-bold text-xl text-white leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7C4DFF] group-hover:to-[#5B5BFF] transition-all duration-300 line-clamp-2">
            {college.name}
          </h3>
        </Link>
        
        <div className="flex items-center text-slate-400 mt-2 text-sm font-medium">
          <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0 text-[#A855F7]" />
          <span className="truncate">{college.location}</span>
        </div>
        
        <div className="mt-6 flex gap-3 flex-1">
          <div className="flex-1 bg-[rgba(15,23,42,0.5)] rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Yearly Fees</p>
            <div className="flex items-center text-slate-200 font-extrabold font-outfit text-lg tracking-tight">
              <IndianRupee className="w-4 h-4 mr-0.5 text-emerald-400" />
              {(college.fees/100000).toFixed(2)}L
            </div>
          </div>
          <div className="flex-1 bg-[rgba(15,23,42,0.5)] rounded-2xl p-3 border border-white/5 group-hover:border-white/10 transition-colors">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Placements</p>
            <div className="flex items-center text-slate-200 font-extrabold font-outfit text-lg tracking-tight">
              <ShieldCheck className="w-4 h-4 mr-1 text-[#5B5BFF]" />
              {college.placement}%
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex gap-3">
          <Link href={`/colleges/${college.id}`} className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-transparent border border-white/20 hover:bg-white/5 transition-all duration-300 transform active:scale-95 group/btn">
            Explore <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
          <button 
            onClick={() => toggleCollege(college.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 transform active:scale-95 ${
              isSelected 
                ? 'bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] text-white shadow-[0_0_20px_rgba(124,77,255,0.5)]' 
                : 'bg-gradient-to-r from-[#7C4DFF]/80 to-[#5B5BFF]/80 hover:from-[#7C4DFF] hover:to-[#5B5BFF] text-white shadow-[0_0_15px_rgba(124,77,255,0.3)] hover:shadow-[0_0_25px_rgba(124,77,255,0.6)]'
            }`}
          >
            {isSelected ? <Check className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
            {isSelected ? 'Added' : 'Compare'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
