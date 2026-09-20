import React from 'react';
import { HeaderNav } from './HeaderNav.tsx';
import { PageType } from '../types.ts';
import { ShieldCheck, HardDrive, EyeOff, Lock, RefreshCw, Mail, ArrowRight } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageType) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div id="privacy-policy-page" className="min-h-screen pb-16">
      <HeaderNav
        currentPage="privacy"
        onNavigate={onNavigate}
        title="Privacy Policy"
        subtitle="Transparent, offline-first, and zero tracking"
        badge="Last Updated: Sep 2026"
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        {/* Highlight Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-blue-950/40 border border-emerald-800/40 flex items-start gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white tracking-tight">
              100% Client-Side &amp; Private by Design
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              At <strong className="text-emerald-300">AI Study Tracker</strong>, we believe your study habits, personal tasks, exam schedules, and revision notes belong solely to you. All your data is stored exclusively in your browser’s local storage. We do not operate tracking servers or profile you.
            </p>
          </div>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <EyeOff className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">1. Information We Do Not Collect</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Unlike traditional study apps that demand account creation, passwords, phone numbers, and telemetry permissions, AI Study Tracker requires <strong className="text-white">no registration and no personal logins</strong>.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300/90 text-sm pl-2">
            <li>We do not record your IP address or geolocate your device.</li>
            <li>We do not place advertising tracking cookies or analytics pixels.</li>
            <li>We do not transmit your tasks, exam dates, or timer logs to external servers.</li>
          </ul>
        </section>

        {/* Section 2: Local Storage */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <HardDrive className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">2. How Your Data is Stored</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            AI Study Tracker uses the HTML5 <code className="text-sky-300 bg-blue-950/60 px-2 py-0.5 rounded text-xs">window.localStorage</code> API provided natively by your web browser. The following information is stored directly on your computer or mobile device:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#11192e] border border-blue-900/50">
              <h4 className="font-semibold text-white text-sm mb-1">Study Tasks</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Task titles, subjects, estimated durations, completion flags, and original scheduling dates.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#11192e] border border-blue-900/50">
              <h4 className="font-semibold text-white text-sm mb-1">Exam Schedules</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Subjects, target dates, total chapters, and revised chapter progress counters.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#11192e] border border-blue-900/50">
              <h4 className="font-semibold text-white text-sm mb-1">Preferences</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Background theme palette, timer durations, break times, chime sound toggles, and volume.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Data Deletion & Export */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">3. Your Control &amp; Data Erasure</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            You maintain full, perpetual ownership of your academic records. You can delete completed items or erase all stored study data instantly by opening the <strong className="text-white">Settings / Configure</strong> page and clicking <em className="text-amber-300 not-italic">"Clear All Tasks"</em>. Alternatively, clearing your browser’s cache and website storage permanently removes all entries immediately.
          </p>
        </section>

        {/* Section 4: Web Audio & Offline PWA */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">4. Web Audio &amp; Progressive Web App Usage</h3>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The timer audio alerts are synthesized on-the-fly using the native browser Web Audio API oscillator; no audio files are streamed from third parties. If you install AI Study Tracker as a PWA, all cached assets remain on your device so the application functions seamlessly offline.
          </p>
        </section>

        {/* Section 5: Children's Privacy */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-2">
          <h3 className="text-lg font-bold text-white">5. Children &amp; Student Privacy</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Because AI Study Tracker does not collect any personal identifying information, it is fully safe for students of all ages, including elementary, high school, university, and competitive exam aspirants.
          </p>
        </section>

        {/* Section 6: Contact for Privacy Questions */}
        <section className="p-6 rounded-2xl bg-[#152037] border border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Questions about our Privacy Practices?</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Contact our team directly at <span className="text-sky-300">vedanshtejasvi2011@gmail.com</span>
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer flex-shrink-0"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>
    </div>
  );
};
