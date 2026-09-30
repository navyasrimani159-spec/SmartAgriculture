import React, { useState } from 'react';
import {
  BarChart3,
  Droplets,
  Zap,
  Sprout,
  Sun,
  Package,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { BackButton } from '../components/BackButton';

export const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Multi-day simulated analytics dataset
  const analyticsData7d = [
    { day: 'Day 1', waterL: 380, solarKwh: 4.8, health: 81, efficiency: 80 },
    { day: 'Day 2', waterL: 410, solarKwh: 5.2, health: 82, efficiency: 79 },
    { day: 'Day 3', waterL: 390, solarKwh: 5.0, health: 83, efficiency: 82 },
    { day: 'Day 4', waterL: 430, solarKwh: 5.6, health: 84, efficiency: 81 },
    { day: 'Day 5', waterL: 360, solarKwh: 4.9, health: 84, efficiency: 84 },
    { day: 'Day 6', waterL: 440, solarKwh: 5.1, health: 85, efficiency: 80 },
    { day: 'Day 7', waterL: 420, solarKwh: 5.4, health: 86, efficiency: 82 }
  ];

  const analyticsData30d = [
    { day: 'W1', waterL: 2650, solarKwh: 34.5, health: 78, efficiency: 76 },
    { day: 'W2', waterL: 2780, solarKwh: 36.2, health: 81, efficiency: 79 },
    { day: 'W3', waterL: 2820, solarKwh: 37.8, health: 83, efficiency: 81 },
    { day: 'W4', waterL: 2710, solarKwh: 36.4, health: 86, efficiency: 82 }
  ];

  const activeData = range === '7d' ? analyticsData7d : analyticsData30d;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Historical & Predictive Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Farm Performance Trends & Impact
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Multi-metric correlation between solar irradiation, volumetric irrigation efficiency, and crop vegetative vigor.
          </p>
        </div>

        {/* Time Filter Pills (Section 22 requirements: 7 days, 30 days, 90 days) */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-white/10 text-xs">
          {(['7d', '30d', '90d'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                range === r
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 4 Performance Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
          <span className="text-xs text-slate-400">Total Water Applied</span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
            {range === '7d' ? '2,830 L' : '10,960 L'}
          </div>
          <span className="text-[11px] text-emerald-400 block mt-1">18% Below Regional Avg</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
          <span className="text-xs text-slate-400">Solar Energy Harvested</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
            {range === '7d' ? '36.4 kWh' : '144.9 kWh'}
          </div>
          <span className="text-[11px] text-emerald-400 block mt-1">88% Self-Sufficiency</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
          <span className="text-xs text-slate-400">Irrigation Efficiency</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
            82 / 100
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">Consistent Drip Uniformity</span>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 shadow-xl">
          <span className="text-xs text-slate-400">Crop Health Progression</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">
            81% → 86%
          </div>
          <span className="text-[11px] text-emerald-400 block mt-1">+5% Biomass Growth</span>
        </div>
      </div>

      {/* Chart 1: Water Delivery vs Solar Energy Harvested */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase">Resource Synthesis</span>
            <h3 className="text-base font-bold text-white">Water Consumption (L) & Solar Generation (kWh)</h3>
          </div>
          <span className="text-xs text-slate-400">Pumping Coordinated With Peak Irradiance</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="waterL" name="Water Usage (Liters)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              <Bar dataKey="solarKwh" name="Solar Energy (kWh)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Crop Health & Irrigation Efficiency Correlation */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase">Agronomic Response</span>
            <h3 className="text-base font-bold text-white">Crop Health Index (%) vs Efficiency Score</h3>
          </div>
          <span className="text-xs text-slate-400">High Precision Correlation</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[70, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="health" name="Crop Health (%)" stroke="#10b981" strokeWidth={3} fill="url(#healthGrad)" />
              <Area type="monotone" dataKey="efficiency" name="Water Efficiency Score" stroke="#8b5cf6" strokeWidth={2.5} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
