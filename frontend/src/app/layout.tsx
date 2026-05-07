import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { CompareProvider } from '@/context/CompareContext';
import CompareBar from '@/components/CompareBar';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Collegegrade | Premium College Discovery',
  description: 'Search, explore, and compare top-tier colleges with a world-class platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-[#050816] font-sans text-slate-100 min-h-screen pb-20 selection:bg-[#7C4DFF]/30 relative">
        
        {/* Global Floating Particles / Stars (CSS-based) */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white rounded-full opacity-40 shadow-[0_0_10px_#fff] animate-pulse" />
          <div className="absolute top-[25%] right-[20%] w-1.5 h-1.5 bg-[#7C4DFF] rounded-full opacity-50 shadow-[0_0_15px_#7C4DFF] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[20%] left-[30%] w-2 h-2 bg-[#5B5BFF] rounded-full opacity-30 shadow-[0_0_20px_#5B5BFF] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[60%] right-[10%] w-1 h-1 bg-white rounded-full opacity-30 shadow-[0_0_10px_#fff] animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <CompareProvider>
          
          <nav className="fixed w-full top-0 z-50 bg-[#050816]/60 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              <Link href="/" className="flex items-center gap-3 group relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C4DFF] to-[#5B5BFF] flex items-center justify-center text-white font-outfit font-black text-xl shadow-[0_0_20px_rgba(124,77,255,0.6)] group-hover:shadow-[0_0_30px_rgba(124,77,255,0.9)] group-hover:scale-105 transition-all duration-300">
                  C
                </div>
                <span className="text-2xl font-outfit font-extrabold tracking-tight text-white">
                  Collegegrade
                </span>
              </Link>
              
           <div className="hidden md:flex space-x-6 items-center relative z-10">
                <Link href="/" className="font-medium text-slate-300 hover:text-white transition-colors">
                  Discover
                </Link>
                <Link href="/compare" className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#5B5BFF] text-white font-bold flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(124,77,255,0.4)] hover:shadow-[0_0_35px_rgba(124,77,255,0.7)]">
                  <Sparkles className="w-4 h-4 text-white/80 group-hover:text-white" />
                  Compare Now
                  <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover:border-white/40 transition-colors" />
                </Link>
              </div>
              
            </div>
          </nav>

          {/* Decorative background blurs / mesh */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90%] h-[600px] bg-[#7C4DFF]/15 blur-[180px] rounded-[100%] pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#5B5BFF]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#A855F7]/10 blur-[150px] rounded-full pointer-events-none" />
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 relative z-10">
            {children}
          </main>
          
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}

