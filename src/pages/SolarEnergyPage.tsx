import React from 'react';
import {
  Sun,
  Zap,
  Power,
  TrendingUp,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  BatteryCharging
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';
import { BackButton } from '../components/BackButton';

export const SolarEnergyPage: React.FC = () => {
  const { solar, pumpStatus, startSmartIrrigation, stopSmartIrrigation } = useFarm();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <BackButton fallbackView="home" />
      {/* 1. Realistic Solar Farm Background Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div
          className="h-64 sm:h-72 bg-cover bg-center"
          style={{ backgroundImage: `url(${visualAssets.solar})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-amber-950/70" />
        </div>

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold backdrop-blur-md">
              <Sun className="w-3.5 h-3.5" />
              <span>Clean Agrivoltaics Micro-Grid</span>
            </div>
            <span className="text-xs text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-white/10">
              5 kW Dual-Axis Ground Array
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Solar Energy & Decarbonized Pumping
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Decoupling agriculture from expensive diesel and grid outages. The solar inverter directly drives variable-frequency drip pumps during peak daylight hours.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Top Energy Balance Cards (Section 12 Requirements) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Solar Generated Today</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
              {solar.generatedTodayKWh} <span className="text-base text-slate-400">kWh</span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">● 3.4 kW Current Peak Output</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400">
            <Sun className="w-8 h-8" />
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Pump Consumed Today</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {solar.pumpConsumedKWh} <span className="text-base text-slate-400">kWh</span>
            </div>
            <span className="text-[11px] text-cyan-400 mt-1 block">● 100% Solar Powered Pumping</span>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Power className="w-8 h-8" />
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-bold uppercase">Remaining Clean Surplus</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-300 mt-1">
              {solar.remainingCleanKWh} <span className="text-base text-slate-300">kWh</span>
            </div>
            <span className="text-[11px] text-slate-300 mt-1 block">● Available for Cold Storage / Lighting</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300">
            <BatteryCharging className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* 3. Solar Generation vs Pump Consumption Curve */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase">Synchronized Diurnal Curve</span>
            <h3 className="text-base font-bold text-white">Solar Generation (kW) vs Pump Load (kW)</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>4.8 kg CO2 Emissions Avoided</span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={solar.generationHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="solarArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="pumpArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 6]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                formatter={(val: number) => [`${val} kW`]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="solarKw" name="Solar Generation (kW)" stroke="#f59e0b" strokeWidth={2.5} fill="url(#solarArea)" />
              <Area type="monotone" dataKey="pumpKw" name="Pump Electrical Draw (kW)" stroke="#06b6d4" strokeWidth={2.5} fill="url(#pumpArea)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Solar Inverter Specs */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">High-Efficiency Solar Inverter Specs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-slate-400">Inverter Model</span>
            <div className="text-sm font-bold text-white mt-1">Altivar Solar ATV312</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-slate-400">MPPT Tracking Efficiency</span>
            <div className="text-sm font-bold text-emerald-400 mt-1">99.2%</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-slate-400">Clean Energy Coverage</span>
            <div className="text-sm font-bold text-amber-400 mt-1">88% of Total Load</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5">
            <span className="text-slate-400">Grid Relay Status</span>
            <div className="text-sm font-bold text-slate-300 mt-1">Islanded / Zero Grid Draw</div>
          </div>
        </div>
      </div>
    </div>
  );
};
