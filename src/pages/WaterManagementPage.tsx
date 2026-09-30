import React, { useState } from 'react';
import {
  Waves,
  Droplets,
  TrendingDown,
  Award,
  ArrowDownRight,
  PieChart as PieIcon,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { BackButton } from '../components/BackButton';

export const WaterManagementPage: React.FC = () => {
  const { water } = useFarm();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const zonePieData = [
    { name: 'Zone A (Tomato)', value: 240, color: '#10b981' },
    { name: 'Zone B (Chilli)', value: 110, color: '#06b6d4' },
    { name: 'Zone C (Cotton)', value: 70, color: '#f59e0b' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Waves className="w-4 h-4" />
            <span>Resource Accounting & Conservation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Water Management & Savings Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Precision volumetric flow meters tracking daily delivery, soil deficit matching, and avoided run-off loss.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Water Efficiency Score: <strong className="text-cyan-400 font-bold">82 / 100</strong> (Target: 80+)</span>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Today's Actual Usage</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {water.todayUsageLiters} <span className="text-base text-slate-400">Liters</span>
            </div>
            <span className="text-[11px] text-cyan-400 mt-1 block">● 2.5 Acres Total Farm</span>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Droplets className="w-8 h-8" />
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium">Agronomic Recommendation</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              {water.recommendedUsageLiters} <span className="text-base text-slate-400">Liters</span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">● Evapotranspiration Target</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
        </div>

        <div className="rounded-3xl p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-400 font-bold uppercase">Potential Water Saved</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-300 mt-1">
              {water.potentialSavingsLiters} <span className="text-base text-slate-300">Liters</span>
            </div>
            <span className="text-[11px] text-slate-300 mt-1 block">● Over traditional flood irrigation</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300">
            <TrendingDown className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actual vs Recommended History Chart */}
        <div className="lg:col-span-2 rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase">Consumption Timeline</span>
              <h3 className="text-base font-bold text-white">Daily Water Application vs Target (Liters)</h3>
            </div>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
              {(['daily', 'weekly', 'monthly'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                    timeframe === tf ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={water.weeklyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 500]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: number) => [`${val} Liters`]}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="actualL" name="Delivered Water (L)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="recommendedL" name="Crop Target (L)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Where Water is Being Consumed (Zone Breakdown) */}
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase">Acreage Allocation</span>
            <h3 className="text-base font-bold text-white">Consumption by Zone</h3>
            <p className="text-xs text-slate-400 mt-1">Today's 420 L distribution across field sections.</p>

            <div className="h-44 w-full my-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={zonePieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {zonePieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    formatter={(val: number) => [`${val} L`, 'Volume']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-3 text-xs">
            {zonePieData.map((z, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: z.color }} />
                  <span className="text-slate-300">{z.name}</span>
                </div>
                <span className="font-bold text-white">{z.value} L</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
