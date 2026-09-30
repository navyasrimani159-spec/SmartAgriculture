import React from 'react';
import {
  CloudSun,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  AlertTriangle,
  Compass,
  Thermometer,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';
import { BackButton } from '../components/BackButton';

export const WeatherPage: React.FC = () => {
  const { t, weather, setCurrentView } = useFarm();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* 1. Realistic Sky & Farm Background Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div
          className="h-64 sm:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url(${visualAssets.weather})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-950/70" />
        </div>

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <CloudSun className="w-3.5 h-3.5" />
              <span>Local Agro-Weather Intelligence</span>
            </div>
            <span className="text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              Station: Dharmapuri Field Node #4
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-6xl font-black text-white">{weather.temp}°C</span>
                <span className="text-lg text-emerald-400 font-bold">{weather.condition}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Localized agricultural weather tailored for smallholder irrigation scheduling and disease prevention.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950/70 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 block font-bold">Rain Prob.</span>
                <span className="text-lg font-black text-blue-400">{weather.rainProbability}%</span>
              </div>
              <div className="text-center px-2 border-l border-white/10">
                <span className="text-[10px] text-slate-400 block font-bold">Humidity</span>
                <span className="text-lg font-black text-cyan-400">{weather.humidity}%</span>
              </div>
              <div className="text-center px-2 border-l border-white/10">
                <span className="text-[10px] text-slate-400 block font-bold">Wind</span>
                <span className="text-lg font-black text-slate-200">{weather.windSpeed} km/h</span>
              </div>
              <div className="text-center px-2 border-l border-white/10">
                <span className="text-[10px] text-slate-400 block font-bold">UV Index</span>
                <span className="text-lg font-black text-amber-400">{weather.uvIndex}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Weather-Based Agronomic Recommendations */}
      <div className="rounded-3xl p-6 bg-slate-900/90 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Actionable Agricultural Advisories</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/30 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Low Rain Probability (24%)</span>
            </div>
            <p className="text-xs text-slate-300">
              Natural precipitation will not fulfill plant water demand today. Safe to irrigate Zone A immediately.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/30 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Moderate Heat Index</span>
            </div>
            <p className="text-xs text-slate-300">
              Peak temperature will reach 32°C at 14:00. Soil evaporation rate at 4.2 mm/day; monitor soil moisture more frequently.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-blue-500/30 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <Wind className="w-4 h-4" />
              <span>Calm Evening Wind (12 km/h)</span>
            </div>
            <p className="text-xs text-slate-300">
              Favorable low wind speeds after 16:30 for applying foliar bio-fertilizer or neem organic spray without spray drift.
            </p>
          </div>
        </div>
      </div>

      {/* 3. 7-Day Precision Forecast */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white">7-Day Agricultural Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weather.forecast.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border flex flex-col justify-between items-center text-center ${
                idx === 0
                  ? 'bg-slate-900 border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                  : 'bg-slate-900/60 border-white/5'
              }`}
            >
              <span className="text-xs font-bold text-slate-300">{item.day}</span>
              <div className="my-3">
                {item.rainProb > 50 ? (
                  <CloudRain className="w-7 h-7 text-blue-400 mx-auto" />
                ) : item.rainProb > 25 ? (
                  <CloudSun className="w-7 h-7 text-amber-300 mx-auto" />
                ) : (
                  <Sun className="w-7 h-7 text-amber-400 mx-auto" />
                )}
              </div>
              <div>
                <span className="text-sm font-black text-white">{item.tempMax}°</span>
                <span className="text-xs text-slate-400 ml-1">/ {item.tempMin}°</span>
              </div>
              <span className={`text-[10px] font-bold mt-2 px-2 py-0.5 rounded-full ${
                item.rainProb > 50 ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
              }`}>
                Rain: {item.rainProb}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
