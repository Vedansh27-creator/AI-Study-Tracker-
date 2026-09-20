import React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Settings,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  FileText,
  Info,
  Mail,
  Compass,
  AlertTriangle,
} from 'lucide-react';
import { PageType } from '../types.ts';

interface HeaderNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  title: string;
  subtitle?: string;
  badge?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentPage,
  onNavigate,
  title,
  subtitle,
  badge,
}) => {
  const getIcon = () => {
    switch (currentPage) {
      case 'tasks':
        return <BookOpen className="w-5 h-5 text-sky-300" />;
      case 'exams':
        return <GraduationCap className="w-5 h-5 text-amber-300" />;
      case 'timer':
        return <Clock className="w-5 h-5 text-indigo-300" />;
      case 'configure':
        return <Settings className="w-5 h-5 text-blue-300" />;
      case 'privacy':
        return <ShieldCheck className="w-5 h-5 text-emerald-300" />;
      case 'terms':
        return <FileText className="w-5 h-5 text-purple-300" />;
      case 'about':
        return <Info className="w-5 h-5 text-sky-300" />;
      case 'contact':
        return <Mail className="w-5 h-5 text-amber-300" />;
      case '404':
        return <Compass className="w-5 h-5 text-sky-300" />;
      case '500':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-300" />;
    }
  };

  return (
    <header className="w-full max-w-4xl mx-auto pt-4 pb-3 sm:pt-8 sm:pb-6 px-3 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-blue-900/40 pb-4 sm:pb-5">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            id="nav-back-to-home-btn"
            onClick={() => onNavigate('home')}
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 sm:py-2 min-h-[40px] sm:min-h-[38px] rounded-xl bg-[#16223d] hover:bg-[#1e2f54] text-slate-300 hover:text-white border border-blue-800/40 transition-all duration-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400/40 cursor-pointer shadow-sm flex-shrink-0"
            aria-label="Return to Main Menu"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Main Menu</span>
          </button>

          <div className="h-4 w-px bg-blue-900/60 hidden sm:block flex-shrink-0" />

          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <div className="p-1.5 rounded-lg bg-blue-950/60 border border-blue-800/30 flex-shrink-0">
              {getIcon()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h1 className="text-lg sm:text-2xl font-semibold text-white tracking-tight truncate">
                  {title}
                </h1>
                {badge && (
                  <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-900/60 border border-blue-700/40 text-blue-200 font-medium whitespace-nowrap">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-[11px] sm:text-sm text-slate-400 mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick link shortcuts for seamless navigation between secondary pages - touch horizontal scrollable on mobile */}
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-1 bg-[#131e36] p-1 rounded-xl border border-blue-900/50 self-stretch sm:self-center">
          <button
            id="nav-to-tasks-btn"
            onClick={() => onNavigate('tasks')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1.5 min-h-[36px] sm:min-h-0 whitespace-nowrap rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
              currentPage === 'tasks'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2949]'
            }`}
          >
            Tasks
          </button>
          <button
            id="nav-to-exams-btn"
            onClick={() => onNavigate('exams')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1.5 min-h-[36px] sm:min-h-0 whitespace-nowrap rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
              currentPage === 'exams'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2949]'
            }`}
          >
            Exams
          </button>
          <button
            id="nav-to-timer-btn"
            onClick={() => onNavigate('timer')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1.5 min-h-[36px] sm:min-h-0 whitespace-nowrap rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
              currentPage === 'timer'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2949]'
            }`}
          >
            Timer
          </button>
          <button
            id="nav-to-configure-btn"
            onClick={() => onNavigate('configure')}
            className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 sm:py-1.5 min-h-[36px] sm:min-h-0 whitespace-nowrap rounded-lg text-xs font-medium transition-colors cursor-pointer text-center ${
              currentPage === 'configure'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2949]'
            }`}
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
};
