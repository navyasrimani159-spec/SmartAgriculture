import React from 'react';
import {
  Sprout,
  Activity,
  Droplets,
  Thermometer,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { useFarm } from '../context/FarmContext';
import { visualAssets } from '../data/visualAssets';

interface CropInfo {
  id: string;
  name: string;
  variety: string;
  growthStage: string;
  healthScore: number;
  moisture: number;
  tempStress: 'None' | 'Low' | 'Moderate' | 'High';
  waterStress: 'None' | 'Moderate' | 'Severe';
  recentIrrigation: string;
  photo: string;
}

const cropsData: CropInfo[] = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    variety: 'Hybrid Shivam F1',
    growthStage: 'Flowering & Fruit Set (Day 54)',
    healthScore: 84,
    moisture: 32,
    tempStress: 'Low',
    waterStress: 'Moderate',
    recentIrrigation: 'Yesterday, 06:30 AM (280 L)',
    photo: visualAssets.crops.tomato
  },
  {
    id: 'crop-chilli',
    name: 'Chilli',
    variety: 'Guntur Sannam',
    growthStage: 'Vegetative Growth (Day 38)',
    healthScore: 88,
    moisture: 46,
    tempStress: 'None',
    waterStress: 'None',
    recentIrrigation: 'Today, 05:45 AM (180 L)',
    photo: visualAssets.crops.chilli
  },
  {
    id: 'crop-cotton',
    name: 'Cotton',
    variety: 'Bt Hybrid Shankar-6',
    growthStage: 'Squaring & Early Boll (Day 62)',
    healthScore: 82,
    moisture: 41,
    tempStress: 'None',
    waterStress: 'None',
    recentIrrigation: '2 days ago, 06:00 AM (220 L)',
    photo: visualAssets.crops.cotton
  },
  {
    id: 'crop-rice',
    name: 'Rice (Paddy)',
    variety: 'Sona Masoori Fine',
    growthStage: 'Tillering Stage (Day 42)',
    healthScore: 92,
    moisture: 65,
    tempStress: 'None',
    waterStress: 'None',
    recentIrrigation: 'Standing Water (2.5 cm)',
    photo: visualAssets.crops.rice
  },
  {
    id: 'crop-sugarcane',
    name: 'Sugarcane',
    variety: 'Co-0238 Thick Cane',
    growthStage: 'Grand Growth Stage (Day 110)',
    healthScore: 89,
    moisture: 52,
    tempStress: 'Low',
    waterStress: 'None',
    recentIrrigation: '3 days ago, 07:00 AM',
    photo: visualAssets.crops.sugarcane
  },
  {
    id: 'crop-groundnut',
    name: 'Groundnut',
    variety: 'TAG-24 Bold Kernel',
    growthStage: 'Pod Development (Day 48)',
    healthScore: 90,
    moisture: 48,
    tempStress: 'None',
    waterStress: 'None',
    recentIrrigation: '3 days ago, 06:15 AM',
    photo: visualAssets.crops.groundnut
  }
];

const ndviTrendData = [
  { week: 'W1', ndvi: 0.32 },
  { week: 'W2', ndvi: 0.44 },
  { week: 'W3', ndvi: 0.58 },
  { week: 'W4', ndvi: 0.69 },
  { week: 'W5', ndvi: 0.76 },
  { week: 'W6', ndvi: 0.82 },
  { week: 'W7 (Now)', ndvi: 0.86 }
];

import { BackButton } from '../components/BackButton';

export const CropHealthPage: React.FC = () => {
  const { setCurrentView } = useFarm();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <BackButton fallbackView="home" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Sprout className="w-4 h-4" />
            <span>Biomass & Stress Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Crop Health & Vigor Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Satellite NDVI calibration cross-referenced with in-situ soil moisture probes and leaf thermal imaging.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>Average Farm Health Score: <strong>86% (Healthy)</strong></span>
        </div>
      </div>

      {/* NDVI Vegetation Trend Chart */}
      <div className="rounded-3xl p-6 bg-slate-900/90 border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">NDVI Phenology Curve</span>
            <h3 className="text-lg font-bold text-white">Normalized Difference Vegetation Index (NDVI)</h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            0.86 Current Index
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ndviTrendData}>
              <defs>
                <linearGradient id="ndviGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#64748b" textAnchor="end" fontSize={11} />
              <YAxis domain={[0.2, 1.0]} stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                formatter={(val: number) => [`${val} NDVI`, 'Canopy Density']}
              />
              <Area type="monotone" dataKey="ndvi" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#ndviGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 6 Crop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cropsData.map(crop => (
          <div
            key={crop.id}
            className="rounded-3xl overflow-hidden bg-slate-900 border border-white/10 hover:border-emerald-500/40 shadow-xl transition-all hover:-translate-y-1 group"
          >
            {/* Image Header with Gradient */}
            <div className="relative h-44 bg-cover bg-center" style={{ backgroundImage: `url(${crop.photo})` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{crop.healthScore}% Vigor</span>
              </div>

              <div className="absolute bottom-3 left-4">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{crop.variety}</span>
                <h3 className="text-xl font-black text-white">{crop.name}</h3>
              </div>
            </div>

            {/* Crop Details */}
            <div className="p-5 space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Growth Stage:</span>
                <span className="font-bold text-white text-right">{crop.growthStage}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Soil Moisture</span>
                  <span className={`text-sm font-black ${crop.moisture < 35 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {crop.moisture}% VWC
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-slate-400 block text-[11px]">Water Stress</span>
                  <span className={`text-sm font-black ${crop.waterStress === 'Moderate' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {crop.waterStress}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px]">
                <span>Recent Irrigation:</span>
                <span className="text-slate-200 font-medium">{crop.recentIrrigation}</span>
              </div>

              {crop.name === 'Tomato' && (
                <button
                  onClick={() => setCurrentView('irrigation')}
                  className="w-full mt-2 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Start Precision Drip</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
