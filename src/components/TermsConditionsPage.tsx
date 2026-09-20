import React from 'react';
import { HeaderNav } from './HeaderNav.tsx';
import { PageType } from '../types.ts';
import { FileText, CheckCircle2, AlertCircle, Scale, Shield, Mail, ArrowRight } from 'lucide-react';

interface TermsConditionsPageProps {
  onNavigate: (page: PageType) => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onNavigate }) => {
  return (
    <div id="terms-conditions-page" className="min-h-screen pb-16">
      <HeaderNav
        currentPage="terms"
        onNavigate={onNavigate}
        title="Terms & Conditions"
        subtitle="Fair, transparent terms for using AI Study Tracker"
        badge="Legal Agreement"
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        {/* Highlight Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-800/40 flex items-start gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/50 text-purple-300 flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Terms of Use &amp; Service Agreement
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              By accessing or using <strong className="text-purple-300">AI Study Tracker</strong> ("the Service"), you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please discontinue use of the application.
            </p>
          </div>
        </div>

        {/* Section 1: Acceptance & Free License */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">1. License &amp; Free Personal Use</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            AI Study Tracker is provided as a 100% free educational productivity platform. We grant you a worldwide, revocable, non-exclusive, non-transferable license to access and use the software for personal, academic, classroom, or educational purposes without payment or subscription fees.
          </p>
        </section>

        {/* Section 2: Acceptable Use */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">2. Acceptable Use Guidelines</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            When utilizing AI Study Tracker, you agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300/90 text-sm pl-2">
            <li>Engage in automated scraping, denial of service attacks, or malicious server overloading.</li>
            <li>Misrepresent the service as your own commercial product without proper attribution.</li>
            <li>Attempt to inject malicious scripts or exploit client-side storage mechanisms.</li>
          </ul>
        </section>

        {/* Section 3: Data Integrity & Local Storage Disclaimer */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">3. Local Storage &amp; Data Disclaimer</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Because AI Study Tracker operates on an offline-first, client-side architecture using your browser’s <code className="text-sky-300 bg-blue-950/60 px-2 py-0.5 rounded text-xs">localStorage</code>, we do not store backups on remote servers. You acknowledge that clearing your browser cookies/storage, using aggressive incognito sessions, or resetting device data may result in the deletion of your local study logs.
          </p>
        </section>

        {/* Section 4: Educational Purpose & Limitation of Liability */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">4. Educational Disclaimer &amp; Liability</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            AI Study Tracker is provided strictly on an "AS IS" and "AS AVAILABLE" basis. While we strive for absolute reliability in countdown timers, task notifications, and chapter calculations, the tool is meant to assist your personal study habits. We are not liable for missed academic deadlines, test outcomes, or device scheduling conflicts.
          </p>
        </section>

        {/* Section 5: Modifications */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-2">
          <h3 className="text-lg font-bold text-white">5. Changes to the Terms</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            We reserve the right to revise or replace these Terms at any time to reflect software updates or legal standards. Continued use of AI Study Tracker following any revisions indicates your acknowledgment and acceptance of the revised terms.
          </p>
        </section>

        {/* Section 6: Contact */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Legal or Terms Inquiries?</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Inquiries regarding these terms may be directed to <span className="text-purple-300">vedanshtejasvi2011@gmail.com</span>
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex-shrink-0"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>
    </div>
  );
};
