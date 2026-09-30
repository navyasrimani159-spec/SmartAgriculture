import React, { useState } from 'react';
import {
  MapPin,
  Droplets,
  Sun,
  Waves,
  Power,
  Sprout,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { BackButton } from '../components/BackButton';

export const FarmMapPage: React.FC = () => {
  const { zones, setCurrentView, startSmartIrrigation, pumpStatus, solar, water } = useFarm();
  const [selectedElement, setSelectedElement] = useState<string>('zone-a');

  const zoneA = zones.find(z => z.id === 'zone-a') || zones[0];
  const zoneB = zones.find(z => z.id === 'zone-b') || zones[1];
  const zoneC = zones.find(z => z.id === 'zone-c') || zones[2];
  const zoneD = zones.find(z => z.id === 'zone-d') || zones[3];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <BackButton fallbackView="home" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>Interactive Spatial Grid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Farm Map & Zone Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Select any farm zone, pump house, or solar array to inspect soil moisture, active crops, and sensor nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>4 Active Agronomic Zones • 2.5 Total Acres</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual 2D Farm Layout Diagram (SVG / Interactive Map) */}
        <div className="lg:col-span-2 rounded-3xl p-6 bg-slate-900/90 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              2.5 Acre Precision Layout
            </span>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Drip Lines Active
            </span>
          </div>

          {/* Interactive SVG Farm Field Map */}
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl border border-white/5 p-4 flex flex-col justify-between overflow-hidden">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Farm Zones Grid Layout */}
            <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
              {/* Zone A */}
              <div
                onClick={() => setSelectedElement('zone-a')}
                className={`rounded-2xl p-4 transition-all cursor-pointer relative flex flex-col justify-between border ${
                  selectedElement === 'zone-a'
                    ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-400/30'
                    : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">1.0 Acre</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">Zone A</h3>
                    <p className="text-xs text-slate-300">Tomato (Shivam F1)</p>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    zoneA.soilMoisture < 35 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {zoneA.soilMoisture}% VWC
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <span>Health: {zoneA.cropHealth}%</span>
                  <span className={zoneA.soilMoisture < 35 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                    {zoneA.irrigationStatus}
                  </span>
                </div>
              </div>

              {/* Zone B */}
              <div
                onClick={() => setSelectedElement('zone-b')}
                className={`rounded-2xl p-4 transition-all cursor-pointer relative flex flex-col justify-between border ${
                  selectedElement === 'zone-b'
                    ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-400/30'
                    : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">0.6 Acre</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">Zone B</h3>
                    <p className="text-xs text-slate-300">Chilli (Guntur Sannam)</p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {zoneB.soilMoisture}% VWC
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <span>Health: {zoneB.cropHealth}%</span>
                  <span className="text-emerald-400">Optimal</span>
                </div>
              </div>

              {/* Zone C */}
              <div
                onClick={() => setSelectedElement('zone-c')}
                className={`rounded-2xl p-4 transition-all cursor-pointer relative flex flex-col justify-between border ${
                  selectedElement === 'zone-c'
                    ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-400/30'
                    : 'bg-slate-900/60 border-white/10 hover:border-emerald-500/40 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">0.5 Acre</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">Zone C</h3>
                    <p className="text-xs text-slate-300">Cotton (Bt Hybrid)</p>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {zoneC.soilMoisture}% VWC
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                  <span>Health: {zoneC.cropHealth}%</span>
                  <span className="text-emerald-400">Optimal</span>
                </div>
              </div>

              {/* Facilities Hub (Water Tank, Solar, Pump) */}
              <div className="grid grid-cols-3 gap-2">
                {/* Water Tank */}
                <div
                  onClick={() => setSelectedElement('water-tank')}
                  className={`rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between border text-center ${
                    selectedElement === 'water-tank'
                      ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-400/30'
                      : 'bg-slate-900/80 border-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  <Waves className="w-5 h-5 text-cyan-400 mx-auto" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Water Tank</span>
                    <span className="text-xs font-black text-cyan-300">{water.tankLevelPercent}%</span>
                  </div>
                </div>

                {/* Solar Panels */}
                <div
                  onClick={() => setSelectedElement('solar-array')}
                  className={`rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between border text-center ${
                    selectedElement === 'solar-array'
                      ? 'bg-amber-950 border-amber-400 ring-2 ring-amber-400/30'
                      : 'bg-slate-900/80 border-white/10 hover:border-amber-500/40'
                  }`}
                >
                  <Sun className="w-5 h-5 text-amber-400 mx-auto" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Solar Array</span>
                    <span className="text-xs font-black text-amber-300">5.4 kWh</span>
                  </div>
                </div>

                {/* Pump Station */}
                <div
                  onClick={() => setSelectedElement('pump-station')}
                  className={`rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between border text-center ${
                    selectedElement === 'pump-station'
                      ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'bg-slate-900/80 border-white/10 hover:border-emerald-500/40'
                  }`}
                >
                  <Power className={`w-5 h-5 mx-auto ${pumpStatus === 'ON' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Smart Pump</span>
                    <span className="text-xs font-black text-white">{pumpStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Zone / Element Detail Panel */}
        <div className="rounded-3xl p-6 bg-slate-900 border border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            {selectedElement === 'zone-a' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Zone A Telemetry</span>
                    <h3 className="text-xl font-black text-white">Tomato (Hybrid Shivam)</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                    Action Required
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Soil Moisture:</span>
                    <span className="font-bold text-amber-400">32% (Threshold: 35%)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Crop Health Index:</span>
                    <span className="font-bold text-emerald-400">84% (Vigorous)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Growth Stage:</span>
                    <span className="font-bold text-white">Flowering & Fruit Set (Day 54)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Soil Temperature:</span>
                    <span className="font-bold text-white">28.4°C</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Electrical Conductivity:</span>
                    <span className="font-bold text-white">1.4 dS/m (Good)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200">
                  ⚠️ Root-zone hydration is below critical setpoint. Water delivery needed to prevent flower abortion.
                </div>
              </div>
            )}

            {selectedElement === 'zone-b' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Zone B Telemetry</span>
                    <h3 className="text-xl font-black text-white">Chilli (Guntur Sannam)</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    Optimal
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Soil Moisture:</span>
                    <span className="font-bold text-emerald-400">46% (Well Hydrated)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Crop Health Index:</span>
                    <span className="font-bold text-emerald-400">88% (Healthy)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Growth Stage:</span>
                    <span className="font-bold text-white">Vegetative Growth (Day 38)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Recent Irrigation:</span>
                    <span className="font-bold text-white">Today, 05:45 AM (180 L)</span>
                  </div>
                </div>
              </div>
            )}

            {selectedElement === 'zone-c' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Zone C Telemetry</span>
                    <h3 className="text-xl font-black text-white">Cotton (Bt Hybrid)</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    Optimal
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Soil Moisture:</span>
                    <span className="font-bold text-emerald-400">41% (Stable)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Crop Health Index:</span>
                    <span className="font-bold text-emerald-400">82%</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Growth Stage:</span>
                    <span className="font-bold text-white">Squaring & Early Boll (Day 62)</span>
                  </div>
                </div>
              </div>
            )}

            {selectedElement === 'water-tank' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase">Storage Infrastructure</span>
                    <h3 className="text-xl font-black text-white">Rainwater & Borewell Tank</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                    68% Level
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Total Volume:</span>
                    <span className="font-bold text-white">3,400 L / 5,000 L</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Ultrasonic Node:</span>
                    <span className="font-bold text-emerald-400">Connected (92% Batt)</span>
                  </div>
                </div>
              </div>
            )}

            {selectedElement === 'solar-array' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase">Clean Energy Array</span>
                    <h3 className="text-xl font-black text-white">5 kW Ground Mount</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                    3.4 kW Output
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Generated Today:</span>
                    <span className="font-bold text-amber-400">5.4 kWh</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Clean Power Ratio:</span>
                    <span className="font-bold text-emerald-400">88% (Zero Carbon)</span>
                  </div>
                </div>
              </div>
            )}

            {selectedElement === 'pump-station' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Automation Relay</span>
                    <h3 className="text-xl font-black text-white">Solar Drip Pump Relay</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    pumpStatus === 'ON' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pumpStatus}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Motor Rating:</span>
                    <span className="font-bold text-white">2.2 kW (Solar Compatible)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-xl bg-slate-950/60">
                    <span className="text-slate-400">Delivery Rate:</span>
                    <span className="font-bold text-cyan-400">24 to 40 L/min</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10">
            {selectedElement === 'zone-a' ? (
              <button
                onClick={() => setCurrentView('irrigation')}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
              >
                <span>Trigger Zone A Precision Irrigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('irrigation')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Open Smart Irrigation Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
