import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Bell,
  Mic,
  Save,
  Check,
  User,
  MapPin,
  Layers,
  Sprout,
  ShieldCheck
} from 'lucide-react';
import { useFarm } from '../context/FarmContext';
import { supportedLanguages } from '../i18n';
import { LanguageCode } from '../types';
import { BackButton } from '../components/BackButton';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    language,
    setLanguage,
    voiceActive,
    setVoiceActive
  } = useFarm();

  const [farmerName, setFarmerName] = useState(profile.farmerName);
  const [farmName, setFarmName] = useState(profile.farmName);
  const [totalAcres, setTotalAcres] = useState(profile.totalAreaAcres.toString());
  const [location, setLocation] = useState(profile.location);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <BackButton fallbackView="home" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>Farm & System Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Farm Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure farm parameters, choose preferred Indian dialect, and manage automated irrigation thresholds.
        </p>
      </div>

      {savedBanner && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xl animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Farmer & Farm Profile */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            <span>Farmer & Land Holding Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Farmer Name</label>
              <input
                type="text"
                value={farmerName}
                onChange={e => setFarmerName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Farm Name</label>
              <input
                type="text"
                value={farmName}
                onChange={e => setFarmName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Total Acreage</label>
              <input
                type="text"
                value={totalAcres}
                onChange={e => setTotalAcres(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Language & Voice Interface */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <span>Language & Notification Preferences</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Preferred Language (13 Supported)</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as LanguageCode)}
                className="w-full sm:w-80 bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-white"
              >
                {supportedLanguages.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.nativeLabel} ({l.label})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-white/5">
              <div>
                <span className="font-bold text-white block">Push Smart Alerts</span>
                <span className="text-slate-400 text-[11px]">
                  Send high-priority notifications for soil deficits and heatwave advisories
                </span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={e => setNotificationsEnabled(e.target.checked)}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
