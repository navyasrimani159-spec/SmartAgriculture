import React, { useState } from 'react';
import {
  Bell,
  Droplets,
  CloudRain,
  Flame,
  Sprout,
  Sun,
  Package,
  Waves,
  Check,
  Trash2,
  ArrowRight,
  Filter,
  CheckCheck
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { SmartAlert } from '../types';
import { BackButton } from '../components/BackButton';

export const AlertsCenterPage: React.FC = () => {
  const { alerts, markAlertRead, dismissAlert, setCurrentView } = useFarm();
  const [filterType, setFilterType] = useState<string>('all');

  const alertTypeIcons: Record<string, React.FC<{ className?: string }>> = {
    irrigation: Droplets,
    rain: CloudRain,
    heat: Flame,
    crop: Sprout,
    energy: Sun,
    storage: Package,
    water: Waves
  };

  const filteredAlerts = filterType === 'all'
    ? alerts
    : alerts.filter(a => a.type === filterType);

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Bell className="w-4 h-4" />
            <span>Centralized Farm Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Smart Alerts & Agronomic Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Autonomous threshold alerts detecting soil moisture deficits, heatwaves, clean solar peaks, and storage variations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>{unreadCount} Unresolved Warnings</span>
        </div>
      </div>

      {/* Filter Tabs (Section 19 requirements: Irrigation, Rain, Heat, Crop, Energy, Storage, Water) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'irrigation', label: '💧 Irrigation' },
          { id: 'rain', label: '🌧️ Rain' },
          { id: 'heat', label: '🔥 Heat' },
          { id: 'crop', label: '🌱 Crop' },
          { id: 'energy', label: '☀️ Energy' },
          { id: 'storage', label: '📦 Storage' },
          { id: 'water', label: '💦 Water' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              filterType === tab.id
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="rounded-3xl bg-slate-900 border border-white/10 shadow-2xl divide-y divide-white/5 overflow-hidden">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            <CheckCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            No alerts found in this category. All systems normal.
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const Icon = alertTypeIcons[alert.type] || Bell;
            return (
              <div
                key={alert.id}
                className={`p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                  !alert.isRead ? 'bg-slate-800/30' : 'bg-transparent'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl shrink-0 ${
                      alert.severity === 'high'
                        ? 'bg-amber-500/20 text-amber-400'
                        : alert.severity === 'critical'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{alert.title}</h4>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          alert.severity === 'high'
                            ? 'bg-amber-500/20 text-amber-400'
                            : alert.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      {!alert.isRead && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {alert.message}
                    </p>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {alert.timestamp}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {alert.actionRoute && (
                    <button
                      onClick={() => setCurrentView(alert.actionRoute!.replace('/', ''))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {!alert.isRead && (
                    <button
                      onClick={() => markAlertRead(alert.id)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Dismiss alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
