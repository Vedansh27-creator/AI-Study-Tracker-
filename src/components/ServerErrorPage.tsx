import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  RotateCcw,
  Home,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  ShieldAlert,
} from 'lucide-react';
import { PageType } from '../types.ts';
import { HeaderNav } from './HeaderNav.tsx';
import { Footer } from './Footer.tsx';

interface ServerErrorPageProps {
  onNavigate: (page: PageType) => void;
  error?: Error | null;
  resetErrorBoundary?: () => void;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  onNavigate,
  error,
  resetErrorBoundary,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const errorMessage = error?.message || 'An unexpected client runtime exception occurred.';
  const errorStack = error?.stack || 'No detailed stack trace available.';

  const handleCopyDiagnostics = () => {
    const diagnosticPayload = `[AI Study Tracker - Error Diagnostics]
Timestamp: ${new Date().toISOString()}
URL: ${window.location.href}
UserAgent: ${navigator.userAgent}
Error: ${errorMessage}
Stack:
${errorStack}`;

    navigator.clipboard.writeText(diagnosticPayload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReload = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    window.location.reload();
  };

  const handleSafeReturnHome = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    }
    onNavigate('home');
  };

  return (
    <div
      id="server-error-page-container"
      className="min-h-screen w-full flex flex-col items-center justify-between text-slate-100"
    >
      <HeaderNav
        currentPage="500"
        onNavigate={onNavigate}
        title="500 - System Error"
        subtitle="Unexpected application exception"
      />

      <main
        id="server-error-main"
        className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center my-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          {/* Aesthetic 500 Visual Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-rose-950/60 to-[#1e131d] border border-rose-600/40 flex items-center justify-center shadow-xl shadow-rose-950/50">
              <AlertTriangle className="w-12 h-12 text-rose-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-rose-600 border border-rose-400 text-white text-xs font-bold uppercase tracking-wider shadow">
              500
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-800/60 text-rose-300 text-xs font-medium mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            Internal State Exception
          </span>

          <h1
            id="server-error-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3"
          >
            Unexpected System Condition
          </h1>

          <p
            id="server-error-description"
            className="text-sm sm:text-base text-slate-300/85 max-w-lg leading-relaxed mb-8"
          >
            Our focus engine encountered an unexpected error while processing your session.
            Your local tasks and study countdowns are preserved in your browser's local storage.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-8">
            <button
              id="server-error-reload-btn"
              onClick={handleReload}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Application</span>
            </button>

            <button
              id="server-error-home-btn"
              onClick={handleSafeReturnHome}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#1a2642] hover:bg-[#233358] border border-blue-800/40 text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
          </div>

          {/* Diagnostic Info Box */}
          <div className="w-full rounded-2xl bg-[#131d30]/80 border border-blue-900/40 overflow-hidden text-left mb-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-blue-950/30 transition-colors cursor-pointer"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Technical Diagnostics</span>
                <span className="text-slate-500 font-normal">
                  ({showDetails ? 'Hide' : 'Click to inspect'})
                </span>
              </span>
              {showDetails ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showDetails && (
              <div className="p-5 pt-0 border-t border-blue-900/30 space-y-3">
                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs text-rose-300 font-mono font-medium truncate max-w-md">
                    {errorMessage}
                  </span>
                  <button
                    onClick={handleCopyDiagnostics}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-800/50 hover:bg-blue-900/50 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Details</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-xs text-slate-400 bg-[#0c1220] p-3 rounded-xl overflow-x-auto font-mono max-h-48 whitespace-pre-wrap leading-relaxed border border-blue-950">
                  {errorStack}
                </pre>
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Persistent issue? Reach out at</span>
            <a
              href="mailto:vedanshtejasvi2011@gmail.com?subject=AI%20Study%20Tracker%20500%20Error%20Report"
              className="text-sky-400 hover:text-sky-300 underline inline-flex items-center gap-1 font-medium"
            >
              <Mail className="w-3 h-3" />
              vedanshtejasvi2011@gmail.com
            </a>
          </div>
        </motion.div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
