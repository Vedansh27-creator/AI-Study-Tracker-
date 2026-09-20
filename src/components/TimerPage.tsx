import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Hourglass,
  Flag,
} from 'lucide-react';
import { AppConfig, PageType } from '../types.ts';
import { HeaderNav } from './HeaderNav.tsx';
import { soundService } from '../utils/audio.ts';

interface TimerPageProps {
  config: AppConfig;
  onNavigate: (page: PageType) => void;
}

type Mode = 'timer' | 'stopwatch';

export const TimerPage: React.FC<TimerPageProps> = ({ config, onNavigate }) => {
  const [mode, setMode] = useState<Mode>('timer');

  // Timer mode state
  const [selectedDurationMins, setSelectedDurationMins] = useState<number>(
    config.defaultTimerMinutes || 25
  );
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number>(
    (config.defaultTimerMinutes || 25) * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerCompleted, setTimerCompleted] = useState<boolean>(false);
  const [customInputMins, setCustomInputMins] = useState<string>('');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);

  // Stopwatch mode state
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Sound preference
  const [soundMuted, setSoundMuted] = useState<boolean>(!config.soundChimeEnabled);

  // References for intervals
  const timerIntervalRef = useRef<number | null>(null);
  const stopwatchIntervalRef = useRef<number | null>(null);

  // Presets
  const presets = [
    { label: 'Pomodoro', mins: 25 },
    { label: 'Deep Study', mins: 50 },
    { label: 'Quick Review', mins: 15 },
    { label: 'Short Break', mins: config.breakMinutes || 5 },
  ];

  // Update timer remaining when default config changes if not running
  useEffect(() => {
    if (!isTimerRunning && timerRemainingSeconds === 25 * 60) {
      const newSec = config.defaultTimerMinutes * 60;
      setSelectedDurationMins(config.defaultTimerMinutes);
      setTimerRemainingSeconds(newSec);
    }
  }, [config.defaultTimerMinutes]);

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setIsTimerRunning(false);
            setTimerCompleted(true);
            if (!soundMuted) {
              soundService.playChime(config.chimeVolume);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, soundMuted, config.chimeVolume]);

  // Stopwatch Tick
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchIntervalRef.current = window.setInterval(() => {
        setStopwatchSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    }

    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
    };
  }, [isStopwatchRunning]);

  // Timer Controls
  const handleStartPauseTimer = () => {
    soundService.playSoftClick();
    if (timerRemainingSeconds === 0) {
      // If completed, reset to selected duration first
      setTimerRemainingSeconds(selectedDurationMins * 60);
      setTimerCompleted(false);
      setIsTimerRunning(true);
      return;
    }
    setIsTimerRunning(!isTimerRunning);
    setTimerCompleted(false);
  };

  const handleResetTimer = () => {
    soundService.playSoftClick();
    setIsTimerRunning(false);
    setTimerRemainingSeconds(selectedDurationMins * 60);
    setTimerCompleted(false);
  };

  const handleSelectPreset = (mins: number) => {
    soundService.playSoftClick();
    setIsTimerRunning(false);
    setSelectedDurationMins(mins);
    setTimerRemainingSeconds(mins * 60);
    setTimerCompleted(false);
  };

  const handleApplyCustomTime = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customInputMins, 10);
    if (!isNaN(val) && val > 0 && val <= 360) {
      handleSelectPreset(val);
      setShowCustomModal(false);
      setCustomInputMins('');
    }
  };

  // Stopwatch Controls
  const handleStartPauseStopwatch = () => {
    soundService.playSoftClick();
    setIsStopwatchRunning(!isStopwatchRunning);
  };

  const handleResetStopwatch = () => {
    soundService.playSoftClick();
    setIsStopwatchRunning(false);
    setStopwatchSeconds(0);
    setLaps([]);
  };

  const handleRecordLap = () => {
    soundService.playSoftClick();
    setLaps((prev) => [stopwatchSeconds, ...prev]);
  };

  // Formatting helpers
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Progress percentage for Timer
  const totalTargetSecs = selectedDurationMins * 60;
  const progressFraction =
    totalTargetSecs > 0 ? (totalTargetSecs - timerRemainingSeconds) / totalTargetSecs : 0;
  const circumference = 2 * Math.PI * 130;
  const strokeDashoffset = circumference - progressFraction * circumference;

  return (
    <div className="min-h-screen w-full flex flex-col pb-16">
      <HeaderNav
        currentPage="timer"
        onNavigate={onNavigate}
        title="Stopwatch / Timer"
        subtitle="Focus timer and session tracking"
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col items-center justify-center mt-2">
        {/* Mode Switcher Pill */}
        <div
          id="timer-mode-switcher"
          className="w-full max-w-sm flex items-center justify-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-[#14203a] border border-blue-900/50 mb-6 sm:mb-8 shadow-inner"
        >
          <button
            id="tab-mode-timer"
            type="button"
            onClick={() => {
              setMode('timer');
              soundService.playSoftClick();
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium min-h-[42px] transition-all duration-200 cursor-pointer ${
              mode === 'timer'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-300 hover:text-white hover:bg-blue-900/30'
            }`}
          >
            <Hourglass className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Countdown Timer</span>
          </button>

          <button
            id="tab-mode-stopwatch"
            type="button"
            onClick={() => {
              setMode('stopwatch');
              soundService.playSoftClick();
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium min-h-[42px] transition-all duration-200 cursor-pointer ${
              mode === 'stopwatch'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                : 'text-slate-300 hover:text-white hover:bg-blue-900/30'
            }`}
          >
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Stopwatch</span>
          </button>
        </div>

        {/* Main Display Container */}
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
          {mode === 'timer' ? (
            /* Timer View */
            <div className="w-full flex flex-col items-center">
              {/* Presets Row */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 w-full px-1">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => handleSelectPreset(p.mins)}
                    disabled={isTimerRunning}
                    className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[36px] disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedDurationMins === p.mins
                        ? 'bg-sky-600 text-white border border-sky-400/40 shadow-sm'
                        : 'bg-[#162442] hover:bg-[#1f315a] text-slate-300 border border-blue-900/40'
                    }`}
                  >
                    {p.mins}m ({p.label})
                  </button>
                ))}
                <button
                  onClick={() => setShowCustomModal(true)}
                  disabled={isTimerRunning}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-[#162442] hover:bg-[#1f315a] text-slate-300 border border-blue-900/40 transition-colors disabled:opacity-50 cursor-pointer min-h-[36px]"
                >
                  + Custom
                </button>
              </div>

              {/* Circular Gauge / Center Time Display */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 max-w-[82vw] max-h-[82vw] flex items-center justify-center mb-6 sm:mb-8">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
                  {/* Track ring */}
                  <circle
                    cx="150"
                    cy="150"
                    r="130"
                    className="stroke-blue-950/70 fill-transparent"
                    strokeWidth="10"
                  />
                  {/* Active progress ring */}
                  <circle
                    cx="150"
                    cy="150"
                    r="130"
                    className="stroke-sky-400 fill-transparent transition-all duration-500 ease-out"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Centered digits */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <span
                    id="timer-time-display"
                    className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-white tabular-nums select-none"
                  >
                    {formatTime(timerRemainingSeconds)}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
                    {isTimerRunning
                      ? 'Studying...'
                      : timerCompleted
                      ? 'Session Complete!'
                      : `${selectedDurationMins} Minute Goal`}
                  </span>
                </div>
              </div>

              {/* Completion Notification */}
              <AnimatePresence>
                {timerCompleted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full mb-6 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-center flex flex-col items-center gap-1.5 shadow-lg"
                  >
                    <div className="flex items-center gap-2 font-semibold text-emerald-100">
                      <Sparkles className="w-5 h-5 text-emerald-300" />
                      <span>Focus Session Completed!</span>
                    </div>
                    <p className="text-xs text-emerald-300/80">
                      Great job taking time for your learning today. Stretch or take a gentle break.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 w-full max-w-xs">
                {/* Reset Button */}
                <button
                  id="btn-timer-reset"
                  type="button"
                  onClick={handleResetTimer}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#162340] hover:bg-[#1e2f56] text-slate-300 hover:text-white border border-blue-900/50 transition-colors shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                  aria-label="Reset Timer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Primary Start/Pause Button */}
                <button
                  id="btn-timer-start-pause"
                  type="button"
                  onClick={handleStartPauseTimer}
                  className={`flex-1 py-3.5 sm:py-4 px-6 rounded-2xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50 ${
                    isTimerRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/40'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{timerRemainingSeconds < selectedDurationMins * 60 ? 'Resume' : 'Start'}</span>
                    </>
                  )}
                </button>

                {/* Sound Mute Toggle */}
                <button
                  id="btn-timer-sound-toggle"
                  type="button"
                  onClick={() => {
                    setSoundMuted(!soundMuted);
                    soundService.playSoftClick();
                  }}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-colors shadow-md cursor-pointer focus:outline-none ${
                    soundMuted
                      ? 'bg-[#141d34] text-slate-500 border-blue-950/60'
                      : 'bg-[#162340] hover:bg-[#1e2f56] text-sky-300 border-blue-900/50'
                  }`}
                  aria-label={soundMuted ? 'Unmute timer chime' : 'Mute timer chime'}
                  title={soundMuted ? 'Unmute timer chime' : 'Mute timer chime'}
                >
                  {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ) : (
            /* Stopwatch View */
            <div className="w-full flex flex-col items-center">
              {/* Center Time Display */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 max-w-[82vw] max-h-[82vw] rounded-full border-4 border-blue-800/40 bg-[#14203a]/50 flex flex-col items-center justify-center mb-6 sm:mb-8 shadow-xl shadow-black/20">
                <span
                  id="stopwatch-time-display"
                  className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-white tabular-nums select-none"
                >
                  {formatTime(stopwatchSeconds)}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
                  {isStopwatchRunning ? 'Elapsed Focus Time' : 'Stopwatch Paused'}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-xs mb-6 sm:mb-8 px-2">
                {/* Reset Button */}
                <button
                  id="btn-stopwatch-reset"
                  type="button"
                  onClick={handleResetStopwatch}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#162340] hover:bg-[#1e2f56] text-slate-300 hover:text-white border border-blue-900/50 transition-colors shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/40 min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Reset Stopwatch"
                  title="Reset Stopwatch"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                {/* Start / Pause */}
                <button
                  id="btn-stopwatch-start-pause"
                  type="button"
                  onClick={handleStartPauseStopwatch}
                  className={`flex-1 py-3.5 sm:py-4 px-4 sm:px-6 min-h-[48px] rounded-2xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50 ${
                    isStopwatchRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30'
                      : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/40'
                  }`}
                >
                  {isStopwatchRunning ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" />
                      <span>{stopwatchSeconds > 0 ? 'Resume' : 'Start'}</span>
                    </>
                  )}
                </button>

                {/* Lap Button */}
                <button
                  id="btn-stopwatch-lap"
                  type="button"
                  onClick={handleRecordLap}
                  disabled={!isStopwatchRunning}
                  className="p-3.5 sm:p-4 rounded-2xl bg-[#162340] hover:bg-[#1e2f56] text-indigo-300 hover:text-indigo-200 border border-blue-900/50 transition-colors shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-400/40 min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Record Lap / Interval"
                  title="Record Interval"
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Laps List */}
              {laps.length > 0 && (
                <div className="w-full max-w-sm rounded-2xl bg-[#14203a]/60 border border-blue-900/40 p-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Recorded Study Intervals
                  </h4>
                  <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                    {laps.map((lapSeconds, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-blue-950/40 text-slate-300"
                      >
                        <span className="text-slate-500">Interval #{laps.length - index}</span>
                        <span className="font-mono font-medium text-white">
                          {formatTime(lapSeconds)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Custom Duration Modal */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-[#182442] border border-blue-800/60 p-6 shadow-2xl"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Set Custom Timer</h3>
              <p className="text-xs text-slate-300 mb-4">
                Enter your study duration in minutes (1 to 360).
              </p>
              <form onSubmit={handleApplyCustomTime}>
                <input
                  type="number"
                  min="1"
                  max="360"
                  value={customInputMins}
                  onChange={(e) => setCustomInputMins(e.target.value)}
                  placeholder="e.g. 40"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] border border-blue-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  autoFocus
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium cursor-pointer"
                  >
                    Apply Duration
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
