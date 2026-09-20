import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Home,
  BookOpen,
  GraduationCap,
  Clock,
  ArrowRight,
  Search,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { PageType } from '../types.ts';
import { HeaderNav } from './HeaderNav.tsx';
import { Footer } from './Footer.tsx';

interface NotFoundPageProps {
  onNavigate: (page: PageType) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div
      id="not-found-page-container"
      className="min-h-screen w-full flex flex-col items-center justify-between text-slate-100"
    >
      <HeaderNav
        currentPage="404"
        onNavigate={onNavigate}
        title="404 - Not Found"
        subtitle="The requested path could not be located"
      />

      <main
        id="not-found-main"
        className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center my-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          {/* Aesthetic 404 Visual Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-blue-900/60 to-[#14203b] border border-blue-600/40 flex items-center justify-center shadow-xl shadow-blue-950/50">
              <Compass className="w-12 h-12 text-sky-300 animate-spin-slow" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-blue-600 border border-blue-400 text-white text-xs font-bold uppercase tracking-wider shadow">
              404
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-sky-300 text-xs font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Page Not Located
          </span>

          <h1
            id="not-found-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
          >
            Study Session Not Found
          </h1>

          <p
            id="not-found-description"
            className="text-sm sm:text-base text-slate-300/85 max-w-lg leading-relaxed mb-8"
          >
            The link you followed might be broken, misspelled, or the page may have been moved.
            Don't worry — your stored tasks, study streaks, and exam countdowns are safe and sound!
          </p>

          {/* Primary Quick Return CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-10">
            <button
              id="not-found-return-home-btn"
              onClick={() => onNavigate('home')}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
            <button
              id="not-found-contact-btn"
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#1a2642] hover:bg-[#233358] border border-blue-800/40 text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <span>Need Help?</span>
            </button>
          </div>

          {/* Useful Destinations Card */}
          <div className="w-full rounded-2xl bg-[#142038]/70 border border-blue-900/40 p-5 text-left">
            <div className="flex items-center justify-between mb-3 border-b border-blue-900/30 pb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-blue-400" />
                Popular Study Destinations
              </span>
              <span className="text-xs text-slate-500">Quick Navigation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                id="not-found-nav-tasks"
                onClick={() => onNavigate('tasks')}
                className="p-3 rounded-xl bg-[#192745] hover:bg-[#203259] border border-blue-800/30 text-left flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <BookOpen className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                    Tasks List
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                id="not-found-nav-exams"
                onClick={() => onNavigate('exams')}
                className="p-3 rounded-xl bg-[#192745] hover:bg-[#203259] border border-blue-800/30 text-left flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <GraduationCap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                    Exam Tracker
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                id="not-found-nav-timer"
                onClick={() => onNavigate('timer')}
                className="p-3 rounded-xl bg-[#192745] hover:bg-[#203259] border border-blue-800/30 text-left flex items-center justify-between group transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                    Focus Timer
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
