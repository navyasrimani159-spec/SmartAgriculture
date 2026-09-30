import React, { useState } from 'react';
import {
  Package,
  Thermometer,
  Droplets,
  Wind,
  ShieldCheck,
  AlertTriangle,
  Fan,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';
import { BackButton } from '../components/BackButton';

export const PostHarvestPage: React.FC = () => {
  const { postHarvest } = useFarm();
  const [ventilationActive, setVentilationActive] = useState(postHarvest.ventilationStatus === 'Active');
  const [targetTemp, setTargetTemp] = useState(postHarvest.targetTempCelsius);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* 1. Realistic Storage Warehouse Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div
          className="h-64 sm:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url(${visualAssets.postHarvest})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-amber-950/60" />
        </div>

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Package className="w-3.5 h-3.5" />
              <span>Cold Chain & Spoilage Prevention</span>
            </div>
            <span className="text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              Facility: {postHarvest.warehouseName}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Post-Harvest Storage & Loss Mitigation
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Real-time monitoring of chamber temperature, relative humidity, and carbon dioxide levels to extend shelf-life and eliminate smallholder post-harvest losses.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Telemetry Cards (Section 15 Requirements) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="rounded-3xl p-5 bg-slate-900 border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Storage Temp</span>
            <Thermometer className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{postHarvest.storageTempCelsius}°C</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">Target: {targetTemp}°C</span>
          </div>
        </div>

        <div className="rounded-3xl p-5 bg-slate-900 border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">{postHarvest.humidityPercent}%</span>
            <span className="text-[11px] text-emerald-400 block mt-0.5">Target: 65% RH</span>
          </div>
        </div>

        <div className="rounded-3xl p-5 bg-slate-900 border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Produce Stored</span>
            <Package className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-white">1,200 <span className="text-sm text-slate-400">kg</span></span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Capacity: 1,600 kg</span>
          </div>
        </div>

        <div className="rounded-3xl p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
            <span>Chamber Condition</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-emerald-300">Good</span>
            <span className="text-[11px] text-slate-300 block mt-0.5">Spoilage Risk: 12/100 (Low)</span>
          </div>
        </div>
      </div>

      {/* Storage Capacity Gauge & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Capacity Used */}
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase">Warehouse Utilization</span>
          <h3 className="text-base font-bold text-white">75% Capacity Occupied</h3>

          <div className="w-full h-4 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full w-[75%]" />
          </div>

          <div className="flex justify-between text-xs text-slate-400 pt-1">
            <span>1,200 kg Stored Produce</span>
            <span className="text-emerald-400 font-bold">400 kg Available Space</span>
          </div>
        </div>

        {/* Environmental Control Simulator */}
        <div className="lg:col-span-2 rounded-3xl p-6 bg-slate-900 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase">Atmosphere Control</span>
              <span className="text-[11px] text-slate-400">CO2 Sensor: 580 ppm (Safe)</span>
            </div>
            <h3 className="text-base font-bold text-white">Automated Fan & Compressor Relays</h3>
            <p className="text-xs text-slate-400 mt-1">
              Active ventilation expels ethylene gas generated by ripening tomatoes, preventing premature decay.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVentilationActive(!ventilationActive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                  ventilationActive
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 text-slate-400 border-white/10'
                }`}
              >
                <Fan className={`w-4 h-4 ${ventilationActive ? 'animate-spin text-emerald-400' : ''}`} />
                <span>Ventilation: {ventilationActive ? 'ON' : 'OFF'}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <span>Set Temp:</span>
                <button
                  onClick={() => setTargetTemp(t => Math.max(12, t - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold"
                >
                  -
                </button>
                <span className="font-bold px-1">{targetTemp}°C</span>
                <button
                  onClick={() => setTargetTemp(t => Math.min(24, t + 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Chamber Within Safe Preservation Zone</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
