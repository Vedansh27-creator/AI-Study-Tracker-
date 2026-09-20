import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Clock,
  Tag,
  BookOpen,
  Filter,
  Calendar,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { Task, PageType } from '../types.ts';
import { HeaderNav } from './HeaderNav.tsx';
import { soundService } from '../utils/audio.ts';
import {
  INDEPENDENT_SUBJECTS,
  GROUPED_SUBJECTS,
} from '../constants/subjects.ts';
import {
  getTodayDateStr,
  getYesterdayDateStr,
  formatSetDateDisplay,
  isTaskDelayed,
  isTaskToday,
} from '../utils/storage.ts';

interface TasksPageProps {
  tasks: Task[];
  onAddTask: (
    title: string,
    subject?: string,
    estimatedMinutes?: number,
    dateStr?: string
  ) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onNavigate: (page: PageType) => void;
}

const ESTIMATED_TIMES = [15, 25, 45, 60];

export const TasksPage: React.FC<TasksPageProps> = ({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  onNavigate,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | undefined>(25);
  const [taskDate, setTaskDate] = useState<string>(getTodayDateStr());

  // Editing state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editMinutes, setEditMinutes] = useState<number | undefined>(undefined);
  const [editDate, setEditDate] = useState('');

  // Filter: 'all', 'today', 'delayed', 'completed'
  const [filter, setFilter] = useState<'all' | 'today' | 'delayed' | 'completed'>('all');

  const completedTasks = tasks.filter((t) => t.completed);
  const delayedTasks = tasks.filter(isTaskDelayed);
  const todayTasks = tasks.filter(isTaskToday);

  const completedCount = completedTasks.length;
  const delayedCount = delayedTasks.length;
  const todayCount = todayTasks.length;
  const remainingCount = delayedCount + todayCount;
  const totalCount = tasks.length;

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const finalSubject = showCustomSubject
      ? customSubject.trim() || undefined
      : selectedSubject || undefined;

    onAddTask(trimmed, finalSubject, estimatedMinutes, taskDate || getTodayDateStr());
    soundService.playSoftClick();

    // Reset form
    setNewTitle('');
    setSelectedSubject('');
    setCustomSubject('');
    setShowCustomSubject(false);
    setTaskDate(getTodayDateStr());
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditSubject(task.subject || '');
    setEditMinutes(task.estimatedMinutes);
    setEditDate(task.dateStr || getTodayDateStr());
  };

  const saveEditing = (id: string) => {
    if (editTitle.trim()) {
      onUpdateTask(id, {
        title: editTitle.trim(),
        subject: editSubject.trim() || undefined,
        estimatedMinutes: editMinutes,
        dateStr: editDate || getTodayDateStr(),
      });
      soundService.playSoftClick();
    }
    setEditingTaskId(null);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
  };

  const handleToggle = (id: string, currentStatus: boolean) => {
    onToggleComplete(id);
    if (!currentStatus) {
      soundService.playChime('low');
    } else {
      soundService.playSoftClick();
    }
  };

  const handleMoveToToday = (task: Task) => {
    onUpdateTask(task.id, {
      dateStr: getTodayDateStr(),
    });
    soundService.playSoftClick();
  };

  // Render a single task card
  const renderTaskCard = (task: Task) => {
    const isDelayed = isTaskDelayed(task);

    return (
      <motion.div
        key={task.id}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`group rounded-xl border transition-all duration-200 p-4 sm:p-4.5 flex flex-col gap-3 ${
          task.completed
            ? 'bg-[#121b30]/75 border-blue-950/60 opacity-75'
            : isDelayed
            ? 'bg-[#1a2038] border-amber-800/40 hover:border-amber-600/60 shadow-md shadow-black/20'
            : 'bg-[#182440] border-blue-800/40 hover:border-blue-700/60 shadow-md shadow-black/15'
        }`}
      >
        {editingTaskId === task.id ? (
          /* Inline Editing Mode */
          <div className="space-y-3">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0f182c] border border-blue-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              autoFocus
            />
            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {/* Subject selection */}
                <select
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="px-2 py-1 rounded bg-[#0f182c] border border-blue-800/60 text-xs text-white max-w-[150px] sm:max-w-[170px]"
                >
                  <option value="">No subject</option>
                  {/* Independent subjects standalone */}
                  {INDEPENDENT_SUBJECTS.map((subj) => (
                    <option key={subj.value} value={subj.value}>
                      {subj.label}
                    </option>
                  ))}
                  {/* Grouped subjects with subparts */}
                  {GROUPED_SUBJECTS.map((grp) => (
                    <optgroup key={grp.name} label={grp.name}>
                      {grp.subparts.map((subpart) => (
                        <option key={subpart.value} value={subpart.value}>
                          {subpart.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                  {editSubject &&
                    !INDEPENDENT_SUBJECTS.some((s) => s.value === editSubject) &&
                    !GROUPED_SUBJECTS.some((g) =>
                      g.subparts.some((o) => o.value === editSubject)
                    ) && <option value={editSubject}>{editSubject}</option>}
                </select>

                {/* Date edit */}
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="px-2 py-1 rounded bg-[#0f182c] border border-blue-800/60 text-xs text-white [color-scheme:dark]"
                />

                {/* Estimate edit */}
                <select
                  value={editMinutes || ''}
                  onChange={(e) =>
                    setEditMinutes(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="px-2 py-1 rounded bg-[#0f182c] border border-blue-800/60 text-xs text-white"
                >
                  <option value="">No estimate</option>
                  <option value="15">15 min</option>
                  <option value="25">25 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => saveEditing(task.id)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Task Card Display */
          <div className="flex items-start justify-between gap-3">
            {/* Left: Checkbox + Title + Meta Chips */}
            <div className="flex items-start gap-3.5 min-w-0 flex-1">
              <button
                type="button"
                onClick={() => handleToggle(task.id, task.completed)}
                className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-sky-400 transition-colors cursor-pointer focus:outline-none"
                aria-label={task.completed ? 'Mark uncompleted' : 'Mark completed'}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className={`w-5 h-5 ${isDelayed ? 'text-amber-400 hover:text-amber-300' : 'text-slate-400 hover:text-sky-300'}`} />
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm sm:text-base font-medium break-words leading-snug transition-all ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-100'
                  }`}
                >
                  {task.title}
                </p>

                {/* Chips: Subject, Date on which task was set, Est time */}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {task.subject && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-sky-950/70 border border-sky-800/40 text-sky-300">
                      <Tag className="w-3 h-3 text-sky-400" />
                      {task.subject}
                    </span>
                  )}

                  {/* Creation / Scheduled Date displayed right beside the subject */}
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${
                      isDelayed
                        ? 'bg-amber-950/80 border-amber-600/60 text-amber-300 shadow-sm shadow-amber-950/50'
                        : 'bg-slate-800/70 border-slate-700/50 text-slate-300'
                    }`}
                    title={`Task set on: ${task.dateStr || 'Previous date'}`}
                  >
                    <Calendar className={`w-3 h-3 ${isDelayed ? 'text-amber-400' : 'text-sky-400'}`} />
                    <span>
                      {isDelayed
                        ? `Set on: ${formatSetDateDisplay(task.dateStr || task.createdAt)} (Pending)`
                        : `Set: ${formatSetDateDisplay(task.dateStr || task.createdAt)}`}
                    </span>
                  </span>

                  {task.estimatedMinutes && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-indigo-950/60 border border-indigo-800/40 text-indigo-300">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {task.estimatedMinutes}m
                    </span>
                  )}

                  {/* Quick button to reschedule a delayed task to today */}
                  {isDelayed && (
                    <button
                      type="button"
                      onClick={() => handleMoveToToday(task)}
                      className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-blue-900/60 hover:bg-blue-800 text-sky-200 border border-blue-700/40 transition-colors cursor-pointer"
                      title="Move this task to Today's tasks"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>Move to Today</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => startEditing(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-blue-900/40 transition-colors cursor-pointer"
                title="Edit Task"
                aria-label="Edit Task"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  onDeleteTask(task.id);
                  soundService.playSoftClick();
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Delete Task"
                aria-label="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col pb-16">
      <HeaderNav
        currentPage="tasks"
        onNavigate={onNavigate}
        title="Tasks List"
        subtitle={todayFormatted}
        badge={
          totalCount > 0
            ? `${remainingCount} remaining (${completedCount} done)`
            : undefined
        }
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col gap-6 mt-2">
        {/* Add Task Input Card */}
        <div
          id="add-task-card"
          className="rounded-2xl bg-[#16223e] border border-blue-900/50 p-4 sm:p-6 shadow-lg shadow-black/20"
        >
          <h2 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Plus className="w-5 h-5 text-sky-400" />
            <span>Add a Study Task</span>
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <input
                id="new-task-title-input"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What are you studying? (e.g. Science Physics Chapter 4 revision)"
                className="w-full px-4 py-3 rounded-xl bg-[#0f182c] border border-blue-800/50 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all"
                required
              />
            </div>

            {/* Subject, Date, and Duration selectors */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                {/* Subject Selector: Math & CS Independent; Science, English, Hindi, Social Science Grouped */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Subject:
                  </span>
                  {!showCustomSubject ? (
                    <select
                      id="select-task-subject"
                      value={selectedSubject}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setShowCustomSubject(true);
                          setSelectedSubject('');
                        } else {
                          setSelectedSubject(e.target.value);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#0e172a] border border-blue-800/40 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    >
                      <option value="">(None)</option>
                      {/* Independent subjects rendered directly without optgroup */}
                      {INDEPENDENT_SUBJECTS.map((subj) => (
                        <option
                          key={subj.value}
                          value={subj.value}
                          className="bg-[#0e172a] text-white font-medium"
                        >
                          {subj.label}
                        </option>
                      ))}
                      {/* Grouped subjects with subparts */}
                      {GROUPED_SUBJECTS.map((grp) => (
                        <optgroup
                          key={grp.name}
                          label={grp.name}
                          className="bg-[#11192e] text-sky-300 font-semibold"
                        >
                          {grp.subparts.map((subpart) => (
                            <option
                              key={subpart.value}
                              value={subpart.value}
                              className="bg-[#0e172a] text-white font-normal"
                            >
                              {subpart.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="__custom__" className="bg-[#0e172a] text-sky-400">
                        + Custom Subject
                      </option>
                    </select>
                  ) : (
                    <div className="inline-flex items-center gap-1.5">
                      <input
                        type="text"
                        value={customSubject}
                        onChange={(e) => setCustomSubject(e.target.value)}
                        placeholder="Subject name"
                        className="px-2.5 py-1.5 rounded-lg bg-[#0e172a] border border-blue-800/40 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-400 w-32 sm:w-40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCustomSubject(false)}
                        className="p-1 text-slate-400 hover:text-slate-200"
                        title="Cancel custom subject"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Scheduled Date Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Date:
                  </span>
                  <div className="inline-flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setTaskDate(getTodayDateStr())}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        taskDate === getTodayDateStr()
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-[#101a31] text-slate-400 hover:text-slate-200 border border-blue-900/40'
                      }`}
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaskDate(getYesterdayDateStr())}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        taskDate === getYesterdayDateStr()
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-[#101a31] text-slate-400 hover:text-slate-200 border border-blue-900/40'
                      }`}
                    >
                      Yesterday
                    </button>
                    <input
                      type="date"
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                      className="px-2 py-1 rounded bg-[#0e172a] border border-blue-800/40 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-400 [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              {/* Time chips & Submit */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 md:pt-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
                    <Clock className="w-3.5 h-3.5" /> Est:
                  </span>
                  {ESTIMATED_TIMES.map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() =>
                        setEstimatedMinutes(
                          estimatedMinutes === mins ? undefined : mins
                        )
                      }
                      className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        estimatedMinutes === mins
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-[#101a31] text-slate-400 hover:text-slate-200 border border-blue-900/40'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>

                <button
                  id="btn-submit-task"
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 disabled:pointer-events-none text-white font-medium text-sm transition-colors shadow-md shadow-sky-900/20 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Task List Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Study Tasks</h3>
            {totalCount > 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-200 border border-blue-800/40 whitespace-nowrap">
                {remainingCount} remaining ({completedCount} done)
              </span>
            )}
            {delayedCount > 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-600/50 flex items-center gap-1 font-medium whitespace-nowrap">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                {delayedCount} pending
              </span>
            )}
          </div>

          {totalCount > 0 && (
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center gap-1 bg-[#131e36] p-1 rounded-xl border border-blue-900/50">
              <span className="text-xs text-slate-400 px-1.5 flex items-center gap-1 flex-shrink-0">
                <Filter className="w-3 h-3" />
              </span>
              <button
                key="all"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({totalCount})
              </button>
              <button
                key="today"
                onClick={() => setFilter('today')}
                className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  filter === 'today'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Today ({todayCount})
              </button>
              <button
                key="delayed"
                onClick={() => setFilter('delayed')}
                className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  filter === 'delayed'
                    ? 'bg-amber-600 text-white shadow-sm font-semibold'
                    : delayedCount > 0
                    ? 'text-amber-400 hover:text-amber-200'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Delayed ({delayedCount})
              </button>
              <button
                key="completed"
                onClick={() => setFilter('completed')}
                className={`px-2.5 py-1 min-h-[32px] rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>
          )}
        </div>

        {/* Tasks Display */}
        <div id="tasks-list-container" className="space-y-6">
          {totalCount === 0 ? (
            /* Friendly Empty State */
            <div
              id="empty-tasks-state"
              className="rounded-2xl border border-dashed border-blue-800/40 bg-[#141e34]/60 p-8 sm:p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-sky-400 mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-medium text-white mb-1">
                No tasks logged yet
              </h4>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-5">
                Take a deep breath. When you're ready to study, add your first task above to set your intentions.
              </p>
            </div>
          ) : filter === 'delayed' ? (
            /* Delayed only view */
            delayedTasks.length === 0 ? (
              <div className="rounded-2xl border border-blue-900/40 bg-[#141e34]/60 p-8 text-center text-slate-400 text-sm">
                No delayed tasks! Great job keeping up with your study plan.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 text-amber-300 font-medium text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Delayed / Pending Tasks ({delayedTasks.length})</span>
                </div>
                <AnimatePresence mode="popLayout">
                  {delayedTasks.map(renderTaskCard)}
                </AnimatePresence>
              </div>
            )
          ) : filter === 'today' ? (
            /* Today only view */
            todayTasks.length === 0 ? (
              <div className="rounded-2xl border border-blue-900/40 bg-[#141e34]/60 p-8 text-center text-slate-400 text-sm">
                No tasks set for today. Add a new task above or move a delayed task to today.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 text-sky-300 font-medium text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Today's Tasks ({todayTasks.length})</span>
                </div>
                <AnimatePresence mode="popLayout">
                  {todayTasks.map(renderTaskCard)}
                </AnimatePresence>
              </div>
            )
          ) : filter === 'completed' ? (
            /* Completed only view */
            completedTasks.length === 0 ? (
              <div className="rounded-2xl border border-blue-900/40 bg-[#141e34]/60 p-8 text-center text-slate-400 text-sm">
                No completed tasks yet. Mark tasks as finished when done.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-1 text-emerald-400 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed Tasks ({completedTasks.length})</span>
                </div>
                <AnimatePresence mode="popLayout">
                  {completedTasks.map(renderTaskCard)}
                </AnimatePresence>
              </div>
            )
          ) : (
            /* ALL VIEW: Categorized sections so user can immediately see Delayed, Today, and Completed */
            <div className="space-y-7">
              {/* Section 1: Delayed / Pending Tasks (highlighted if any exist) */}
              {delayedTasks.length > 0 && (
                <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-800/40 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-amber-900/30">
                    <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm sm:text-base">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <span>Delayed / Pending Tasks</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-amber-900/60 text-amber-200 border border-amber-700/50">
                        {delayedTasks.length} pending
                      </span>
                    </div>
                    <span className="text-xs text-amber-300/70">
                      Tasks set on previous days that require completion
                    </span>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {delayedTasks.map(renderTaskCard)}
                  </AnimatePresence>
                </div>
              )}

              {/* Section 2: Today's Tasks */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 pb-1">
                  <div className="flex items-center gap-2 text-sky-200 font-semibold text-sm sm:text-base">
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <span>Today's Tasks</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-sky-900/50 text-sky-300 border border-sky-800/40">
                      {todayTasks.length} active
                    </span>
                  </div>
                </div>

                {todayTasks.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-blue-900/40 bg-[#121b30]/40 p-5 text-center text-slate-400 text-xs sm:text-sm">
                    No active tasks set for today.
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {todayTasks.map(renderTaskCard)}
                  </AnimatePresence>
                )}
              </div>

              {/* Section 3: Completed Tasks */}
              {completedTasks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between gap-2 pb-1">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Completed Tasks</span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
                        {completedTasks.length} finished
                      </span>
                    </div>
                  </div>
                  <AnimatePresence mode="popLayout">
                    {completedTasks.map(renderTaskCard)}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
