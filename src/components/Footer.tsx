import React from 'react';
import { PageType } from '../types.ts';
import { BookOpen, ShieldCheck, FileText, Info, Mail, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="site-global-footer"
      className="w-full border-t border-blue-900/40 bg-[#0c1322]/80 mt-16 pt-10 pb-12 px-4 sm:px-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Brand summary */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 max-w-sm">
          <div className="flex items-center gap-2 text-white font-bold text-base tracking-tight">
            <div className="p-1.5 rounded-lg bg-blue-900/40 border border-blue-700/40 text-blue-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <span>AI Study Tracker</span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            The free, aesthetic online daily study tracker app. Organize tasks, track exam syllabus countdowns, and master deep focus.
          </p>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onNavigate('about')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Contact Us</span>
          </button>

          <button
            onClick={() => onNavigate('privacy')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => onNavigate('terms')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Terms &amp; Conditions</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 pt-6 border-t border-blue-900/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} AI Study Tracker. Free &amp; Offline-First for Students.</p>
        <div className="flex items-center gap-1 text-slate-400">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>Crafted for focused, mindful learning</span>
        </div>
      </div>
    </footer>
  );
};
