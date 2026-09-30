import React, { useState } from 'react';
import {
  Cpu,
  RefreshCw,
  Battery,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Power,
  Waves,
  Sun,
  Droplets,
  CloudSun
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { BackButton } from '../components/BackButton';

export const IoTDeviceCenterPage: React.FC = () => {
  const { ioTDevices, simulateSensorUpdate, lastSyncedTime } = useFarm();
  const [syncing, setSyncing] = useState(false);

  const handleManualSync = () => {
    setSyncing(true);
    simulateSensorUpdate();
    setTimeout(() => setSyncing(false), 500);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'soil':
        return Droplets;
      case 'weather':
        return CloudSun;
      case 'flow':
        return Waves;
      case 'tank':
        return Layers;
      case 'solar':
        return Sun;
      case 'pump':
        return Power;
      default:
        return Cpu;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>Hardware Telemetry Mesh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            IoT Edge Device Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Low-power LoRaWAN and Zigbee sensor nodes deployed across crop zones, water storage, and solar controllers.
          </p>
        </div>

        {/* Section 20 Requirement: "Simulate Sensor Update" button */}
        <button
          onClick={handleManualSync}
          disabled={syncing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>Simulate Sensor Update</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Total Nodes</span>
          <div className="text-2xl font-black text-white mt-1">{ioTDevices.length} Devices</div>
          <span className="text-[10px] text-emerald-400">100% Operational</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Mesh Health</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">98.4%</div>
          <span className="text-[10px] text-slate-400">LoRa Gateway Connected</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Average Battery</span>
          <div className="text-2xl font-black text-amber-400 mt-1">92%</div>
          <span className="text-[10px] text-slate-400">Solar Trickle Charged</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-white/10">
          <span className="text-[11px] text-slate-400">Last Telemetry Sync</span>
          <div className="text-2xl font-black text-cyan-400 mt-1 truncate">{lastSyncedTime}</div>
          <span className="text-[10px] text-slate-400">Continuous Polling</span>
        </div>
      </div>

      {/* 7 IoT Device Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ioTDevices.map(dev => {
          const Icon = getDeviceIcon(dev.type);
          return (
            <div
              key={dev.id}
              className="rounded-3xl p-6 bg-slate-900 border border-white/10 hover:border-emerald-500/30 shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-slate-800 text-emerald-400 border border-white/5 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Connected
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {dev.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">ID: {dev.id}</span>

                <div className="mt-4 p-3 rounded-2xl bg-slate-950/60 border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Live Sensor Reading</span>
                  <span className="text-lg font-black text-white mt-0.5 block">{dev.value}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Battery className="w-4 h-4 text-emerald-400" />
                  <span>{dev.battery}% Batt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-4 h-4 text-cyan-400" />
                  <span>{dev.signalStrength}% RSSI</span>
                </div>
                <span className="text-[11px] text-slate-500">{dev.lastUpdated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
