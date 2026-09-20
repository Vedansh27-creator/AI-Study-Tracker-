import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Clock,
  Settings,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  CalendarCheck,
  ChevronDown,
  Info,
  Mail,
  FileText,
} from 'lucide-react';
import { PageType } from '../types.ts';
import { soundService } from '../utils/audio.ts';
import { Footer } from './Footer.tsx';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  remainingTaskCount: number;
  totalTaskCount: number;
  taskCount?: number;
  examCount?: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  remainingTaskCount,
  totalTaskCount,
  taskCount,
  examCount = 0,
}) => {
  const remaining = remainingTaskCount ?? taskCount ?? 0;
  const total = totalTaskCount ?? taskCount ?? 0;

  const handleNavClick = (page: PageType) => {
    soundService.playSoftClick();
    onNavigate(page);
  };

  return (
    <div
      id="homepage-container"
      className="min-h-screen w-full flex flex-col items-center justify-start"
    >
      {/* Primary Hero & Main Action Buttons: Dedicated viewport section */}
      <section
        id="homepage-hero-section"
        className="w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 py-4 sm:py-6 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-md mx-auto flex flex-col items-center text-center my-auto"
        >
        {/* Subtle, calming header */}
        <div className="mb-3 sm:mb-4 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-900/40 border border-blue-700/30 text-blue-300 mb-2 sm:mb-2.5 shadow-inner">
            <BookOpen className="w-5 h-5 text-blue-300" />
          </div>
          <h1
            id="homepage-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1"
          >
            AI Study Tracker
          </h1>
          <p
            id="homepage-subtitle"
            className="text-xs sm:text-sm text-slate-300/80 max-w-xs sm:max-w-sm leading-normal"
          >
            A calm, cozy space for mindful focus and daily study progress.
          </p>
        </div>

        {/* Navigation buttons arranged vertically */}
        <div
          id="homepage-navigation-buttons"
          className="w-full flex flex-col space-y-2 sm:space-y-2.5"
        >
          {/* 1. Tasks List */}
          <motion.button
            id="btn-nav-tasks-list"
            onClick={() => handleNavClick('tasks')}
            whileHover={{ scale: 1.012, y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
            className="w-full min-h-[3.75rem] sm:min-h-[4.25rem] px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#18243e] hover:bg-[#203054] text-left border border-blue-800/40 hover:border-blue-500/50 shadow-md shadow-black/20 flex items-center justify-between group transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            aria-label="Navigate to Tasks List"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-950/70 border border-sky-700/40 flex items-center justify-center text-sky-300 group-hover:text-sky-200 group-hover:border-sky-500/50 transition-colors">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-blue-100 transition-colors truncate">
                  Tasks List
                </span>
                <span className="text-xs text-slate-300/75 truncate">
                  {total === 0
                    ? 'Manage your study tasks'
                    : remaining === 0
                    ? 'All tasks completed!'
                    : `${remaining} task${remaining === 1 ? '' : 's'} remaining`}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600/60 transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.button>

          {/* 2. Exam Tracker (Right below Today's Tasks) */}
          <motion.button
            id="btn-nav-exam-tracker"
            onClick={() => handleNavClick('exams')}
            whileHover={{ scale: 1.012, y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
            className="w-full min-h-[3.75rem] sm:min-h-[4.25rem] px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#18243e] hover:bg-[#203054] text-left border border-blue-800/40 hover:border-amber-500/50 shadow-md shadow-black/20 flex items-center justify-between group transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label="Navigate to Exam Tracker"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-950/70 border border-amber-700/40 flex items-center justify-center text-amber-300 group-hover:text-amber-200 group-hover:border-amber-500/50 transition-colors">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-amber-100 transition-colors truncate">
                  Exam Tracker
                </span>
                <span className="text-xs text-slate-300/75 truncate">
                  {examCount > 0 ? `${examCount} exam${examCount > 1 ? 's' : ''} scheduled` : 'Countdowns & chapter revision'}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-amber-600/60 transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.button>

          {/* 3. Stopwatch/Timer */}
          <motion.button
            id="btn-nav-stopwatch-timer"
            onClick={() => handleNavClick('timer')}
            whileHover={{ scale: 1.012, y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
            className="w-full min-h-[3.75rem] sm:min-h-[4.25rem] px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#18243e] hover:bg-[#203054] text-left border border-blue-800/40 hover:border-indigo-500/50 shadow-md shadow-black/20 flex items-center justify-between group transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            aria-label="Navigate to Stopwatch and Timer"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-950/70 border border-indigo-700/40 flex items-center justify-center text-indigo-300 group-hover:text-indigo-200 group-hover:border-indigo-500/50 transition-colors">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-indigo-100 transition-colors truncate">
                  Stopwatch/Timer
                </span>
                <span className="text-xs text-slate-300/75 truncate">
                  Focus sessions & countdown timer
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600/60 transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.button>

          {/* 4. Configure */}
          <motion.button
            id="btn-nav-configure"
            onClick={() => handleNavClick('configure')}
            whileHover={{ scale: 1.012, y: -1 }}
            whileTap={{ scale: 0.985 }}
            transition={{ duration: 0.15 }}
            className="w-full min-h-[3.75rem] sm:min-h-[4.25rem] px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-[#18243e] hover:bg-[#203054] text-left border border-blue-800/40 hover:border-blue-500/50 shadow-md shadow-black/20 flex items-center justify-between group transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            aria-label="Navigate to Configure"
          >
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 pr-2">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-950/70 border border-blue-700/40 flex items-center justify-center text-blue-300 group-hover:text-blue-200 group-hover:border-blue-500/50 transition-colors">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-base sm:text-lg font-semibold text-white tracking-tight group-hover:text-blue-100 transition-colors truncate">
                  Configure
                </span>
                <span className="text-xs text-slate-300/75 truncate">
                  Timer intervals, sounds & preferences
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-900/30 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-blue-600/60 transition-all duration-200">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </motion.button>
        </div>

        {/* Secondary Links: About Us, Contact Us, Privacy Policy, Terms of Use (All visible together on homepage) */}
        <div
          id="homepage-secondary-links-card"
          className="w-full mt-3 sm:mt-4 pt-3 border-t border-blue-900/40"
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Information &amp; Legal</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500">Quick Access</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
            {/* 1. About Us */}
            <motion.button
              id="btn-home-link-about"
              onClick={() => handleNavClick('about')}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 sm:p-2.5 rounded-xl bg-[#152037]/75 hover:bg-[#1d2d4f] border border-blue-900/40 hover:border-sky-500/50 text-left flex items-center gap-2 group transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400/40 min-h-[42px]"
              aria-label="Navigate to About Us"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-sky-950/80 border border-sky-700/40 flex items-center justify-center text-sky-300 group-hover:text-sky-200 group-hover:border-sky-400/50 flex-shrink-0 transition-colors">
                <Info className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                  About Us
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate hidden sm:block">
                  Mission &amp; story
                </div>
              </div>
            </motion.button>

            {/* 2. Contact Us */}
            <motion.button
              id="btn-home-link-contact"
              onClick={() => handleNavClick('contact')}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 sm:p-2.5 rounded-xl bg-[#152037]/75 hover:bg-[#1d2d4f] border border-blue-900/40 hover:border-amber-500/50 text-left flex items-center gap-2 group transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40 min-h-[42px]"
              aria-label="Navigate to Contact Us"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-amber-300 group-hover:text-amber-200 group-hover:border-amber-400/50 flex-shrink-0 transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                  Contact Us
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate hidden sm:block">
                  Help &amp; support
                </div>
              </div>
            </motion.button>

            {/* 3. Privacy Policy */}
            <motion.button
              id="btn-home-link-privacy"
              onClick={() => handleNavClick('privacy')}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 sm:p-2.5 rounded-xl bg-[#152037]/75 hover:bg-[#1d2d4f] border border-blue-900/40 hover:border-emerald-500/50 text-left flex items-center gap-2 group transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40 min-h-[42px]"
              aria-label="Navigate to Privacy Policy"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-emerald-300 group-hover:text-emerald-200 group-hover:border-emerald-400/50 flex-shrink-0 transition-colors">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                  Privacy Policy
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate hidden sm:block">
                  100% private
                </div>
              </div>
            </motion.button>

            {/* 4. Terms of Use */}
            <motion.button
              id="btn-home-link-terms"
              onClick={() => handleNavClick('terms')}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="p-2 sm:p-2.5 rounded-xl bg-[#152037]/75 hover:bg-[#1d2d4f] border border-blue-900/40 hover:border-purple-500/50 text-left flex items-center gap-2 group transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/40 min-h-[42px]"
              aria-label="Navigate to Terms and Conditions"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-purple-950/80 border border-purple-700/40 flex items-center justify-center text-purple-300 group-hover:text-purple-200 group-hover:border-purple-400/50 flex-shrink-0 transition-colors">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                  Terms of Use
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 truncate hidden sm:block">
                  Usage terms
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Subtle scroll cue to discover guide below */}
      <div className="pt-2 sm:pt-3 pb-1 text-center text-slate-400/70 text-[11px] flex flex-col items-center gap-1 select-none">
        <span>Scroll down for complete study guide &amp; FAQ</span>
        <ChevronDown className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
      </div>
    </section>

    {/* On-Page SEO Section: Comprehensive 600+ Word Guide - Pushed down cleanly after hero and quick links */}
    <div className="w-full px-4 sm:px-6 md:px-8 mt-12 sm:mt-20">
      <article
        id="seo-about-study-tracker"
        aria-label="About AI Study Tracker and Features"
        className="w-full max-w-3xl mx-auto pt-16 sm:pt-20 border-t border-blue-900/60 text-left"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Complete Study Companion</span>
        </div>

        <h2
          id="seo-heading-main"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4"
        >
          AI Study Tracker – The Ultimate Aesthetic Study Tracker &amp; Online Daily Study Tracker
        </h2>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300/90 font-normal">
          <p id="seo-p-intro">
            Welcome to <strong className="text-white font-semibold">AI Study Tracker</strong>, the
            ultimate <strong className="text-sky-300 font-semibold">free aesthetic study tracker</strong> and
            intelligent <strong className="text-sky-300 font-semibold">daily study tracker</strong> engineered
            to bring clarity, discipline, and calm to your academic life. Whether you are preparing
            for secondary school exams, challenging university finals, standardized admissions tests,
            or self-directed professional certifications, this{' '}
            <strong className="text-white font-medium">study tracker website</strong> provides all the
            essential productivity tools you need in one cohesive, beautifully designed workspace.
          </p>

          <h3
            id="seo-heading-why"
            className="text-lg sm:text-xl font-bold text-white pt-3"
          >
            Why Every Student Needs an AI Study Tracker
          </h3>
          <p id="seo-p-why">
            Modern education demands managing multiple subjects, extensive syllabi, and competing
            deadlines. Traditional paper planners easily get misplaced, while generic notes apps lack
            dedicated study tools. That is why having a specialized{' '}
            <strong className="text-white font-semibold">study tracker app</strong> is transformative.{' '}
            <strong className="text-sky-300 font-semibold">AI Study Tracker</strong> combines structured
            task management, chapter-by-chapter exam revision, and customized interval timers into an{' '}
            <strong className="text-sky-300 font-semibold">aesthetic study tracker</strong> that inspires
            consistent daily action. As a versatile{' '}
            <strong className="text-white font-semibold">study tracker online</strong>, it eliminates
            cognitive overload, allowing you to focus entirely on deep understanding, practice problem
            solving, and effective knowledge retention.
          </p>

          <h3
            id="seo-heading-features"
            className="text-lg sm:text-xl font-bold text-white pt-4 flex items-center gap-2"
          >
            <CalendarCheck className="w-5 h-5 text-sky-400 inline-block" />
            <span>Key Features of Our Free Study Tracker App</span>
          </h3>

          <div className="grid grid-cols-1 gap-4 pt-1">
            <div
              id="seo-card-feature-tasks"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>1. Intelligent Daily Study Tracker with Overdue Task Management</span>
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Effective studying starts with realistic day-to-day planning. With our{' '}
                <strong className="text-sky-300 font-semibold">daily study tracker</strong>, you can
                log assignments, reading sessions, and problem sets with estimated time allocations.
                Tasks are organized cleanly by subjects — including independent subjects like
                Mathematics and Computer Science, as well as grouped disciplines like Science (Physics,
                Chemistry, Biology), Social Science, English, and Hindi. Importantly, any incomplete
                task from yesterday or earlier dates is immediately identified in a dedicated Delayed
                and Pending section. This smart accountability mechanism ensures no revision topic,
                reading chapter, or homework deadline is ever forgotten.
              </p>
            </div>

            <div
              id="seo-card-feature-exams"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>2. Comprehensive Exam Tracker &amp; Chapter-Level Revision Tracking</span>
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Big examinations can feel daunting when approaching an entire textbook all at once.
                This <strong className="text-amber-300 font-semibold">study tracker app</strong> turns
                intimidating syllabi into bite-sized milestones. Create exam cards with live countdown
                timers, target grade metrics, and itemized chapter lists. Mark each chapter as you
                read, summarize, and review past exam questions. Watching your preparation progress
                percentage climb gives you genuine confidence heading into testing week.
              </p>
            </div>

            <div
              id="seo-card-feature-timer"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>3. Aesthetic Study Tracker with Ambient Focus Timer and Stopwatch</span>
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Time management is the cornerstone of academic success. Built right into this{' '}
                <strong className="text-indigo-300 font-semibold">aesthetic study tracker</strong> is an
                adaptable stopwatch and countdown focus timer. Whether you practice the Pomodoro
                technique (25-minute sprints with 5-minute pauses) or longer deep-work intervals, our
                calming audio cues and minimalist dark-mode visual interface keep distractions at bay.
                Long study sessions feel restful, centered, and deeply rewarding.
              </p>
            </div>

            <div
              id="seo-card-feature-free"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>4. 100% Free Study Tracker Website with Zero Paywalls</span>
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Quality educational utilities should be accessible to all students everywhere. That
                is why AI Study Tracker operates as a truly{' '}
                <strong className="text-emerald-300 font-semibold">free study tracker website</strong>.
                There are no paid tiers, no invasive advertising banners, and no tedious sign-up
                requirements. Your study tasks, exam countdowns, and sound preferences are stored
                securely on your device, giving you instant offline-ready access whenever you sit down
                to learn.
              </p>
            </div>
          </div>

          <h3
            id="seo-heading-faq"
            className="text-lg sm:text-xl font-bold text-white pt-4 flex items-center gap-2"
          >
            <HelpCircle className="w-5 h-5 text-blue-400 inline-block" />
            <span>Frequently Asked Questions &amp; Study Guide</span>
          </h3>

          <div className="space-y-4 pt-1">
            {/* FAQ 1: What is a study tracker? */}
            <div
              id="faq-what-is-study-tracker"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="font-bold text-white text-base sm:text-lg mb-2 flex items-start gap-2">
                <span className="text-sky-400 font-mono text-sm mt-0.5 font-semibold">Q.</span>
                <span>What is a study tracker?</span>
              </h4>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-5">
                A <strong className="text-sky-300 font-medium">study tracker</strong> is an academic productivity system designed to help students organize daily tasks, monitor syllabus completion, track exam countdowns, and manage focus sessions. By bringing assignments, chapter-by-chapter revision checklists, and timers into one centralized dashboard, a study tracker helps eliminate academic stress, reduce procrastination, and maintain consistent daily study habits.
              </p>
            </div>

            {/* FAQ 2: How to make a study tracker? */}
            <div
              id="faq-how-to-make-study-tracker"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="font-bold text-white text-base sm:text-lg mb-2 flex items-start gap-2">
                <span className="text-sky-400 font-mono text-sm mt-0.5 font-semibold">Q.</span>
                <span>How to make a study tracker?</span>
              </h4>
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed pl-5 space-y-2">
                <p>
                  To make an effective <strong className="text-sky-300 font-medium">study tracker</strong>, follow these essential structural steps:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-300/90">
                  <li>
                    <strong className="text-white">Outline Your Subjects &amp; Syllabus:</strong> Separate independent subjects (like Mathematics and Computer Science) from grouped sub-disciplines (Physics, Chemistry, Biology) and list every topic or chapter.
                  </li>
                  <li>
                    <strong className="text-white">Set Target Dates &amp; Countdowns:</strong> Record exam deadlines and create visible countdown targets to schedule pacing.
                  </li>
                  <li>
                    <strong className="text-white">Create a Daily Task System:</strong> Plan daily study blocks with realistic time allocations and priority tags.
                  </li>
                  <li>
                    <strong className="text-white">Implement an Overdue &amp; Delayed Mechanism:</strong> Ensure unfinished tasks carry forward automatically so nothing is forgotten.
                  </li>
                  <li>
                    <strong className="text-white">Integrate Focus Timers:</strong> Pair your tracker with an interval timer or stopwatch to log real study hours.
                  </li>
                </ol>
                <p className="pt-1 text-slate-300 text-xs sm:text-sm italic">
                  Tip: Rather than spending hours designing manual spreadsheets or paper charts, you can use <strong className="text-white not-italic">AI Study Tracker</strong> for a free, instant, and aesthetic study tracker setup with zero manual configuration.
                </p>
              </div>
            </div>

            {/* FAQ 3: How to use a study tracker? */}
            <div
              id="faq-how-to-use-study-tracker"
              className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40"
            >
              <h4 className="font-bold text-white text-base sm:text-lg mb-2 flex items-start gap-2">
                <span className="text-sky-400 font-mono text-sm mt-0.5 font-semibold">Q.</span>
                <span>How to use a study tracker?</span>
              </h4>
              <div className="text-slate-300 text-sm sm:text-base leading-relaxed pl-5 space-y-2">
                <p>
                  To get maximum results from your <strong className="text-sky-300 font-medium">study tracker online</strong>, integrate it into your daily study ritual:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 text-slate-300/90">
                  <li>
                    <strong className="text-white">Morning Check-In:</strong> Open your dashboard to review any pending or delayed tasks from yesterday before planning new ones.
                  </li>
                  <li>
                    <strong className="text-white">Set 3 to 5 Daily Priorities:</strong> Select your most impactful study goals for today and allocate estimated minutes.
                  </li>
                  <li>
                    <strong className="text-white">Time Your Focus Sessions:</strong> Start the built-in stopwatch or Pomodoro countdown timer to work in uninterrupted deep-work sprints.
                  </li>
                  <li>
                    <strong className="text-white">Update Exam &amp; Chapter Revision:</strong> As you finish topics, check off chapters in your Exam Tracker to watch your revision score climb.
                  </li>
                  <li>
                    <strong className="text-white">Evening Review:</strong> Mark completed tasks as finished to build positive visual momentum and set up tomorrow’s schedule smoothly.
                  </li>
                </ol>
              </div>
            </div>

            {/* Additional Helpful FAQs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl bg-[#18243e]/70 border border-blue-900/30">
                <h5 className="font-semibold text-white text-sm sm:text-base mb-1">
                  Is this study tracker online accessible on mobile devices?
                </h5>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Yes! You can install or add this{' '}
                  <strong className="text-sky-300">aesthetic study tracker</strong> directly to your phone
                  home screen as a progressive web app. It is lightweight, lightning-fast, and optimized
                  for touch screens of all sizes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#18243e]/70 border border-blue-900/30">
                <h5 className="font-semibold text-white text-sm sm:text-base mb-1">
                  How does a daily study tracker improve memory retention?
                </h5>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Spacing your study intervals across multiple days and breaking chapters into revision
                  passes leverages active recall and spaced repetition principles. By using our{' '}
                  <strong className="text-sky-300">free study tracker app</strong> daily, you reinforce
                  long-term memory while avoiding stressful last-minute cramming sessions.
                </p>
              </div>
            </div>
          </div>

          <h3
            id="seo-heading-productivity"
            className="text-lg sm:text-xl font-bold text-white pt-4"
          >
            How to Maximize Your Academic Productivity with AI Study Tracker
          </h3>
          <p id="seo-p-productivity">
            To unlock your highest potential with this{' '}
            <strong className="text-sky-300 font-semibold">ai study tracker</strong>, establish a
            simple morning check-in ritual. Open the{' '}
            <strong className="text-white font-semibold">study tracker online</strong> dashboard to
            review pending or delayed assignments. Schedule your top three priorities for today, set
            your focus duration, and begin your study session with the timer. As you wrap up your day,
            mark completed items to enjoy the satisfying visual reward of consistent daily progress.
          </p>

          <p
            id="seo-p-conclusion"
            className="pt-2 text-slate-300/85 italic border-t border-blue-900/20"
          >
            Transform your academic routine with{' '}
            <strong className="text-white font-medium not-italic">AI Study Tracker</strong> — the
            premier <strong className="text-sky-300 not-italic">daily study tracker</strong>,{' '}
            <strong className="text-sky-300 not-italic">aesthetic study tracker</strong>, and
            all-in-one <strong className="text-sky-300 not-italic">free study tracker app</strong>{' '}
            designed to help you study smarter, reduce stress, and achieve your academic dreams.
          </p>
        </div>
      </article>
      </div>

      {/* Reusable Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
