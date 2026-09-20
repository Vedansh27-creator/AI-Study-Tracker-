import React, { useState } from 'react';
import { HeaderNav } from './HeaderNav.tsx';
import { PageType } from '../types.ts';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface ContactUsPageProps {
  onNavigate: (page: PageType) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'feedback' | 'bug' | 'feature' | 'general'>('feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please write a message with at least 10 characters.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCategory('feedback');
    setMessage('');
    setSubmitted(false);
    setErrorMsg('');
  };

  return (
    <div id="contact-us-page" className="min-h-screen pb-16">
      <HeaderNav
        currentPage="contact"
        onNavigate={onNavigate}
        title="Contact Us"
        subtitle="We'd love to hear your feedback, questions, or ideas"
        badge="Direct Support"
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Direct Info Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-sky-400">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Direct Email</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Prefer sending an email directly from your mail client? Feel free to reach out to us at:
              </p>
              <a
                href="mailto:vedanshtejasvi2011@gmail.com"
                className="inline-block text-sky-300 hover:text-sky-200 font-medium text-sm break-all underline decoration-blue-500/50 hover:decoration-blue-400 transition-colors"
              >
                vedanshtejasvi2011@gmail.com
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-[#152037] border border-blue-900/40 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-700/50 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Response Window</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We review inquiries attentively and typically reply within <strong className="text-white">24 to 48 hours</strong> on business days.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#11192e] border border-blue-900/50 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Quick Shortcuts
              </span>
              <div className="flex flex-col gap-1.5 text-xs text-slate-300">
                <button
                  onClick={() => onNavigate('home')}
                  className="text-left text-sky-400 hover:underline cursor-pointer flex items-center gap-1.5 py-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Frequently Asked Questions</span>
                </button>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-left text-sky-400 hover:underline cursor-pointer flex items-center gap-1.5 py-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Privacy Policy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="md:col-span-2">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#152037] border border-blue-900/40 shadow-sm">
              {submitted ? (
                <div className="py-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Thank You, {name}!
                  </h3>
                  <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                    Your message regarding <strong className="text-sky-300 uppercase text-xs tracking-wider font-semibold">{category}</strong> has been received. We appreciate your thoughts and will get back to you at <span className="text-white font-medium">{email}</span> if a follow-up is needed.
                  </p>
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1d2b4b] hover:bg-[#25375f] text-slate-200 text-xs sm:text-sm font-medium border border-blue-800/40 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </button>
                    <button
                      onClick={() => onNavigate('home')}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                    >
                      <span>Return to Main Menu</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-blue-900/30">
                    <MessageSquare className="w-5 h-5 text-sky-400" />
                    <h3 className="font-bold text-white text-lg">Send Us a Message</h3>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/50 text-rose-200 text-xs sm:text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Alex Johnson"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#101729] border border-blue-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#101729] border border-blue-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-category" className="text-xs font-semibold text-slate-300">
                      Topic / Category
                    </label>
                    <select
                      id="contact-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#101729] border border-blue-900/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 cursor-pointer"
                    >
                      <option value="feedback">General Feedback &amp; Suggestions</option>
                      <option value="feature">Feature Request (Subjects, Timers, Sync)</option>
                      <option value="bug">Report a Bug / Issue</option>
                      <option value="general">Other Inquiries</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your thoughts, suggestions, or issue details here..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#101729] border border-blue-900/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none leading-relaxed"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
