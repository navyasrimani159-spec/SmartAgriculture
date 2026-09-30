import React, { useState } from 'react';
import { Home, MapPin, Droplets, Bot, Menu, X, Sun, BarChart3, Package, Calendar, Coins, ShieldAlert, Settings } from 'lucide-react';
import { useFarm } from '../context/FarmContext';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView } = useFarm();
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  const mainItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'farm-map', label: 'Farm', icon: MapPin },
    { id: 'irrigation', label: 'Irrigation', icon: Droplets },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert },
  ];

  const moreItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'solar', label: 'Solar Energy', icon: Sun },
    { id: 'post-harvest', label: 'Post-Harvest', icon: Package },
    { id: 'calendar', label: 'Farm Calendar', icon: Calendar },
    { id: 'expenses', label: 'Expenses', icon: Coins },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* More Drawer Modal */}
      {moreDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden flex flex-col justify-end">
          <div className="bg-slate-900 border-t border-white/15 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-base font-bold text-white">All Agriculture Modules</span>
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 py-4 max-h-72 overflow-y-auto">
              {moreItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMoreDrawerOpen(false);
                    }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-800/60 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    <Icon className="w-6 h-6 mb-1.5" />
                    <span className="text-xs font-medium text-center">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed bottom navigation for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-white/10 backdrop-blur-xl lg:hidden px-2 py-1.5">
        <div className="flex items-center justify-around">
          {mainItems.map(item => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                  active
                    ? 'text-emerald-400 font-bold bg-emerald-500/15'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
                <span className="text-[11px] mt-0.5">{item.label}</span>
              </button>
            );
          })}

          {/* More trigger */}
          <button
            onClick={() => setMoreDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-400 hover:text-slate-200"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
