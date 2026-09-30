import React from 'react';
import { Sprout, Globe, ShieldCheck } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useFarm();

  return (
    <footer className="w-full border-t border-white/10 bg-slate-950 text-slate-400 text-sm pb-20 lg:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-slate-950 font-black">
                <Sprout className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Smart<span className="text-emerald-400">Agri</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              A next-generation precision agriculture platform engineered for sustainable farming. Driving smallholder prosperity through IoT soil intelligence, solar-powered drip irrigation, and post-harvest resilience.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>Sustainable Agriculture Platform</span>
            </div>
          </div>

          {/* Col 2: Core Modules */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('irrigation')} className="hover:text-emerald-400 transition-colors">
                  Smart Precision Irrigation
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('solar')} className="hover:text-emerald-400 transition-colors">
                  Solar Energy Management
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('crop-health')} className="hover:text-emerald-400 transition-colors">
                  Crop Health Monitoring
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('post-harvest')} className="hover:text-emerald-400 transition-colors">
                  Post-Harvest Storage Guard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('weather')} className="hover:text-emerald-400 transition-colors">
                  Weather Forecasting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principles & Language */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">Platform Architecture</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>13 Indian Languages</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Low-Connectivity / Offline Mode</span>
              </li>
              <li>Sense → Understand → Recommend → Act → Measure</li>
              <li>Local-first telemetry storage</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center md:flex md:items-center md:justify-between text-[11px] text-slate-500">
          <p>
            SmartAgri Platform &copy; 2026. Empowering sustainable agriculture through clean technology.
          </p>
          <p className="mt-2 md:mt-0 font-medium text-slate-400">
            Precision Agrivoltaics • IoT Soil Intelligence • Post-Harvest Security
          </p>
        </div>
      </div>
    </footer>
  );
};
