import { useState } from 'react';
import { Copy, Download, Eye, FileText, FileCode, Check, FileDown, Rocket, Layers, ShieldCheck, Terminal } from 'lucide-react';
import { ReadmeData, TemplateId } from '../types';
import { TEMPLATES } from '../templates';
import { MarkdownRenderer } from './MarkdownRenderer';
import { generateReadmeMarkdown } from '../utils';

interface ReadmePreviewProps {
  data: ReadmeData;
  rawMarkdownText: string;
  onRawMarkdownChange: (text: string) => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onAddToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export function ReadmePreview({
  data,
  rawMarkdownText,
  onRawMarkdownChange,
  onSelectTemplate,
  onAddToast,
}: ReadmePreviewProps) {
  const [previewTab, setPreviewTab] = useState<'visual' | 'code'>('visual');
  const [copied, setCopied] = useState(false);

  // Generate finalized Markdown contents
  const activeMarkdown = rawMarkdownText;

  // Handle Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(activeMarkdown);
    setCopied(true);
    onAddToast('README copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Free Download
  const handleDownload = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([activeMarkdown], { type: 'text/markdown;charset=utf-8' });
      element.href = URL.createObjectURL(file);
      element.download = 'README.md';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      onAddToast('README.md downloaded successfully!', 'success');
    } catch (err) {
      onAddToast('Failed to trigger download', 'error');
    }
  };

  const getTemplateIcon = (iconStr: string) => {
    switch (iconStr) {
      case 'Terminal':
        return <Terminal className="w-4 h-4 text-rose-500" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-emerald-500" />;
      case 'ShieldCheck':
        default:
        return <ShieldCheck className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">

      {/* 1. Template Selector Card */}
      <div className="bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:backdrop-blur-md">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 leading-none">
          Select Standard Template Baseline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TEMPLATES.map((tpl) => {
            const isSelected = data.projectName === tpl.data.projectName;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onSelectTemplate(tpl.id)}
                className={`flex flex-col items-start gap-1.5 p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/5 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getTemplateIcon(tpl.icon)}
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{tpl.name}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal line-clamp-2">
                  {tpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Live Preview Frame */}
      <div className="bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col dark:backdrop-blur-md">
        
        {/* Render Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/10 px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 gap-3">
          
          {/* Visual Render / Markdown source editor */}
          <div className="flex p-0.5 rounded-lg bg-slate-150 dark:bg-slate-900 border border-slate-200 dark:border-white/5 self-start">
            <button
              onClick={() => setPreviewTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                previewTab === 'visual'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Render</span>
            </button>
            <button
              onClick={() => setPreviewTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                previewTab === 'code'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Markdown Source</span>
            </button>
          </div>

          {/* Quick Operations (Copy & Download) */}
          <div className="flex items-center gap-2.5 font-sans">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-sans"
              title="Copy layout to system clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all font-sans"
              title="Download compiled README.md"
            >
              <Download className="w-4 h-4" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Dynamic Inner Body */}
        <div className="p-6 overflow-y-auto max-h-[640px] min-h-[460px] bg-white dark:bg-slate-950 select-text">
          {previewTab === 'visual' ? (
            activeMarkdown.trim() ? (
              <MarkdownRenderer markdown={activeMarkdown} />
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <FileText className="w-12 h-12 text-slate-300 dark:text-slate-800 mb-3" />
                <h4 className="text-sm font-bold text-slate-400">Empty State Detected</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Fill up information on the left panel or choose a high-quality template baseline.
                </p>
              </div>
            )
          ) : (
            <textarea
              value={activeMarkdown}
              onChange={(e) => onRawMarkdownChange(e.target.value)}
              className="w-full h-[580px] font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-950/25 border border-slate-100 dark:border-white/5 rounded-xl p-4 focus:outline-hidden focus:border-blue-500 resize-none"
              placeholder="# Write custom markdown here..."
            />
          )}
        </div>

      </div>

    </div>
  );
}
