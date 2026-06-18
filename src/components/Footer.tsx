import { Heart, Globe2, Mail, User } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-white/10 bg-linear-to-b from-transparent to-slate-50 dark:to-slate-950/20 py-8 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Author details - perfectly visible */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Manas Ippalpalli</span>
            <a 
              href="mailto:manasippalpalli758@gmail.com" 
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-500 transition-colors"
            >
              manasippalpalli758@gmail.com
            </a>
          </div>
        </div>

        {/* Center message */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 dark:text-slate-500">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>for Developers Worldwide</span>
        </div>

        {/* Target CTA button with exact label requirement */}
        <div className="shrink-0 flex items-center gap-6">
          <div className="text-right hidden md:block">
            <span className="block text-[10px] uppercase tracking-widest text-slate-600 mb-1">Platform Status</span>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-500 uppercase font-bold">Systems Operational</span>
            </div>
          </div>
          
          <a
            id="digital-heroes-cta"
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest text-white bg-linear-to-r from-sky-600 to-indigo-650 hover:from-sky-500 hover:to-indigo-500 shadow-lg shadow-sky-500/20 transition-all duration-300 transform scale-100 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Globe2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Built for Digital Heroes</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </a>
        </div>

      </div>
    </footer>
  );
}
