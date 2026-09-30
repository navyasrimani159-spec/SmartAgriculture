import React from 'react';
import {
  Droplets,
  Sun,
  Sprout,
  ArrowRight,
  ShieldAlert,
  Play,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Clock
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';
import { DashboardWidgets } from '../components/DashboardWidgets';
import { BackButton } from '../components/BackButton';

export const DashboardPage: React.FC = () => {
  const {
    t,
    profile,
    setCurrentView,
    startSmartIrrigation,
    isIrrigating,
    zones
  } = useFarm();

  const zoneA = zones.find(z => z.id === 'zone-a') || zones[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* 1. Realistic Farm Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div
          className="h-56 sm:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${visualAssets.farmAerial})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-emerald-950/60" />
        </div>

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5" />
              <span>{profile.location}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Flowering Stage (Day 54) • 2.5 Acres</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {t('goodMorningFarmer')}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-slate-300">
              {t('farmNeedsToday')}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Action Banner: Zone A Irrigation Deficit */}
      {zoneA.soilMoisture < 35 && (
        <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-emerald-950/50 border border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Droplets className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  Action Recommended: Zone A Soil Moisture is at 32%
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">
                  Priority
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Optimal solar window active (3.4 kW available). 18-min drip cycle will restore moisture to 48%.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setCurrentView('irrigation')}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Review & Start</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Reorderable / Customizable Telemetry Widgets */}
      <DashboardWidgets />

      {/* 4. Quick Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Card 1: Precision Drip */}
        <div
          onClick={() => setCurrentView('irrigation')}
          className="rounded-2xl p-6 bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400">Zone A • Tomato</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              Smart Drip Controller
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Automated solenoid valves ensure root-targeted hydration while preserving 70L water daily.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
            <span>Manage Irrigation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Quick Card 2: Clean Solar */}
        <div
          onClick={() => setCurrentView('solar')}
          className="rounded-2xl p-6 bg-slate-900/80 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400">5 kW Array</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
              Solar Pumping Relay
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Generating 5.4 kWh with 88% solar coverage for water pumping. Zero fossil fuel footprint.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Solar Analytics</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Quick Card 3: Crop Health Intelligence */}
        <div
          onClick={() => setCurrentView('crop-health')}
          className="rounded-2xl p-6 bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-xs text-slate-400">86% Optimal</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
              Crop Health Intelligence
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Monitor NDVI canopy vigor, vegetative growth index, and leaf moisture across all field zones.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>View Crop Health</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
