import React from 'react';
import { HeaderNav } from './HeaderNav.tsx';
import { PageType } from '../types.ts';
import {
  BookOpen,
  Sparkles,
  Heart,
  Target,
  Clock,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';

interface AboutUsPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-us-page" className="min-h-screen pb-16">
      <HeaderNav
        currentPage="about"
        onNavigate={onNavigate}
        title="About Us"
        subtitle="Empowering students worldwide through thoughtful design"
        badge="Our Mission"
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        {/* Story Hero */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#162544] via-[#131d33] to-[#101728] border border-blue-800/40 space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Built by Students, for Students</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Studying Doesn't Have to Be Chaotic or Stressful
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            <strong className="text-white">AI Study Tracker</strong> was born out of a simple observation: modern digital study tools are either cluttered with intrusive advertisements, trapped behind expensive subscription tiers, or buried in bloated corporate project-management software.
          </p>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            We wanted something different: a <span className="text-sky-300 font-medium">calm, aesthetic, distraction-free companion</span> that makes daily task management, chapter-level syllabus tracking, and focused interval study feel effortless and rewarding.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Uncompromising Privacy</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              No account creation, no password fatigue, and zero corporate data harvesting. Your notes and exam milestones stay 100% on your device.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Aesthetic &amp; Cozy</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Crafted with balanced contrast, dark midnight hues, and gentle acoustic feedback to soothe exam anxiety and foster deep cognitive immersion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Zero Paywalls, Always Free</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Every feature—from countdown tracking to independent subject segregation and Pomodoro focus timers—is permanently free for learners worldwide.
            </p>
          </div>
        </div>

        {/* What Powers Our Features */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-400" />
            <span>Designed for Every Academic Journey</span>
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether preparing for high school finals, medical or engineering entrance exams, university dissertations, or coding bootcamps, AI Study Tracker provides the structured rhythm needed to succeed:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#11192e] border border-blue-900/50 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <BookOpen className="w-4 h-4 text-sky-300" />
                <span>Tasks &amp; Overdue Logic</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Prevents missed tasks from getting lost with automatic delayed task tagging and clear date labels.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11192e] border border-blue-900/50 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Exam Milestone Tracker</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Visual countdowns and chapter revision checklists that transform overwhelming syllabi into clear milestones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11192e] border border-blue-900/50 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Clock className="w-4 h-4 text-indigo-300" />
                <span>Deep Focus Stopwatch</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Built-in interval timers with subtle chimes keep you in the zone without distracting digital notifications.
              </p>
            </div>
          </div>
        </section>

        {/* CTA to start */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Ready to begin your study session?</h4>
            <p className="text-slate-400 text-xs sm:text-sm">
              Your next academic milestone starts with one focused chapter today.
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => onNavigate('tasks')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <span>View Tasks List</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-xl bg-[#1a2744] hover:bg-[#223359] text-slate-300 hover:text-white border border-blue-800/40 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
