export interface Task {
  id: string;
  title: string;
  completed: boolean;
  subject?: string;
  estimatedMinutes?: number;
  priority?: 'low' | 'medium' | 'high';
  createdAt: number;
  dateStr?: string; // YYYY-MM-DD date on which the task was scheduled / set
  completedAt?: number;
}

export interface Exam {
  id: string;
  subject: string;
  examDate: string; // YYYY-MM-DD
  totalChapters: number;
  revisedChapters: number;
  unrevisedChapters: number;
  createdAt: number;
}

export type PageType =
  | 'home'
  | 'tasks'
  | 'exams'
  | 'timer'
  | 'configure'
  | 'privacy'
  | 'terms'
  | 'about'
  | 'contact'
  | '404'
  | '500';

export type BackgroundTheme = 'midnight' | 'indigo' | 'slate';

export interface AppConfig {
  backgroundTheme: BackgroundTheme;
  defaultTimerMinutes: number;
  breakMinutes: number;
  soundChimeEnabled: boolean;
  chimeVolume: 'low' | 'medium' | 'high';
  autoStartBreak: boolean;
  viewDensity: 'comfortable' | 'compact';
}

export const DEFAULT_CONFIG: AppConfig = {
  backgroundTheme: 'midnight',
  defaultTimerMinutes: 25,
  breakMinutes: 5,
  soundChimeEnabled: true,
  chimeVolume: 'medium',
  autoStartBreak: false,
  viewDensity: 'comfortable',
};
