import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEMPLATES } from './templates';
import { ReadmeData, TemplateId } from './types';
import { generateReadmeMarkdown } from './utils';

// Components
import { Header } from './components/Header';
import { ReadmeForm } from './components/ReadmeForm';
import { ReadmePreview } from './components/ReadmePreview';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';

// Icons for introductory statistics
import { Flame, Sparkles, CheckSquare, Clock } from 'lucide-react';

export default function App() {
  // 1. Theme state (Light Theme default with custom CSS class toggling)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_readme_pro');
      return saved === 'dark';
    }
    return false;
  });

  // 2. Editor Mode: form-driven variables vs direct raw text modifications
  const [editorMode, setEditorMode] = useState<'form' | 'raw'>('form');

  // 3. Central data structure
  const [data, setData] = useState<ReadmeData>(TEMPLATES[1].data); // default standard
  const [rawMarkdown, setRawMarkdown] = useState<string>('');

  // 4. Toast notifications list
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme_readme_pro', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Synchronize compiled Raw Markdown whenever form variables are customized
  useEffect(() => {
    const compiled = generateReadmeMarkdown(data);
    setRawMarkdown(compiled);
  }, [data]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    addToast(`Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // Select standard templates
  const handleSelectTemplate = (templateId: TemplateId) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setData(template.data);
      addToast(`Switched to ${template.name} Template`, 'success');
    }
  };

  // Reset helper
  const handleReset = () => {
    setData(TEMPLATES[1].data); // Back to standard default
    addToast('Reset to Standard baseline parameters', 'info');
  };

  // Add a brand-new Toast message helper
  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 antialiased selection:bg-blue-500/20">
      
      {/* Toast Notifications layer */}
      <ToastContainer toasts={toasts} onRemove={handleRemoveToast} />

      {/* Modern sticky header */}
      <Header
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        editorMode={editorMode}
        onChangeEditorMode={(mode) => {
          setEditorMode(mode);
          addToast(`Toggled ${mode === 'form' ? 'Interactive Form' : 'Raw Markdown Editor'} mode.`, 'info');
        }}
        onReset={handleReset}
      />

      {/* Main SaaS Stage container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-8">
        
        {/* Visual Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 px-8 py-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex flex-col gap-3 max-w-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-400 text-xs font-semibold self-start tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              Markdown Architect
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight font-sans">
              Create READMEs on <span className="font-serif-italic text-sky-400">Autopilot</span>
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Maintain professional, structured layouts that attract collaborators, validate installations, and catalog tech stacks.
            </p>
          </div>

          {/* Quick Metrics display */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0 select-none">
            {[
              { icon: <Sparkles className="w-4 h-4 text-emerald-400" />, label: "3+ Templates", sub: "Modular Tiers" },
              { icon: <CheckSquare className="w-4 h-4 text-sky-400" />, label: "Real Shields.io", sub: "SVG Badges" },
              { icon: <Clock className="w-4 h-4 text-amber-400" />, label: "Live Previews", sub: "Instant Mirror" },
              { icon: <Flame className="w-4 h-4 text-rose-400" />, label: "Pure Client Only", sub: "Local Sandbox" },
            ].map((metric, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <div className="p-2 rounded-xl bg-white/5 shrink-0">
                  {metric.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white leading-none">{metric.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">{metric.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Workspace Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Config Form / Interactive Fields */}
          <section className={`lg:col-span-12 lg:xl:col-span-5 ${editorMode === 'raw' ? 'opacity-40 pointer-events-none filter blur-xs selection:bg-transparent' : ''} transition-all duration-300`}>
            <div className="sticky top-28 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
                Configure Layout parameters
              </h3>
              <ReadmeForm
                data={data}
                onChange={setData}
                onAddToast={addToast}
              />
            </div>
          </section>

          {/* RIGHT: Live Visual Markdown previewer */}
          <section className={`${editorMode === 'raw' ? 'lg:col-span-12' : 'lg:col-span-12 lg:xl:col-span-7'} transition-all duration-300`}>
            <div className="sticky top-28 flex flex-col gap-4">
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">
                Live Document Output
              </h2>
              <ReadmePreview
                data={data}
                rawMarkdownText={rawMarkdown}
                onRawMarkdownChange={(newTxt) => {
                  setRawMarkdown(newTxt);
                  if (editorMode === 'form') {
                    // Switch mode silently if they typed directly
                    setEditorMode('raw');
                  }
                }}
                onSelectTemplate={handleSelectTemplate}
                onAddToast={addToast}
              />
            </div>
          </section>

        </div>

      </main>

      {/* Digital Heroes Footer (Structured constraints) */}
      <Footer />
    </div>
  );
}
