import React from 'react';
import {
  FlaskConical,
  Layers,
  Sparkles,
  Droplets,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';
import { BackButton } from '../components/BackButton';

const npkData = [
  { nutrient: 'Nitrogen (N)', current: 142, optimal: 150, unit: 'kg/ha', status: 'Optimal' },
  { nutrient: 'Phosphorus (P)', current: 38, optimal: 40, unit: 'kg/ha', status: 'Good' },
  { nutrient: 'Potassium (K)', current: 210, optimal: 200, unit: 'kg/ha', status: 'Abundant' }
];

export const SoilIntelligencePage: React.FC = () => {
  const { zones, activeZone, setActiveZoneId } = useFarm();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            <span>Rhizosphere & Nutrient Profiling</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Soil Intelligence & Microbiome Health
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Subsurface IoT probe analytics measuring volumetric water content, soil pH, electrical conductivity, and available N-P-K.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Soil Health Index: <strong className="text-emerald-400 font-bold">78/100</strong> (Good Loamy Condition)</span>
        </div>
      </div>

      {/* Top Banner with Soil Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Soil Health Score Widget */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase">Composite Index</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Class A Loam
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">78</span>
              <span className="text-xl font-bold text-slate-400">/ 100</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Arun’s red sandy loam demonstrates balanced microbial activity and good aeration. Recommended organic carbon enrichment in post-harvest.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60">
              <span className="text-slate-400 block text-[11px]">Soil pH</span>
              <span className="font-black text-white text-base">6.8 (Neutral)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60">
              <span className="text-slate-400 block text-[11px]">Organic Carbon</span>
              <span className="font-black text-emerald-400 text-base">0.72% (Healthy)</span>
            </div>
          </div>
        </div>

        {/* N-P-K Nutrients Chart */}
        <div className="lg:col-span-2 rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase">Electrochemical Sensors</span>
              <h3 className="text-base font-bold text-white">Available Macronutrients (kg/ha)</h3>
            </div>
            <span className="text-xs text-slate-400">Last Calibrated: 2 days ago</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={npkData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 240]} />
                <YAxis dataKey="nutrient" type="category" stroke="#64748b" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                  formatter={(val: number) => [`${val} kg/ha`, 'Active Level']}
                />
                <Bar dataKey="current" fill="#10b981" radius={[0, 8, 8, 0]} barSize={20}>
                  {npkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : index === 1 ? '#06b6d4' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-around text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">● Nitrogen: 142 kg/ha (95% target)</span>
            <span className="flex items-center gap-1.5 text-cyan-400">● Phosphorus: 38 kg/ha (95% target)</span>
            <span className="flex items-center gap-1.5 text-amber-400">● Potassium: 210 kg/ha (105% target)</span>
          </div>
        </div>
      </div>

      {/* Soil Depth Layers Telemetry */}
      <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">Multi-Depth Soil Profile (Zone A - Tomato)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Topsoil (0 - 15 cm)</span>
              <span className="text-amber-400 font-bold">Deficit Zone</span>
            </div>
            <div className="text-2xl font-black text-amber-400">32% VWC</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Active root feeding layer for hybrid tomato roots. Drip cycle recommended.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Subsoil (15 - 30 cm)</span>
              <span className="text-emerald-400 font-bold">Optimal</span>
            </div>
            <div className="text-2xl font-black text-emerald-400">42% VWC</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Adequate reserve moisture buffering against mid-day transpiration.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Deep Bed (30 - 60 cm)</span>
              <span className="text-cyan-400 font-bold">Saturated Reserve</span>
            </div>
            <div className="text-2xl font-black text-cyan-400">48% VWC</div>
            <p className="text-[11px] text-slate-400 mt-1">
              No waterlogging; deep percolation provides groundwater recharge stability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
