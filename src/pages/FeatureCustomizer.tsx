import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Check,
  CheckSquare,
  Square,
  Sparkles,
  Save,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { BackButton } from '../components/BackButton';

interface CustomizableTool {
  id: string;
  name: string;
  description: string;
  category: string;
}

const availableTools: CustomizableTool[] = [
  { id: 'soil-moisture', name: 'Smart Irrigation', description: 'Real-time root-zone moisture & precision drip trigger', category: 'Core' },
  { id: 'weather', name: 'Weather', description: 'Hyperlocal temperature, rain probability & wind advisories', category: 'Intelligence' },
  { id: 'crop-health', name: 'Crop Health', description: 'NDVI canopy vigor score & vegetative stress index', category: 'Intelligence' },
  { id: 'water-usage', name: 'Water Analytics', description: 'Daily volumetric consumption & conservation accounting', category: 'Core' },
  { id: 'solar-energy', name: 'Solar Energy', description: 'Clean agrivoltaics production & pump load balancing', category: 'Core' },
  { id: 'post-harvest', name: 'Post-Harvest', description: 'Cold storage temperature, humidity & mold risk alerts', category: 'Operations' },
  { id: 'market-information', name: 'Market Information', description: 'Indicative APMC mandi wholesale rates & trend tracking', category: 'Intelligence' },
  { id: 'energy-usage', name: 'Expenses', description: 'Agricultural input costs & financial ledger', category: 'Management' },
  { id: 'iot-devices', name: 'IoT Sensors', description: 'Connected LoRaWAN hardware nodes & battery telemetry', category: 'Operations' },
  { id: 'farm-calendar', name: 'Farm Calendar', description: 'Operations timeline for sowing, spraying & harvest', category: 'Operations' },
  { id: 'reports', name: 'Reports', description: 'Automated weekly sustainability and efficiency dossier', category: 'Management' }
];

export const FeatureCustomizer: React.FC = () => {
  const { selectedWidgets, setSelectedWidgets, setCurrentView } = useFarm();
  const [localSelection, setLocalSelection] = useState<string[]>(selectedWidgets);
  const [saveBanner, setSaveBanner] = useState(false);

  const toggleItem = (id: string) => {
    setLocalSelection(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setSelectedWidgets(localSelection);
    setSaveBanner(true);
    setTimeout(() => {
      setSaveBanner(false);
      setCurrentView('dashboard');
    }, 1200);
  };

  const handleSelectAll = () => {
    setLocalSelection(availableTools.map(t => t.id));
  };

  const handleResetDefaults = () => {
    const defaultWidgets = [
      'soil-moisture',
      'crop-health',
      'water-tank',
      'solar-energy',
      'weather',
      'pump',
      'water-usage',
      'energy-usage'
    ];
    setLocalSelection(defaultWidgets);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Dashboard Personalization</span>
          </div>
          {/* Section 5 Title Requirement */}
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Choose the tools you want on your dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Toggle modules on or off. Selected modules will be arranged on your executive dashboard and preserved in local storage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs text-slate-300 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Defaults</span>
          </button>
        </div>
      </div>

      {/* Save Alert Banner */}
      {saveBanner && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xl animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Dashboard preferences saved to LocalStorage! Redirecting to Dashboard...</span>
        </div>
      )}

      {/* Tools Checkboxes / Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableTools.map(tool => {
          const isChecked = localSelection.includes(tool.id);
          return (
            <div
              key={tool.id}
              onClick={() => toggleItem(tool.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none ${
                isChecked
                  ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-950/60 border-white/5 opacity-70 hover:opacity-100 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {tool.category}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'border border-white/20 text-transparent'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tool.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-semibold text-emerald-400">
                {isChecked ? '● Displaying on Dashboard' : '○ Hidden from Dashboard'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button Bar (Section 5 Requirement: "Save My Dashboard" button) */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-300">
          <strong className="text-emerald-400 font-bold">{localSelection.length} tools</strong> chosen for your personalized farm overview.
        </span>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all w-full sm:w-auto justify-center"
        >
          <Save className="w-4 h-4" />
          <span>Save My Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
