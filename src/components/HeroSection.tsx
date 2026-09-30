import React from 'react';
import { Sprout, Droplets, Sun, CloudRain, ArrowRight, Compass } from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';

export const HeroSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  const { t, setCurrentView } = useFarm();

  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 border border-white/10 shadow-2xl">
      {/* Background Image with dark green overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105 hover:scale-100"
        style={{
          backgroundImage: `url(${visualAssets.hero})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-emerald-950/70 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-24 md:py-28 flex flex-col items-center text-center">
        {/* Eco Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-6 backdrop-blur-md">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>Smart Precision Agriculture • Solar Drip & Post-Harvest Resilience</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
          {t('tagLine')}
        </h1>

        {/* Subheading */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
          {t('subTitle')}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>{t('exploreSmartFarming')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-sm border border-white/20 backdrop-blur-md hover:scale-105 transition-all"
          >
            <span>{t('openMyFarm')}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </button>
        </div>

        {/* Floating Glassmorphic Telemetry Cards */}
        <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl text-left">
          {/* Card 1: Crop Health */}
          <div
            onClick={() => setCurrentView('crop-health')}
            className="glass-panel rounded-2xl p-4 cursor-pointer hover:border-emerald-400/50 hover:bg-slate-900/80 transition-all hover:-translate-y-1 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Sprout className="w-4 h-4 text-emerald-400" />
                🌱 {t('cropHealth')}
              </span>
            </div>
            <div className="text-2xl font-black text-white">86%</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">● {t('healthy')}</div>
          </div>

          {/* Card 2: Soil Moisture */}
          <div
            onClick={() => setCurrentView('irrigation')}
            className="glass-panel rounded-2xl p-4 cursor-pointer hover:border-cyan-400/50 hover:bg-slate-900/80 transition-all hover:-translate-y-1 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Droplets className="w-4 h-4 text-cyan-400" />
                💧 {t('soilMoisture')}
              </span>
            </div>
            <div className="text-2xl font-black text-white">42%</div>
            <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">● {t('optimal')}</div>
          </div>

          {/* Card 3: Solar Energy */}
          <div
            onClick={() => setCurrentView('solar')}
            className="glass-panel rounded-2xl p-4 cursor-pointer hover:border-amber-400/50 hover:bg-slate-900/80 transition-all hover:-translate-y-1 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Sun className="w-4 h-4 text-amber-400" />
                ☀️ {t('solarEnergy')}
              </span>
            </div>
            <div className="text-2xl font-black text-white">5.4 kWh</div>
            <div className="text-[11px] text-amber-400 font-semibold mt-0.5">● {t('generating')}</div>
          </div>

          {/* Card 4: Rain Probability */}
          <div
            onClick={() => setCurrentView('weather')}
            className="glass-panel rounded-2xl p-4 cursor-pointer hover:border-sky-400/50 hover:bg-slate-900/80 transition-all hover:-translate-y-1 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
              <span className="flex items-center gap-1.5 font-medium">
                <CloudRain className="w-4 h-4 text-sky-400" />
                🌧️ {t('weather')}
              </span>
            </div>
            <div className="text-2xl font-black text-white">24%</div>
            <div className="text-[11px] text-sky-300 font-semibold mt-0.5">● Low Rain Probability</div>
          </div>
        </div>
      </div>
    </div>
  );
};
