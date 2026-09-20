import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  GraduationCap,
  Clock,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  BookCheck,
} from 'lucide-react';
import { Exam, PageType } from '../types.ts';
import { HeaderNav } from './HeaderNav.tsx';
import {
  INDEPENDENT_SUBJECTS,
  GROUPED_SUBJECTS,
} from '../constants/subjects.ts';
import { soundService } from '../utils/audio.ts';

interface ExamTrackerPageProps {
  exams: Exam[];
  onAddExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => void;
  onUpdateExam: (id: string, updates: Partial<Exam>) => void;
  onDeleteExam: (id: string) => void;
  onNavigate: (page: PageType) => void;
}

export const ExamTrackerPage: React.FC<ExamTrackerPageProps> = ({
  exams,
  onAddExam,
  onUpdateExam,
  onDeleteExam,
  onNavigate,
}) => {
  const formId = useId();
  // Form State
  const [examDate, setExamDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [totalChapters, setTotalChapters] = useState<string>('');
  const [revisedChapters, setRevisedChapters] = useState<string>('');
  const [unrevisedChapters, setUnrevisedChapters] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // Edit Mode State
  const [editingExamId, setEditingExamId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editTotal, setEditTotal] = useState<number>(0);
  const [editRevised, setEditRevised] = useState<number>(0);
  const [editUnrevised, setEditUnrevised] = useState<number>(0);

  // Helper: Calculate days left
  const calculateDaysLeft = (targetDateStr: string) => {
    if (!targetDateStr) return null;
    const target = new Date(targetDateStr + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysLeftLabel = (days: number | null) => {
    if (days === null) return '';
    if (days < 0) {
      const abs = Math.abs(days);
      return `${abs} day${abs === 1 ? '' : 's'} ago (Completed)`;
    }
    if (days === 0) return 'Exam is Today!';
    if (days === 1) return 'Tomorrow (1 day left)';
    return `${days} days left`;
  };

  const getDaysLeftBadgeClass = (days: number | null) => {
    if (days === null) return 'bg-blue-900/40 text-slate-300 border-blue-800/40';
    if (days < 0) return 'bg-slate-800/80 text-slate-400 border-slate-700/50';
    if (days === 0) return 'bg-rose-900/60 text-rose-200 border-rose-600/50 animate-pulse';
    if (days <= 3) return 'bg-amber-900/60 text-amber-200 border-amber-600/50';
    if (days <= 7) return 'bg-sky-900/60 text-sky-200 border-sky-600/50';
    return 'bg-blue-900/60 text-blue-200 border-blue-700/50';
  };

  // Live days left for current form input
  const formDaysLeft = calculateDaysLeft(examDate);

  // Handle total chapters change with smart revision auto-fill
  const handleTotalChaptersChange = (val: string) => {
    setTotalChapters(val);
    const tot = parseInt(val, 10);
    const rev = parseInt(revisedChapters, 10);
    if (!isNaN(tot) && tot >= 0) {
      if (!isNaN(rev) && rev <= tot) {
        setUnrevisedChapters(String(tot - rev));
      } else if (!revisedChapters) {
        setUnrevisedChapters(String(tot));
        setRevisedChapters('0');
      }
    }
  };

  const handleRevisedChaptersChange = (val: string) => {
    setRevisedChapters(val);
    const rev = parseInt(val, 10);
    const tot = parseInt(totalChapters, 10);
    if (!isNaN(tot) && !isNaN(rev) && rev >= 0 && rev <= tot) {
      setUnrevisedChapters(String(tot - rev));
    }
  };

  const handleUnrevisedChaptersChange = (val: string) => {
    setUnrevisedChapters(val);
    const unrev = parseInt(val, 10);
    const tot = parseInt(totalChapters, 10);
    if (!isNaN(tot) && !isNaN(unrev) && unrev >= 0 && unrev <= tot) {
      setRevisedChapters(String(tot - unrev));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!examDate) {
      setFormError('Please choose the exam date.');
      return;
    }
    if (!selectedSubject) {
      setFormError('Please select a subject.');
      return;
    }

    const total = parseInt(totalChapters, 10);
    const revised = parseInt(revisedChapters, 10) || 0;
    const unrevised = parseInt(unrevisedChapters, 10) || 0;

    if (isNaN(total) || total < 1) {
      setFormError('Please enter at least 1 total chapter coming in the exam.');
      return;
    }

    if (revised + unrevised !== total && unrevised !== total - revised) {
      setFormError(`Revised (${revised}) and Not Revised (${unrevised}) should add up to Total chapters (${total}).`);
      return;
    }

    onAddExam({
      examDate,
      subject: selectedSubject,
      totalChapters: total,
      revisedChapters: revised,
      unrevisedChapters: total - revised,
    });

    soundService.playSoftClick();

    // Reset Form
    setExamDate('');
    setSelectedSubject('');
    setTotalChapters('');
    setRevisedChapters('');
    setUnrevisedChapters('');
  };

  const startEditing = (exam: Exam) => {
    setEditingExamId(exam.id);
    setEditDate(exam.examDate);
    setEditSubject(exam.subject);
    setEditTotal(exam.totalChapters);
    setEditRevised(exam.revisedChapters);
    setEditUnrevised(exam.unrevisedChapters);
  };

  const saveEditing = (id: string) => {
    if (editDate && editSubject && editTotal > 0) {
      const validRevised = Math.min(editTotal, Math.max(0, editRevised));
      onUpdateExam(id, {
        examDate: editDate,
        subject: editSubject,
        totalChapters: editTotal,
        revisedChapters: validRevised,
        unrevisedChapters: editTotal - validRevised,
      });
      soundService.playSoftClick();
    }
    setEditingExamId(null);
  };

  const incrementRevision = (exam: Exam) => {
    if (exam.revisedChapters < exam.totalChapters) {
      const newRev = exam.revisedChapters + 1;
      onUpdateExam(exam.id, {
        revisedChapters: newRev,
        unrevisedChapters: exam.totalChapters - newRev,
      });
      soundService.playChime('low');
    }
  };

  // Sort exams chronologically
  const sortedExams = [...exams].sort((a, b) => {
    return new Date(a.examDate).getTime() - new Date(b.examDate).getTime();
  });

  return (
    <div className="min-h-screen w-full flex flex-col pb-16">
      <HeaderNav
        currentPage="exams"
        onNavigate={onNavigate}
        title="Exam Tracker"
        subtitle="Exam countdown & chapter revision status"
        badge={exams.length > 0 ? `${exams.length} tracked` : undefined}
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col gap-6 mt-2">
        {/* Exam Setup Card */}
        <div
          id="add-exam-card"
          className="rounded-2xl bg-[#16223e] border border-blue-900/50 p-5 sm:p-6 shadow-lg shadow-black/20"
        >
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/40">
            <div className="p-1.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-sky-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">Track an Upcoming Exam</h2>
              <p className="text-xs text-slate-400">
                Select your exam date and subject to set up countdown and syllabus chapters
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4.5">
            {formError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-700/50 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1: Calendar to select exam date with auto days left */}
              <div>
                <label
                  htmlFor={`${formId}-exam-date`}
                  className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <span>Exam Date</span>
                  </span>
                  {formDaysLeft !== null && (
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getDaysLeftBadgeClass(formDaysLeft)}`}>
                      {getDaysLeftLabel(formDaysLeft)}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-exam-date`}
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f182c] border border-blue-800/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all [color-scheme:dark]"
                    required
                  />
                </div>
                {formDaysLeft !== null && (
                  <p className="text-xs text-sky-300/80 mt-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Countdown: {getDaysLeftLabel(formDaysLeft)}</span>
                  </p>
                )}
              </div>

              {/* Feature 2: Dropdown to select subject (exact same subjects) */}
              <div>
                <label
                  htmlFor={`${formId}-subject-select`}
                  className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Subject</span>
                </label>
                <select
                  id={`${formId}-subject-select`}
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0f182c] border border-blue-800/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                  required
                >
                  <option value="">-- Choose Subject --</option>
                  {INDEPENDENT_SUBJECTS.map((subj) => (
                    <option key={subj.value} value={subj.value} className="bg-[#0f182c] text-white font-medium">
                      {subj.label}
                    </option>
                  ))}
                  {GROUPED_SUBJECTS.map((grp) => (
                    <optgroup key={grp.name} label={grp.name} className="bg-[#11192e] text-sky-300 font-semibold">
                      {grp.subparts.map((subpart) => (
                        <option key={subpart.value} value={subpart.value} className="bg-[#0f182c] text-white font-normal">
                          {subpart.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Feature 3: After selecting subject, a box appears for chapter details */}
            <AnimatePresence>
              {selectedSubject && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div
                    id="chapters-detail-box"
                    className="mt-2 p-4 sm:p-5 rounded-2xl bg-[#0e172a] border border-sky-500/30 shadow-inner"
                  >
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-900/40 text-sky-300">
                      <Sparkles className="w-4 h-4 text-sky-400" />
                      <span className="text-xs sm:text-sm font-semibold">
                        Chapter Syllabus for <span className="text-white">{selectedSubject}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {/* 1. Number of chapters coming in exam */}
                      <div>
                        <label
                          htmlFor={`${formId}-total-chapters`}
                          className="block text-xs font-medium text-slate-300 mb-1"
                        >
                          Total Chapters Coming
                        </label>
                        <input
                          id={`${formId}-total-chapters`}
                          type="number"
                          min="1"
                          max="150"
                          value={totalChapters}
                          onChange={(e) => handleTotalChaptersChange(e.target.value)}
                          placeholder="e.g. 12"
                          className="w-full px-3 py-2 rounded-xl bg-[#14203a] border border-blue-800/60 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                          required
                        />
                      </div>

                      {/* 2. Number of chapters revised */}
                      <div>
                        <label
                          htmlFor={`${formId}-revised-chapters`}
                          className="block text-xs font-medium text-emerald-300 mb-1"
                        >
                          Chapters Revised
                        </label>
                        <input
                          id={`${formId}-revised-chapters`}
                          type="number"
                          min="0"
                          max={totalChapters || '150'}
                          value={revisedChapters}
                          onChange={(e) => handleRevisedChaptersChange(e.target.value)}
                          placeholder="e.g. 5"
                          className="w-full px-3 py-2 rounded-xl bg-[#14203a] border border-emerald-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>

                      {/* 3. Number of chapters not revised */}
                      <div>
                        <label
                          htmlFor={`${formId}-unrevised-chapters`}
                          className="block text-xs font-medium text-amber-300 mb-1"
                        >
                          Chapters Not Revised
                        </label>
                        <input
                          id={`${formId}-unrevised-chapters`}
                          type="number"
                          min="0"
                          max={totalChapters || '150'}
                          value={unrevisedChapters}
                          onChange={(e) => handleUnrevisedChaptersChange(e.target.value)}
                          placeholder="e.g. 7"
                          className="w-full px-3 py-2 rounded-xl bg-[#14203a] border border-amber-700/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    {totalChapters && parseInt(totalChapters, 10) > 0 && (
                      <div className="mt-3.5 pt-3 border-t border-blue-900/30 flex items-center justify-between text-xs text-slate-300">
                        <span>Revision Progress:</span>
                        <span className="font-semibold text-emerald-300">
                          {Math.round(
                            ((parseInt(revisedChapters, 10) || 0) /
                              parseInt(totalChapters, 10)) *
                              100
                          )}
                          % completed
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-2 flex justify-end">
              <button
                id="btn-save-exam"
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 min-h-[42px] rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-colors shadow-md shadow-sky-900/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Save Exam to Tracker</span>
              </button>
            </div>
          </form>
        </div>

        {/* Tracked Exams Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Upcoming Exams</h3>
            {exams.length > 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-200 border border-blue-800/40">
                {exams.length} scheduled
              </span>
            )}
          </div>
        </div>

        {/* Exam Cards List */}
        <div id="exams-list-container" className="space-y-4">
          {sortedExams.length === 0 ? (
            <div
              id="empty-exams-state"
              className="rounded-2xl border border-dashed border-blue-800/40 bg-[#141e34]/60 p-8 sm:p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-sky-400 mb-4">
                <Calendar className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-medium text-white mb-1">
                No exams tracked yet
              </h4>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-5">
                Add your upcoming unit tests, midterms, or finals above to see days remaining and track chapter revisions.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {sortedExams.map((exam) => {
                const daysLeft = calculateDaysLeft(exam.examDate);
                const percent = Math.min(
                  100,
                  Math.round((exam.revisedChapters / (exam.totalChapters || 1)) * 100)
                );

                const formattedExamDate = new Intl.DateTimeFormat('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(exam.examDate + 'T00:00:00'));

                return (
                  <motion.div
                    key={exam.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-[#16223e] border border-blue-800/40 p-5 shadow-lg shadow-black/20 flex flex-col gap-4 group"
                  >
                    {editingExamId === exam.id ? (
                      /* In-card Edit Mode */
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-slate-400 block mb-1">Exam Date</label>
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-[#0f182c] border border-blue-700 text-white text-xs [color-scheme:dark]"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400 block mb-1">Subject</label>
                            <select
                              value={editSubject}
                              onChange={(e) => setEditSubject(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-[#0f182c] border border-blue-700 text-white text-xs"
                            >
                              {INDEPENDENT_SUBJECTS.map((subj) => (
                                <option key={subj.value} value={subj.value}>
                                  {subj.label}
                                </option>
                              ))}
                              {GROUPED_SUBJECTS.map((g) => (
                                <optgroup key={g.name} label={g.name}>
                                  {g.subparts.map((sub) => (
                                    <option key={sub.value} value={sub.value}>
                                      {sub.label}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[11px] text-slate-400 block mb-1">Total</label>
                            <input
                              type="number"
                              min="1"
                              value={editTotal}
                              onChange={(e) => setEditTotal(Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 rounded bg-[#0f182c] border border-blue-800 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-emerald-300 block mb-1">Revised</label>
                            <input
                              type="number"
                              min="0"
                              max={editTotal}
                              value={editRevised}
                              onChange={(e) => setEditRevised(Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 rounded bg-[#0f182c] border border-emerald-700/60 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-amber-300 block mb-1">Not Revised</label>
                            <input
                              type="number"
                              min="0"
                              value={Math.max(0, editTotal - editRevised)}
                              readOnly
                              className="w-full px-2.5 py-1.5 rounded bg-[#0b1322] border border-blue-900/60 text-xs text-slate-400"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            onClick={() => saveEditing(exam.id)}
                            className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium cursor-pointer"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditingExamId(null)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode */
                      <>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-base sm:text-lg font-semibold text-white">
                                {exam.subject}
                              </span>
                              <span
                                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getDaysLeftBadgeClass(
                                  daysLeft
                                )}`}
                              >
                                {getDaysLeftLabel(daysLeft)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{formattedExamDate}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 self-end sm:self-center">
                            <button
                              onClick={() => startEditing(exam)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-blue-900/40 transition-colors cursor-pointer"
                              title="Edit Exam Details"
                              aria-label="Edit Exam"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                onDeleteExam(exam.id);
                                soundService.playSoftClick();
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                              title="Delete Exam"
                              aria-label="Delete Exam"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Chapter Stats & Progress Bar */}
                        <div className="rounded-xl bg-[#0f182c] p-3 sm:p-3.5 border border-blue-900/50">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                              <span className="text-slate-300 font-medium">
                                Total: <strong className="text-white">{exam.totalChapters}</strong>
                              </span>
                              <span className="text-emerald-300 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                                Revised: <strong>{exam.revisedChapters}</strong>
                              </span>
                              <span className="text-amber-300 font-medium">
                                Left: <strong>{exam.unrevisedChapters}</strong>
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-sky-300">
                              {percent}% Ready
                            </span>
                          </div>

                          {/* Progress track */}
                          <div className="w-full h-2 rounded-full bg-blue-950 overflow-hidden mb-2">
                            <div
                              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          {/* Quick Revision Incrementer */}
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-400">
                              {exam.revisedChapters >= exam.totalChapters
                                ? '🎉 All chapters revised!'
                                : `${exam.unrevisedChapters} chapter${
                                    exam.unrevisedChapters === 1 ? '' : 's'
                                  } left to revise`}
                            </span>

                            {exam.revisedChapters < exam.totalChapters && (
                              <button
                                type="button"
                                onClick={() => incrementRevision(exam)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-700/50 text-xs font-medium transition-colors cursor-pointer"
                              >
                                <BookCheck className="w-3.5 h-3.5" />
                                <span>+1 Chapter Revised</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
};
