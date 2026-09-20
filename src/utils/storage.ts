import { AppConfig, DEFAULT_CONFIG, Task, Exam } from '../types.ts';

const TASKS_KEY = 'ai_study_tracker_tasks_v1';
const EXAMS_KEY = 'ai_study_tracker_exams_v1';
const CONFIG_KEY = 'ai_study_tracker_config_v1';

export function getTodayDateStr(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatSetDateDisplay(dateStrOrTs: string | number): string {
  let d: Date;
  let rawDateStr = '';
  if (typeof dateStrOrTs === 'string' && dateStrOrTs.includes('-')) {
    rawDateStr = dateStrOrTs;
    const [y, m, day] = dateStrOrTs.split('-').map(Number);
    d = new Date(y, m - 1, day);
  } else {
    d = new Date(dateStrOrTs);
    rawDateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  if (isNaN(d.getTime())) return '';

  const dayNum = d.getDate();
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  const suffix =
    dayNum >= 11 && dayNum <= 13
      ? 'th'
      : dayNum % 10 === 1
      ? 'st'
      : dayNum % 10 === 2
      ? 'nd'
      : dayNum % 10 === 3
      ? 'rd'
      : 'th';

  const todayStr = getTodayDateStr();
  const yesterdayStr = getYesterdayDateStr();

  if (rawDateStr === todayStr) {
    return `Today (${dayNum}${suffix} ${monthName})`;
  } else if (rawDateStr === yesterdayStr) {
    return `Yesterday (${dayNum}${suffix} ${monthName})`;
  }
  return `${dayNum}${suffix} ${monthName}`;
}

export function isTaskDelayed(task: Task): boolean {
  if (task.completed) return false;
  const taskDate = task.dateStr || getYesterdayDateStr();
  return taskDate < getTodayDateStr();
}

export function isTaskToday(task: Task): boolean {
  if (task.completed) return false;
  const taskDate = task.dateStr || getTodayDateStr();
  return taskDate >= getTodayDateStr();
}

export function loadStoredTasks(): Task[] {
  const yesterdayStr = getYesterdayDateStr();
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) {
      // Clean slate for new visitors: no unsolicited tasks
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filter out any legacy pre-populated demo tasks
      const sanitized = parsed.filter(
        (t: Task) => !t.id?.startsWith('task-yesterday-')
      );
      return sanitized.map((t: Task) => {
        if (!t.dateStr) {
          return {
            ...t,
            dateStr: yesterdayStr,
          };
        }
        return t;
      });
    }
    return [];
  } catch (err) {
    console.warn('Failed to load tasks from localStorage', err);
    return [];
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.warn('Failed to save tasks to localStorage', err);
  }
}

export function loadStoredExams(): Exam[] {
  try {
    const raw = localStorage.getItem(EXAMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.warn('Failed to load exams from localStorage', err);
    return [];
  }
}

export function saveStoredExams(exams: Exam[]): void {
  try {
    localStorage.setItem(EXAMS_KEY, JSON.stringify(exams));
  } catch (err) {
    console.warn('Failed to save exams to localStorage', err);
  }
}

export function loadStoredConfig(): AppConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (err) {
    console.warn('Failed to load config from localStorage', err);
    return DEFAULT_CONFIG;
  }
}

export function saveStoredConfig(config: AppConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.warn('Failed to save config to localStorage', err);
  }
}
