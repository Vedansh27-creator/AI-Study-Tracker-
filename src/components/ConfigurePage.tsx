import React, { useState } from 'react';
import {
  Settings,
  Volume2,
  Clock,
  Palette,
  Database,
  RotateCcw,
  Trash2,
  Check,
  Sparkles,
  Compass,
  AlertTriangle,
  Bug,
} from 'lucide-react';
import { AppConfig, BackgroundTheme, PageType, DEFAULT_CONFIG } from '../types.ts';
import { HeaderNav } from './HeaderNav.tsx';
import { soundService } from '../utils/audio.ts';

interface ConfigurePageProps {
  config: AppConfig;
  onUpdateConfig: (newConfig: Partial<AppConfig>) => void;
  onClearCompletedTasks: () => void;
  onClearAllTasks: () => void;
  totalTasks: number;
  completedTasks: number;
  onNavigate: (page: PageType) => void;
}

const TIMER_OPTIONS = [15, 20, 25, 30, 45, 50, 60];
const BREAK_OPTIONS = [5, 10, 15];

const THEMES: { id: BackgroundTheme; name: string; desc: string; previewBg: string }[] = [
  {
    id: 'midnight',
    name: 'Midnight Navy',
    desc: 'Calm, focused medium-dark navy',
    previewBg: 'bg-[#11192e]',
  },
  {
    id: 'indigo',
    name: 'Deep Indigo',
    desc: 'Gentle night sky with a soft blue tint',
    previewBg: 'bg-[#0f172a]',
  },
  {
    id: 'slate',
    name: 'Cozy Slate',
    desc: 'Muted slate blue for comfortable reading',
    previewBg: 'bg-[#131e36]',
  },
];

export const ConfigurePage: React.FC<ConfigurePageProps> = ({
  config,
  onUpdateConfig,
  onClearCompletedTasks,
  onClearAllTasks,
  totalTasks,
  completedTasks,
  onNavigate,
}) => {
  const [showConfirmResetAll, setShowConfirmResetAll] = useState(false);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);
  const [simulateCrash, setSimulateCrash] = useState(false);

  if (simulateCrash) {
    throw new Error('Simulated 500 runtime error triggered from Settings diagnostic panel.');
  }

  const notifySaved = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 2500);
  };

  const handleTestChime = () => {
    soundService.playChime(config.chimeVolume);
  };

  return (
    <div className="min-h-screen w-full flex flex-col pb-16">
      <HeaderNav
        currentPage="configure"
        onNavigate={onNavigate}
        title="Configure"
        subtitle="Study preferences and appearance settings"
      />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex-1 flex flex-col gap-6 mt-2">
        {/* Saved Toast */}
        {saveBanner && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveBanner}</span>
          </div>
        )}

        {/* Section 1: Study Preferences */}
        <div className="rounded-2xl bg-[#16223e] border border-blue-900/50 p-5 sm:p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/40">
            <div className="p-1.5 rounded-lg bg-sky-950/60 border border-sky-800/40 text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Study Preferences</h3>
              <p className="text-xs text-slate-400">Configure your default focus and break lengths</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Default Timer Duration */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                Default Focus Session Length
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {TIMER_OPTIONS.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      onUpdateConfig({ defaultTimerMinutes: mins });
                      soundService.playSoftClick();
                      notifySaved(`Default session set to ${mins} minutes`);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      config.defaultTimerMinutes === mins
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-[#101a30] hover:bg-[#1b2b4e] text-slate-300 border border-blue-900/40'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            {/* Break Length */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                Short Break Length
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {BREAK_OPTIONS.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      onUpdateConfig({ breakMinutes: mins });
                      soundService.playSoftClick();
                      notifySaved(`Break length set to ${mins} minutes`);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      config.breakMinutes === mins
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-[#101a30] hover:bg-[#1b2b4e] text-slate-300 border border-blue-900/40'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Appearance & Atmosphere */}
        <div className="rounded-2xl bg-[#16223e] border border-blue-900/50 p-5 sm:p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/40">
            <div className="p-1.5 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Appearance & Atmosphere</h3>
              <p className="text-xs text-slate-400">Medium-dark blue tones crafted for eye comfort</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onUpdateConfig({ backgroundTheme: theme.id });
                  soundService.playSoftClick();
                  notifySaved(`Theme set to ${theme.name}`);
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  config.backgroundTheme === theme.id
                    ? 'border-sky-400 bg-[#1b2b4e] shadow-md shadow-black/20 ring-1 ring-sky-400/40'
                    : 'border-blue-900/40 bg-[#121c32] hover:bg-[#182644]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-6 h-6 rounded-full border border-slate-600 ${theme.previewBg}`}
                  />
                  {config.backgroundTheme === theme.id && (
                    <span className="p-0.5 rounded-full bg-sky-500 text-white">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <div className="font-medium text-sm text-white">{theme.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{theme.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Sound & Notifications */}
        <div className="rounded-2xl bg-[#16223e] border border-blue-900/50 p-5 sm:p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/40">
            <div className="p-1.5 rounded-lg bg-indigo-950/60 border border-indigo-800/40 text-indigo-400">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Sound & Audio</h3>
              <p className="text-xs text-slate-400">Calming completion chime synthesizer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-200 block">
                  Play Chime on Completion
                </span>
                <span className="text-xs text-slate-400">
                  Plays a soothing harmonic bell when the timer finishes or a task is checked
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = !config.soundChimeEnabled;
                  onUpdateConfig({ soundChimeEnabled: updated });
                  soundService.playSoftClick();
                  notifySaved(updated ? 'Chime enabled' : 'Chime muted');
                }}
                className={`w-12 h-6.5 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  config.soundChimeEnabled ? 'bg-sky-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                    config.soundChimeEnabled ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {config.soundChimeEnabled && (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-blue-950/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Chime Volume:</span>
                  {(['low', 'medium', 'high'] as const).map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => {
                        onUpdateConfig({ chimeVolume: vol });
                        soundService.playChime(vol);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs capitalize cursor-pointer ${
                        config.chimeVolume === vol
                          ? 'bg-sky-600 text-white'
                          : 'bg-[#121c32] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleTestChime}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121c32] hover:bg-[#1a294a] text-sky-300 text-xs font-medium border border-blue-900/50 cursor-pointer self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Test Chime Tone</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Data Management */}
        <div className="rounded-2xl bg-[#16223e] border border-blue-900/50 p-5 sm:p-6 shadow-lg shadow-black/20">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-blue-900/40">
            <div className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-800/40 text-rose-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white">Data & Storage</h3>
              <p className="text-xs text-slate-400">Stored safely on your local browser</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs text-slate-300">
              Currently holding <span className="font-semibold text-white">{totalTasks}</span> tasks ({completedTasks} completed).
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClearCompletedTasks();
                  soundService.playSoftClick();
                  notifySaved('Cleared completed tasks');
                }}
                disabled={completedTasks === 0}
                className="px-3.5 py-2 rounded-xl bg-[#121c32] hover:bg-[#1c2c4e] disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs font-medium border border-blue-900/50 cursor-pointer transition-colors"
              >
                Clear Completed Tasks ({completedTasks})
              </button>

              <button
                type="button"
                onClick={() => {
                  onUpdateConfig(DEFAULT_CONFIG);
                  soundService.playSoftClick();
                  notifySaved('Settings reset to defaults');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#121c32] hover:bg-[#1c2c4e] text-slate-300 text-xs font-medium border border-blue-900/50 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Settings to Defaults</span>
              </button>

              {!showConfirmResetAll ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmResetAll(true)}
                  disabled={totalTasks === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 disabled:opacity-40 disabled:cursor-not-allowed text-rose-300 text-xs font-medium border border-rose-900/40 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Tasks</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 p-1 bg-rose-950/60 rounded-xl border border-rose-700/50">
                  <span className="text-xs text-rose-200 px-2">Are you sure?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClearAllTasks();
                      setShowConfirmResetAll(false);
                      soundService.playSoftClick();
                      notifySaved('All tasks cleared');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium cursor-pointer"
                  >
                    Yes, Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmResetAll(false)}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: System Diagnostics & Error Pages */}
          <div
            id="cfg-error-pages-card"
            className="p-5 sm:p-6 rounded-2xl bg-[#15213b] border border-blue-800/40 shadow-lg space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-700/40 text-sky-300">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">System Error Pages &amp; Diagnostics</h2>
                <p className="text-xs text-slate-400">
                  Preview dedicated 404 (Not Found) and 500 (System Error) views
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                type="button"
                id="cfg-preview-404-btn"
                onClick={() => onNavigate('404')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#121c32] hover:bg-[#1c2c4e] text-sky-300 hover:text-white text-xs font-medium border border-blue-900/50 cursor-pointer transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span>View 404 Error Page</span>
              </button>

              <button
                type="button"
                id="cfg-preview-500-btn"
                onClick={() => onNavigate('500')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#121c32] hover:bg-[#1c2c4e] text-rose-300 hover:text-white text-xs font-medium border border-rose-900/40 cursor-pointer transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>View 500 Error Page</span>
              </button>

              <button
                type="button"
                id="cfg-simulate-crash-btn"
                onClick={() => setSimulateCrash(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-medium border border-rose-800/50 cursor-pointer transition-colors"
              >
                <Bug className="w-3.5 h-3.5 text-rose-400" />
                <span>Simulate Crash (Test ErrorBoundary)</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
