import { FileText, Github, Moon, Sun, Laptop, Grid2X2, RefreshCw } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  editorMode: 'form' | 'raw';
  onChangeEditorMode: (mode: 'form' | 'raw') => void;
  onReset: () => void;
}

export function Header({
  isDarkMode,
  onToggleDarkMode,
  editorMode,
  onChangeEditorMode,
  onReset,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/10 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-md">
            <Github className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 leading-none font-sans">
              README<span className="text-sky-500 font-serif-italic normal-case">Gen</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-900">
                v2.0.4
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Frictionless GitHub README Builder
            </p>
          </div>
        </div>

        {/* Core Mode Selectors and Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-250 dark:border-white/5">
            <button
              onClick={() => onChangeEditorMode('form')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                editorMode === 'form'
                  ? 'bg-white dark:bg-slate-800 text-slate-905 dark:text-slate-50 shadow-xs'
                  : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Grid2X2 className="w-3.5 h-3.5" />
              <span>Interactive Form</span>
            </button>
            <button
              onClick={() => onChangeEditorMode('raw')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                editorMode === 'raw'
                  ? 'bg-white dark:bg-slate-800 text-slate-905 dark:text-slate-50 shadow-xs'
                  : 'text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Raw Editor</span>
            </button>
          </div>

          {/* Reset Action */}
          <button
            onClick={onReset}
            className="p-2 rounded-xl text-slate-550 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200 dark:border-white/5 transition-all flex items-center gap-1 text-sm font-medium"
            title="Reset to Template Baseline"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">Reset</span>
          </button>

          {/* Theme Toggler */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-250 dark:border-white/5 transition-all"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

        </div>

      </div>
    </header>
  );
}
