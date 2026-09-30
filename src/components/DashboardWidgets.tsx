import React from 'react';
import {
  Droplets,
  Sprout,
  Sun,
  CloudSun,
  Power,
  Waves,
  Zap,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const DashboardWidgets: React.FC = () => {
  const {
    t,
    selectedWidgets,
    pumpStatus,
    startSmartIrrigation,
    stopSmartIrrigation,
    isIrrigating,
    setCurrentView,
    solar,
    water,
    weather,
    zones
  } = useFarm();

  const zoneA = zones.find(z => z.id === 'zone-a') || zones[0];

  const widgetDefinitions = [
    {
      id: 'soil-moisture',
      title: t('soilMoisture'),
      value: `${zoneA.soilMoisture}%`,
      status: zoneA.soilMoisture < 35 ? t('required') : t('optimal'),
      statusColor: zoneA.soilMoisture < 35 ? 'text-amber-400 bg-amber-500/15' : 'text-emerald-400 bg-emerald-500/15',
      icon: Droplets,
      iconColor: 'text-cyan-400',
      action: () => setCurrentView('irrigation'),
      actionLabel: 'View Drip Zones',
      subtext: 'Zone A Root Depth (15 cm)'
    },
    {
      id: 'crop-health',
      title: t('cropHealth'),
      value: '86%',
      status: t('healthy'),
      statusColor: 'text-emerald-400 bg-emerald-500/15',
      icon: Sprout,
      iconColor: 'text-emerald-400',
      action: () => setCurrentView('crop-health'),
      actionLabel: 'Analyze Stress',
      subtext: 'NDVI Vegetation Index 0.78'
    },
    {
      id: 'water-tank',
      title: t('waterTank'),
      value: `${water.tankLevelPercent}%`,
      status: t('good'),
      statusColor: 'text-sky-400 bg-sky-500/15',
      icon: Waves,
      iconColor: 'text-sky-400',
      action: () => setCurrentView('water'),
      actionLabel: 'Check Storage',
      subtext: '3,400 L / 5,000 L Available'
    },
    {
      id: 'solar-energy',
      title: t('solarEnergy'),
      value: `${solar.generatedTodayKWh} kWh`,
      status: t('generating'),
      statusColor: 'text-amber-400 bg-amber-500/15',
      icon: Sun,
      iconColor: 'text-amber-400',
      action: () => setCurrentView('solar'),
      actionLabel: 'View Inverter',
      subtext: '3.4 kW Current Solar Output'
    },
    {
      id: 'weather',
      title: t('weather'),
      value: `${weather.temp}°C`,
      status: `Rain: ${weather.rainProbability}%`,
      statusColor: 'text-blue-400 bg-blue-500/15',
      icon: CloudSun,
      iconColor: 'text-blue-400',
      action: () => setCurrentView('weather'),
      actionLabel: '7-Day Forecast',
      subtext: 'Humidity: 64% | Wind: 12 km/h'
    },
    {
      id: 'pump',
      title: t('pump'),
      value: pumpStatus,
      status: isIrrigating ? 'Irrigating Zone A' : 'Standby Mode',
      statusColor: pumpStatus === 'ON' ? 'text-emerald-400 bg-emerald-500/20 animate-pulse' : 'text-slate-400 bg-slate-800',
      icon: Power,
      iconColor: pumpStatus === 'ON' ? 'text-emerald-400' : 'text-slate-500',
      action: () => {
        if (pumpStatus === 'ON') {
          stopSmartIrrigation();
        } else {
          startSmartIrrigation();
        }
      },
      actionLabel: pumpStatus === 'ON' ? 'Stop Pump' : 'Start Pump Cycle',
      subtext: '2.2 kW Solar Relay'
    },
    {
      id: 'water-usage',
      title: t('todaysWaterUsage'),
      value: `${water.todayUsageLiters} L`,
      status: `Target: ${water.recommendedUsageLiters} L`,
      statusColor: 'text-cyan-400 bg-cyan-500/15',
      icon: Droplets,
      iconColor: 'text-cyan-300',
      action: () => setCurrentView('water'),
      actionLabel: 'Water Savings',
      subtext: 'Potential Savings: 70 L'
    },
    {
      id: 'energy-usage',
      title: t('todaysEnergyUsage'),
      value: '3.2 kWh',
      status: '88% Solar Powered',
      statusColor: 'text-emerald-400 bg-emerald-500/15',
      icon: Zap,
      iconColor: 'text-emerald-400',
      action: () => setCurrentView('solar'),
      actionLabel: 'Energy Breakdown',
      subtext: '0.0 kg Grid Carbon Used'
    }
  ];

  // Filter based on user's selected widgets
  const visibleWidgets = widgetDefinitions.filter(w => selectedWidgets.includes(w.id));

  return (
    <div className="space-y-4">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Live Telemetry Widgets ({visibleWidgets.length} active)
          </h3>
        </div>
        <button
          onClick={() => setCurrentView('customizer')}
          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Customize Dashboard</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleWidgets.map(widget => {
          const Icon = widget.icon;
          return (
            <div
              key={widget.id}
              className="rounded-2xl p-5 bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 transition-all hover:shadow-lg shadow-black/40 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium text-slate-400">{widget.title}</span>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-white/5">
                    <Icon className={`w-5 h-5 ${widget.iconColor}`} />
                  </div>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">{widget.value}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${widget.statusColor}`}>
                    {widget.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mt-2">{widget.subtext}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={widget.action}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>{widget.actionLabel}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
