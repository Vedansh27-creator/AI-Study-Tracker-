/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageType, Task, AppConfig, Exam } from './types.ts';
import {
  loadStoredTasks,
  saveStoredTasks,
  loadStoredExams,
  saveStoredExams,
  loadStoredConfig,
  saveStoredConfig,
  getTodayDateStr,
} from './utils/storage.ts';
import { HomePage } from './components/HomePage.tsx';
import { TasksPage } from './components/TasksPage.tsx';
import { ExamTrackerPage } from './components/ExamTrackerPage.tsx';
import { TimerPage } from './components/TimerPage.tsx';
import { ConfigurePage } from './components/ConfigurePage.tsx';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage.tsx';
import { TermsConditionsPage } from './components/TermsConditionsPage.tsx';
import { AboutUsPage } from './components/AboutUsPage.tsx';
import { ContactUsPage } from './components/ContactUsPage.tsx';
import { NotFoundPage } from './components/NotFoundPage.tsx';
import { ServerErrorPage } from './components/ServerErrorPage.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

interface AppProps {
  initialPage?: PageType;
}

export default function App({ initialPage }: AppProps = {}) {
  const validPages: PageType[] = [
    'home',
    'tasks',
    'exams',
    'timer',
    'configure',
    'privacy',
    'terms',
    'about',
    'contact',
    '404',
    '500',
  ];

  const getPageFromLocation = (): PageType => {
    if (initialPage && validPages.includes(initialPage)) {
      return initialPage;
    }
    try {
      // 1. Check data-page on #root
      const rootPage = document.getElementById('root')?.getAttribute('data-page') as PageType;
      if (rootPage && validPages.includes(rootPage)) {
        return rootPage;
      }

      // 2. Check pathname (e.g. /tasks/, /exams/, /about/, /contact/, /404.html, etc.)
      const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const pathSegment = pathname.split('/')[0].replace(/\.html$/, '');
      if (pathSegment && validPages.includes(pathSegment as PageType)) {
        return pathSegment as PageType;
      }

      // 3. Check hash (e.g. #tasks, #about, etc.)
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (hash && validPages.includes(hash as PageType)) {
        return hash as PageType;
      }

      // If at root path
      if (!pathname || pathname === 'index.html') {
        return 'home';
      }

      // Fallback for unknown path
      return '404';
    } catch {
      // fallback to home
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageType>(() => getPageFromLocation());
  const [tasks, setTasks] = useState<Task[]>(() => loadStoredTasks());
  const [exams, setExams] = useState<Exam[]>(() => loadStoredExams());
  const [config, setConfig] = useState<AppConfig>(() => loadStoredConfig());

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromLocation());
    };
    window.addEventListener('hashchange', handlePopState);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handlePopState);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const targetUrl = page === 'home' ? '/' : `/${page}/`;
    const currentClean = (window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0].replace(/\.html$/, '') || '');
    const targetClean = page === 'home' ? '' : page;

    if (currentClean !== targetClean) {
      try {
        window.location.href = targetUrl;
      } catch {
        window.history.pushState(null, '', targetUrl);
      }
    }
  };

  // Keep localStorage synced whenever tasks change
  useEffect(() => {
    saveStoredTasks(tasks);
  }, [tasks]);

  // Keep localStorage synced whenever exams change
  useEffect(() => {
    saveStoredExams(exams);
  }, [exams]);

  // Keep localStorage synced whenever config changes
  useEffect(() => {
    saveStoredConfig(config);
  }, [config]);

  // Task actions with immediate reactive state updates
  const handleAddTask = (
    title: string,
    subject?: string,
    estimatedMinutes?: number,
    dateStr?: string
  ) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title,
      completed: false,
      subject,
      estimatedMinutes,
      dateStr: dateStr || getTodayDateStr(),
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const isNowCompleted = !task.completed;
          return {
            ...task,
            completed: isNowCompleted,
            completedAt: isNowCompleted ? Date.now() : undefined,
          };
        }
        return task;
      })
    );
  };

  const handleClearCompletedTasks = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleClearAllTasks = () => {
    setTasks([]);
  };

  // Exam actions
  const handleAddExam = (examData: Omit<Exam, 'id' | 'createdAt'>) => {
    const newExam: Exam = {
      ...examData,
      id: `exam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: Date.now(),
    };
    setExams((prev) => [...prev, newExam]);
  };

  const handleUpdateExam = (id: string, updates: Partial<Exam>) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updates } : exam))
    );
  };

  const handleDeleteExam = (id: string) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  const handleUpdateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  // Background theme styling
  const getBgClass = () => {
    switch (config.backgroundTheme) {
      case 'indigo':
        return 'bg-[#0f172a] text-slate-100';
      case 'slate':
        return 'bg-[#131e36] text-slate-100';
      case 'midnight':
      default:
        return 'bg-[#11192e] text-slate-100';
    }
  };

  return (
    <ErrorBoundary onNavigate={handleNavigate}>
      <div
        id="app-root-wrapper"
        className={`min-h-screen w-full transition-colors duration-300 ${getBgClass()}`}
      >
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <HomePage
                onNavigate={handleNavigate}
                remainingTaskCount={tasks.filter((t) => !t.completed).length}
                totalTaskCount={tasks.length}
                examCount={exams.length}
              />
            </motion.div>
          )}

          {currentPage === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <TasksPage
                tasks={tasks}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'exams' && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ExamTrackerPage
                exams={exams}
                onAddExam={handleAddExam}
                onUpdateExam={handleUpdateExam}
                onDeleteExam={handleDeleteExam}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <TimerPage config={config} onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'configure' && (
            <motion.div
              key="configure"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ConfigurePage
                config={config}
                onUpdateConfig={handleUpdateConfig}
                onClearCompletedTasks={handleClearCompletedTasks}
                onClearAllTasks={handleClearAllTasks}
                totalTasks={tasks.length}
                completedTasks={tasks.filter((t) => t.completed).length}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentPage === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <PrivacyPolicyPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <TermsConditionsPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <AboutUsPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ContactUsPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === '404' && (
            <motion.div
              key="404"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <NotFoundPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === '500' && (
            <motion.div
              key="500"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ServerErrorPage onNavigate={handleNavigate} />
            </motion.div>
          )}

          {/* Catch-all fallback for any invalid or missing route */}
          {![
            'home',
            'tasks',
            'exams',
            'timer',
            'configure',
            'privacy',
            'terms',
            'about',
            'contact',
            '404',
            '500',
          ].includes(currentPage) && (
            <motion.div
              key="fallback-404"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <NotFoundPage onNavigate={handleNavigate} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}
