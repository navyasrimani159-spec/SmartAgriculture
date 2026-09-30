import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  Sparkles,
  Droplets,
  Sun,
  Sprout,
  ShieldAlert,
  Award,
  X
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { BackButton } from '../components/BackButton';

export const ReportsPage: React.FC = () => {
  const { profile, water, solar, zones, weather, alerts } = useFarm();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportModalOpen(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Farm Intelligence Reporting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Weekly Farm Sustainability Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comprehensive audit summarizing water savings, clean solar generation, irrigation events, and crop health status.
          </p>
        </div>

        {/* Section 23 Requirement: "Generate Report" button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Synthesizing...' : 'Generate Report'}</span>
        </button>
      </div>

      {/* Report Highlights Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Weekly Water Audit</span>
              <h4 className="text-lg font-bold text-white">2,830 L Delivered</h4>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Total of 490 Liters saved over traditional irrigation through root-zone deficit scheduling.
          </p>
        </div>

        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Solar Decarbonization</span>
              <h4 className="text-lg font-bold text-white">36.4 kWh Harvested</h4>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            100% of water pumping solar driven. 32.8 kg total CO2 emissions avoided this week.
          </p>
        </div>

        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Crop Health Index</span>
              <h4 className="text-lg font-bold text-white">86% Healthy</h4>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Flowering stage on track for Tomato. Estimated 800 kg first picking starting Sept 26.
          </p>
        </div>
      </div>

      {/* Report Generation Details Card */}
      <div className="rounded-3xl p-8 bg-slate-900 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase">Available Template</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                Weekly Audit #37
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">Weekly Farm Operations & Sustainability Dossier</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Covers: Water usage, Energy usage, Irrigation events, Crop health, Weather events, Alerts, and AI recommendations.
            </p>
          </div>

          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Open Report Preview</span>
          </button>
        </div>

        {/* Section Breakdown Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">1. Water Conservation Log</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">2. Solar Agrivoltaic Output</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">3. Precision Drip Cycles</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200">4. Crop Biomass & Phenology</span>
          </div>
        </div>
      </div>

      {/* Generated Report Printable Modal View */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-white/20 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            {/* Report Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">SmartAgri Weekly Farm Report</h3>
                  <p className="text-xs text-slate-400">
                    Farmer: {profile.farmerName} • Farm: {profile.farmName} • {profile.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  title="Print Report"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Section 1: Water & Energy Usage */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <Droplets className="w-4 h-4" />
                <span>1. Water & Energy Metrics</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Total weekly water delivered: <strong>2,830 Liters</strong> (Target was 2,450 L). Estimated savings over conventional furrow irrigation: <strong>490 L (18% efficiency)</strong>.
                Total solar generation: <strong>36.4 kWh</strong> with 88% dedicated to irrigation pump relays. Avoided grid emissions: <strong>32.8 kg CO2 equivalent</strong>.
              </p>
            </div>

            {/* Section 2: Irrigation Events */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>2. Irrigation Executions</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Zone A (Tomato): 6 precision drip cycles completed. Current soil moisture restored to 48% VWC.
                Zone B (Chilli): 4 cycles completed (optimal 46% moisture maintained).
                Zone C (Cotton): 3 cycles completed.
              </p>
            </div>

            {/* Section 3: Crop Health & Weather Events */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <Sprout className="w-4 h-4" />
                <span>3. Crop Health & Agrometeorology</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                NDVI vegetation score is <strong>0.86</strong> (healthy canopy, no signs of fungal or bacterial wilt). Average temperature: 29.2°C. Ambient humidity: 64%. Rainfall during reporting period: 0 mm; weekend showers predicted.
              </p>
            </div>

            {/* Section 4: Alerts & Automated Recommendations */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2 text-xs">
              <h4 className="text-sm font-bold text-purple-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>4. Incident Alerts & Agronomy Recommendations</span>
              </h4>
              <p className="text-slate-300 leading-relaxed">
                1 soil moisture deficit warning issued and resolved. Agronomy recommendation for upcoming week: Maintain 18-minute drip cycles during peak morning solar generation (06:30 - 08:30) and apply foliar calcium nitrate before Sept 20.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
