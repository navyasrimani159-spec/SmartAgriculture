import React from 'react';
import { Wifi, WifiOff, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const OfflineBanner: React.FC = () => {
  const { connectionStatus, lastSyncedTime, setConnectionStatus, simulateSensorUpdate } = useFarm();

  if (connectionStatus === 'online') {
    return null;
  }

  return (
    <div className="w-full bg-slate-900 border-b border-white/10 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          {connectionStatus === 'offline' ? (
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40">
              <WifiOff className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <AlertTriangle className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {connectionStatus === 'offline' ? 'Offline Mode Active' : 'Low Connectivity Network Mode'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                {lastSyncedTime}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Cached farm observations, last known weather, and offline irrigation queues are operating locally. Changes will auto-sync on reconnect.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateSensorUpdate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Force Sync Check</span>
          </button>

          <button
            onClick={() => setConnectionStatus('online')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Restore Online</span>
          </button>
        </div>
      </div>
    </div>
  );
};
