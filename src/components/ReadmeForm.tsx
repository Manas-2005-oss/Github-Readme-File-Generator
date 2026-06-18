import React, { useState } from 'react';
import { ReadmeData, TechItem, FeatureItem, InstallationStep } from '../types';
import { INITIAL_TECH_OPTIONS } from '../templates';
import { 
  Projector, Code, Layers, Hammer, Plus, Trash2, 
  Settings, Shield, Heart, FileCode, CheckCircle, Info, Link 
} from 'lucide-react';

interface ReadmeFormProps {
  data: ReadmeData;
  onChange: (updated: ReadmeData) => void;
  onAddToast: (text: string, type: 'success' | 'info' | 'error') => void;
}

export function ReadmeForm({ data, onChange, onAddToast }: ReadmeFormProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'tech' | 'features' | 'install' | 'extra'>('basic');
  const [customTechName, setCustomTechName] = useState('');
  const [customTechCategory, setCustomTechCategory] = useState('Frontend');

  // Helper to update specific root fields
  const updateField = (field: keyof ReadmeData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // --- Dynamic Operations: Tech Stack ---
  const handleTogglePresetTech = (name: string, category: string, badgeSeed: string) => {
    const exists = data.techStack.find((t) => t.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      // Remove
      const filtered = data.techStack.filter((t) => t.id !== exists.id);
      updateField('techStack', filtered);
      onAddToast(`Removed ${name} from Tech Stack`, 'info');
    } else {
      // Add
      const newItem: TechItem = {
        id: `t-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name,
        category,
        badgeUrl: badgeSeed
      };
      updateField('techStack', [...data.techStack, newItem]);
      onAddToast(`Added ${name} to Tech Stack`, 'success');
    }
  };

  const handleAddCustomTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTechName.trim()) return;

    const exists = data.techStack.find((t) => t.name.toLowerCase() === customTechName.trim().toLowerCase());
    if (exists) {
      onAddToast(`${customTechName} is already added.`, 'error');
      return;
    }

    const badgeHex = Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const newItem: TechItem = {
      id: `t-${Date.now()}`,
      name: customTechName.trim(),
      category: customTechCategory,
      badgeUrl: `${encodeURIComponent(customTechName.trim())}-${badgeHex}?style=for-the-badge`
    };

    updateField('techStack', [...data.techStack, newItem]);
    setCustomTechName('');
    onAddToast(`Added Custom Tech: ${newItem.name}`, 'success');
  };

  const handleRemoveTech = (id: string) => {
    updateField('techStack', data.techStack.filter((t) => t.id !== id));
  };

  // --- Dynamic Operations: Features ---
  const handleAddFeature = () => {
    const newItem: FeatureItem = {
      id: `f-${Date.now()}`,
      title: 'New Exciting Feature',
      description: 'Describe and analyze the key design principles driving this utility capability.'
    };
    updateField('features', [...data.features, newItem]);
  };

  const handleEditFeature = (id: string, key: 'title' | 'description', value: string) => {
    const updated = data.features.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    updateField('features', updated);
  };

  const handleRemoveFeature = (id: string) => {
    updateField('features', data.features.filter((item) => item.id !== id));
  };

  // --- Dynamic Operations: Installation Steps ---
  const handleAddInstallStep = () => {
    const newItem: InstallationStep = {
      id: `i-${Date.now()}`,
      command: 'npm run setup',
      description: 'Trigger the initialization workspace scripts.'
    };
    updateField('installation', [...data.installation, newItem]);
  };

  const handleEditInstallStep = (id: string, key: 'command' | 'description', value: string) => {
    const updated = data.installation.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    updateField('installation', updated);
  };

  const handleRemoveInstallStep = (id: string) => {
    updateField('installation', data.installation.filter((item) => item.id !== id));
  };

  // --- Dynamic Operations: Usage Steps ---
  const handleAddUsageStep = () => {
    const newItem = {
      id: `u-${Date.now()}`,
      title: 'Initialize Module',
      code: 'node start.js --port 8080',
      desc: 'Verify setup environment locally'
    };
    updateField('usageSteps', [...data.usageSteps, newItem]);
  };

  const handleEditUsageStep = (id: string, key: 'title' | 'code' | 'desc', value: string) => {
    const updated = data.usageSteps.map((item) => {
      if (item.id === id) {
        return { ...item, [key]: value };
      }
      return item;
    });
    updateField('usageSteps', updated);
  };

  const handleRemoveUsageStep = (id: string) => {
    updateField('usageSteps', data.usageSteps.filter((item) => item.id !== id));
  };


  return (
    <div className="flex flex-col gap-6 bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm dark:backdrop-blur-md">
      
      {/* Sub-Navigation (Tab Selection) */}
      <div className="flex flex-wrap border-b border-slate-200 dark:border-white/10 pb-2.5 gap-1.5 font-sans">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'basic'
              ? 'bg-slate-150 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b-2 border-blue-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Settings className="w-4 h-4 text-blue-500" />
          Basic Info
        </button>
        <button
          onClick={() => setActiveTab('tech')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'tech'
              ? 'bg-slate-150 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b-2 border-blue-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Layers className="w-4 h-4 text-emerald-500" />
          Tech Stack
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'features'
              ? 'bg-slate-150 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b-2 border-blue-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Code className="w-4 h-4 text-indigo-500" />
          Features
        </button>
        <button
          onClick={() => setActiveTab('install')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'install'
              ? 'bg-slate-150 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b-2 border-blue-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Hammer className="w-4 h-4 text-rose-500" />
          Installation
        </button>
        <button
          onClick={() => setActiveTab('extra')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'extra'
              ? 'bg-slate-150 dark:bg-slate-900 text-slate-900 dark:text-slate-50 border-b-2 border-blue-500'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
          }`}
        >
          <Shield className="w-4 h-4 text-amber-500" />
          Extra & License
        </button>
      </div>

      {/* --- TAB CONTENT: Basic Info --- */}
      {activeTab === 'basic' && (
        <div className="flex flex-col gap-4 animate-fade-in font-sans">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="projectName" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Project Name
              </label>
              <input
                id="projectName"
                type="text"
                value={data.projectName}
                onChange={(e) => updateField('projectName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="My Awesome App"
              />
            </div>

            {/* Tagline */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tagline" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Tagline / Sub-headline
              </label>
              <input
                id="tagline"
                type="text"
                value={data.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="A high-performance modern database toolkit."
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Project Description
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm leading-relaxed focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
              placeholder="Provide a detailed analysis explaining the goal of the library, the target audience, and architectural milestones."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Git Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="githubUser" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                GitHub Username
              </label>
              <input
                id="githubUser"
                type="text"
                value={data.githubUser}
                onChange={(e) => updateField('githubUser', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. manas-ippalpalli"
              />
            </div>

            {/* Git Repo name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="githubRepo" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Repository Name
              </label>
              <input
                id="githubRepo"
                type="text"
                value={data.githubRepo}
                onChange={(e) => updateField('githubRepo', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium text-sm focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g. react-ambient-audio"
              />
            </div>
          </div>

          {/* Logo & Alignment */}
          <div className="border border-slate-200 dark:border-white/10 rounded-xl p-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Projector className="w-4 h-4 text-blue-500" />
              Logo Configuration
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="logoUrl" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Logo Image URL (Optional)
                </label>
                <div className="relative">
                  <input
                    id="logoUrl"
                    type="url"
                    value={data.logoUrl}
                    onChange={(e) => updateField('logoUrl', e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:border-indigo-500"
                    placeholder="https://example.com/logo.png"
                  />
                  <Link className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Alignment
                </label>
                <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-0.5">
                  {(['left', 'center', 'right'] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => updateField('logoAlign', pos)}
                      className={`flex-1 py-1 text-xs font-semibold rounded-md capitalize transition-all ${
                        data.logoAlign === pos
                          ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 shadow-xs'
                          : 'text-zinc-500'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Badges Style chooser */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Shield.io Badge Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'flat', label: 'Flat' },
                { id: 'flat-square', label: 'Flat Square' },
                { id: 'plastic', label: 'Plastic' },
                { id: 'for-the-badge', label: 'For The Badge' },
                { id: 'social', label: 'Social' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => updateField('badgeStyle', style.id)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    data.badgeStyle === style.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* --- TAB CONTENT: Tech Stack --- */}
      {activeTab === 'tech' && (
        <div className="flex flex-col gap-5 animate-fade-in">
          <div>
            <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide mb-1">
              Popular Tech Quick-Add
            </h3>
            <p className="text-xs text-zinc-400">
              Click to quickly add or remove common framework Badges from your layout:
            </p>
          </div>

          {/* Quick grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INITIAL_TECH_OPTIONS.map((item) => {
              const isSelected = data.techStack.some((t) => t.name.toLowerCase() === item.sName.toLowerCase());
              return (
                <button
                  key={item.sName}
                  type="button"
                  onClick={() => handleTogglePresetTech(item.sName, item.sCategory, item.sBadge)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-xs'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <span>{item.sName}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
                </button>
              );
            })}
          </div>

          {/* Add custom tech */}
          <form onSubmit={handleAddCustomTech} className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-2 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex flex-col gap-1.5">
              <label htmlFor="customTechName" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Custom Tech Name
              </label>
              <input
                id="customTechName"
                type="text"
                value={customTechName}
                onChange={(e) => setCustomTechName(e.target.value)}
                placeholder="e.g. Svelte, GraphQL, Webpack"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-hidden focus:border-indigo-500"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 w-full sm:w-48">
              <label htmlFor="customTechCategory" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Category
              </label>
              <select
                id="customTechCategory"
                value={customTechCategory}
                onChange={(e) => setCustomTechCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 text-sm focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Languages">Languages</option>
                <option value="Tools">Developer Tools</option>
              </select>
            </div>

            <button
              type="submit"
              className="sm:self-end px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4.5 h-4.5" />
              Add Tech
            </button>
          </form>

          {/* Currently selected stack */}
          {data.techStack.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                Selected Stacks ({data.techStack.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {data.techStack.map((tech) => (
                  <div
                    key={tech.id}
                    className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 font-medium"
                  >
                    <span>{tech.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech.id)}
                      className="p-0.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-400 hover:text-rose-500 transition-colors"
                      title="Remove technology"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* --- TAB CONTENT: Features --- */}
      {activeTab === 'features' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Key Features Section
              </h3>
              <p className="text-xs text-zinc-400">
                Document individual features with detailed focus points.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {data.features.map((feature, idx) => (
              <div
                key={feature.id}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex gap-3 relative group"
              >
                <div className="flex flex-col gap-3 flex-1">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-1 text-xs font-mono font-bold text-zinc-400">
                      #{idx + 1}
                    </div>
                    <div className="col-span-11">
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleEditFeature(feature.id, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 font-bold text-sm focus:outline-hidden focus:border-indigo-500"
                        placeholder="Feature Title/Name"
                      />
                    </div>
                  </div>

                  <textarea
                    value={feature.description}
                    onChange={(e) => handleEditFeature(feature.id, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed focus:outline-hidden focus:border-indigo-500"
                    placeholder="Short description of why this represents high quality craftsmanship."
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFeature(feature.id)}
                  className="p-2 self-start rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  title="Delete Feature"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {data.features.length === 0 && (
              <div className="py-8 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                <p className="text-sm text-zinc-400 font-medium">No features added yet</p>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="mt-2 text-xs font-bold text-indigo-500 hover:underline"
                >
                  Click to add your first feature
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB CONTENT: Installation & Commands --- */}
      {activeTab === 'install' && (
        <div className="flex flex-col gap-5 animate-fade-in">
          
          {/* Installation Steps */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Step-by-step Installation
                </h3>
                <p className="text-xs text-zinc-400">
                  Formulate setup bash routines so dependencies compile smoothly.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddInstallStep}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Step
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {data.installation.map((step, idx) => (
                <div
                  key={step.id}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex gap-3"
                >
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-zinc-400">
                        Step {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={step.description}
                        onChange={(e) => handleEditInstallStep(step.id, 'description', e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-200 text-xs font-semibold focus:outline-hidden"
                        placeholder="Description of this action (e.g., Clone and configure)"
                      />
                    </div>
                    <textarea
                      value={step.command}
                      onChange={(e) => handleEditInstallStep(step.id, 'command', e.target.value)}
                      rows={2}
                      className="w-full p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-950-less dark:bg-zinc-900 focus:outline-hidden font-mono text-xs text-indigo-500 dark:text-teal-400 leading-normal"
                      placeholder="e.g. npm install && cp .example.env .env"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveInstallStep(step.id)}
                    className="p-2 self-start rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                    title="Remove step"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Usage description */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex flex-col gap-3">
            <div>
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Usage Instructions Block
              </h3>
              <p className="text-xs text-zinc-400">
                Type standard instructions or code blocks (Markdown supported).
              </p>
            </div>
            <textarea
              value={data.usage}
              onChange={(e) => updateField('usage', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm leading-relaxed"
              placeholder="Import and initialize the library as following..."
            />
          </div>

          {/* Core Command Recipes */}
          <div className="flex flex-col gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  Common Command Recipes (Usage Steps)
                </h4>
                <p className="text-xs text-zinc-400">
                  Highlight operational targets e.g. tests, lint runs, deployment scripts.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddUsageStep}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Recipe
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {data.usageSteps && data.usageSteps.map((recipe) => (
                <div
                  key={recipe.id}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50/50 dark:bg-zinc-900/30 flex gap-2.5"
                >
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <input
                      type="text"
                      value={recipe.title}
                      onChange={(e) => handleEditUsageStep(recipe.id, 'title', e.target.value)}
                      placeholder="Title (e.g. Run Linter)"
                      className="px-2.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 placeholder-zinc-400 font-semibold"
                    />
                    <input
                      type="text"
                      value={recipe.desc}
                      onChange={(e) => handleEditUsageStep(recipe.id, 'desc', e.target.value)}
                      placeholder="Context / description"
                      className="px-2.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 placeholder-zinc-400"
                    />
                    <input
                      type="text"
                      value={recipe.code}
                      onChange={(e) => handleEditUsageStep(recipe.id, 'code', e.target.value)}
                      placeholder="Terminal command string"
                      className="px-2.5 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-teal-400 font-mono placeholder-zinc-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveUsageStep(recipe.id)}
                    className="p-1.5 rounded hover:bg-rose-500/10 text-zinc-400 hover:text-rose-500"
                    title="Remove Recipe"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* --- TAB CONTENT: License & Extra Toggle Blocks --- */}
      {activeTab === 'extra' && (
        <div className="flex flex-col gap-5 animate-fade-in">
          
          {/* License Configuration */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-500 animate-pulse" />
              License Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="license" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  License Type
                </label>
                <select
                  id="license"
                  value={data.license}
                  onChange={(e) => updateField('license', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 text-sm focus:outline-hidden"
                >
                  <option value="MIT">MIT License</option>
                  <option value="Apache 2.0">Apache 2.0 License</option>
                  <option value="GPL v3">GNU GPL v3</option>
                  <option value="BSD 3-Clause">BSD 3-Clause</option>
                  <option value="Unlicense">Unlicense (Public Domain)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="licenseYear" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Copyright Year
                </label>
                <input
                  id="licenseYear"
                  type="text"
                  value={data.licenseYear}
                  onChange={(e) => updateField('licenseYear', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 text-sm focus:outline-hidden"
                  placeholder="e.g. 2026"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="licenseAuthor" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Owner / Author Name
                </label>
                <input
                  id="licenseAuthor"
                  type="text"
                  value={data.licenseAuthor}
                  onChange={(e) => updateField('licenseAuthor', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 text-sm"
                  placeholder="e.g. Manas Ippalpalli"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Author Email Accent (Visible in footer & license)
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 text-sm"
                placeholder="manasippalpalli758@gmail.com"
              />
            </div>
          </div>

          {/* Toggles and Additional optional sections */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">
              Toggle Optional Sections
            </h4>

            {/* Prerequisites */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${data.includePrerequisites ? 'bg-amber-400' : 'bg-zinc-300'}`} />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Include Prerequisites Block</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.includePrerequisites}
                  onChange={(e) => updateField('includePrerequisites', e.target.checked)}
                  className="w-4.5 h-4.5 text-indigo-600 rounded-md border-zinc-300 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              {data.includePrerequisites && (
                <textarea
                  value={data.prerequisites}
                  onChange={(e) => updateField('prerequisites', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-650"
                  placeholder="Highlight prerequisites, Node engine guidelines, system RAM conditions..."
                />
              )}
            </div>

            {/* Contributing */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${data.includeContributing ? 'bg-sky-400' : 'bg-zinc-300'}`} />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Include Contributing Information</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.includeContributing}
                  onChange={(e) => updateField('includeContributing', e.target.checked)}
                  className="w-4.5 h-4.5 text-indigo-600 rounded-md border-zinc-300 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              {data.includeContributing && (
                <textarea
                  value={data.contributing}
                  onChange={(e) => updateField('contributing', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-650"
                  placeholder="Set branch naming, pull-request structures, unit testing targets..."
                />
              )}
            </div>

            {/* Support */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${data.includeSupport ? 'bg-emerald-400' : 'bg-zinc-300'}`} />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Include Support Block</span>
                </div>
                <input
                  type="checkbox"
                  checked={data.includeSupport}
                  onChange={(e) => updateField('includeSupport', e.target.checked)}
                  className="w-4.5 h-4.5 text-indigo-600 rounded-md border-zinc-300 focus:ring-indigo-500 cursor-pointer"
                />
              </div>
              {data.includeSupport && (
                <textarea
                  value={data.supportText}
                  onChange={(e) => updateField('supportText', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-650"
                  placeholder="E.g. To support this blueprint star the project!"
                />
              )}
            </div>
            
          </div>

        </div>
      )}

    </div>
  );
}
